'use strict'

const router = require('express').Router()
const { asyncMiddleware, validateMiddleware, checkAuthenticated } = require('utils/middlewares')
const { User, Teacher, Subject, Class } = require('models')
const { mapUserInfo } = require('utils/entity-mappers')
const bcrypt = require('bcrypt')
const { NotFoundError, InternalServerError } = require('errors')
const { pepperAdd } = require('utils/security')
const { cookieTracker } = require('services')
const config = require('config')
const { NO_CONTENT } = require('http-status')
const { app: logger } = require('utils/logger')

const { name: cookieName, config: cookieConfig } = config.get('security.cookie')

router.post('/login', validateMiddleware('login'), asyncMiddleware(async (req, res) => {
  const { login, password } = req.body
  const user = await User.findOne({ where: { name: login } })
  if (!user) {
    throw new NotFoundError(`User with matching login and password not found`)
  }
  const passwordCorrect = await bcrypt.compare(pepperAdd(password), user.password)
  if (!passwordCorrect) {
    throw new NotFoundError(`User with matching login and password not found`)
  }
  const entity = await Teacher.findOne({
    include: [
      {
        model: User,
        where: {
          id: user.id
        }
      },
      { model: Subject },
      { model: Class }
    ]
  })
  if (!entity) {
    throw new InternalServerError(`User ${user.id} doesn't have a role`)
  }
  const resFormatted = mapUserInfo(entity)
  const newCookie = await cookieTracker.cookieCreate(entity)
  logger.debug('login -> setting cookie %s = %s with params %j', cookieName, newCookie, cookieConfig)
  res.cookie(cookieName, newCookie, cookieConfig)
  res.json(resFormatted)
}))

router.post('/logout', checkAuthenticated(), validateMiddleware('emptySchema'), asyncMiddleware(async (req, res) => {
  cookieTracker.cookieRemove(req.cookies[cookieName])
  res.clearCookie(cookieName)
  res.status(NO_CONTENT).send()
}))

module.exports = router
