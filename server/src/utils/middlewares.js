'use strict'

const { app: logger } = require('utils/logger')
const { INTERNAL_SERVER_ERROR } = require('http-status')
const { NotFoundError, UnauthorizedError, ForbiddenError, InternalServerError } = require('errors')
const validator = require('utils/json-schema-validator')
const { BadRequestError } = require('errors')
const { cookieTracker } = require('services')
const config = require('config')

/**
 * Use this handler after router to handle page not found cases.
 */
const notFoundHandler = ({ headers, method, url, body }, res, next) => {
  logger.debug('middlewares.notFoundHandler %j', { method, url, body, headers })
  next(new NotFoundError(`${method} ${url} not found`))
}

/**
 * Common error handler for express chain.
 */
const errorHandler = (err, { headers, method, url, body }, res, next) => {
  logger.error('middlewares.errorHandler %j', { method, url, body, headers, err: err.toString ? err.toString() : err })

  if (res.headersSent) {
    return next(err)
  }

  const status = err.status || INTERNAL_SERVER_ERROR
  const errResJson = {
    message: err.message
  }
  if (err.errors) {
    errResJson.errors = err.errors
    const validationFailReasonsString = errResJson.errors.map(({ message, dataPath }) => `${dataPath} ${message}`).join(', ')
    errResJson.message = `${errResJson.message}: ${validationFailReasonsString}`
  }

  res.status(status)
  res.json(errResJson)
}

const asyncMiddleware = (fn) => (req, res, next) => {
  const ret = fn(req, res, next)

  if (ret && ret.catch && ret.then) {
    ret.catch(next)
  }

  return ret
}

const validateMiddleware = (id) => asyncMiddleware(async (req, res, next) => {
  logger.debug('middlewares.validateMiddleware -> validating %j against schema %s', {
    query: req.query,
    body: req.body,
    params: req.params
  }, id)
  const validateFn = validator.getSchema(id)
  if (!validateFn) {
    throw new InternalServerError(`Validation schema ${id} not found`)
  }
  const validationResult = validateFn(req)
  if (!validationResult) {
    throw new BadRequestError({ errors: validateFn.errors, message: `Request ${req.method} ${req.url} failed validation` })
  }
  next()
})

const { name: authCookieName, config: cookieConfig } = config.get('security.cookie')
const checkAuthenticated = (roles) => asyncMiddleware(async (req, res, next) => {
  logger.debug('middlewares.checkAuthenticated -> checking role of %j', {
    cookies: req.cookies
  })
  if (!req.cookies) {
    throw new UnauthorizedError('Access is denied due to invalid credentials')
  }
  const authCookie = req.cookies[authCookieName]
  logger.debug('middlewares.checkAuthenticated -> auth cookie %s', authCookie)
  if (!authCookie) {
    throw new UnauthorizedError('Access is denied due to invalid credentials')
  }
  const authCookieData = cookieTracker.cookieGet(authCookie)
  logger.debug('middlewares.checkAuthenticated -> auth cookie data %j', authCookieData)
  if (!authCookieData) {
    throw new UnauthorizedError('Access is denied due to invalid credentials')
  }

  logger.debug('middlewares.checkAuthenticated -> setting new cookie')
  const newCookie = await cookieTracker.cookieCreate(authCookieData)
  res.cookie(authCookieName, newCookie, cookieConfig)
  cookieTracker.cookieRemove(authCookie)

  if (roles) {
    logger.debug('middlewares.checkAuthenticated -> matching roles %j', roles)
    const roleMatches = roles.reduce((res, role) => res || authCookieData instanceof role, false)
    if (!roleMatches) {
      throw new ForbiddenError('Access is denied due to insufficient privileges')
    }
  }

  req.authenticatedUser = authCookieData
  next()
})

module.exports = {
  asyncMiddleware,
  errorHandler,
  notFoundHandler,
  validateMiddleware,
  checkAuthenticated
}
