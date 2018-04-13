'use strict'

const bcrypt = require('bcrypt')
const config = require('config')
const { app: logger } = require('utils/logger')

const maxAge = config.get('security.cookie.config.maxAge')
const saltRounds = config.get('security.saltRounds')

const cache = {}

const cookieRemove = (id) => {
  logger.debug('cookieRemove -> removing cookie %s', id)
  delete cache[id]
}

const cookieCreate = async (model) => {
  const dataStr = JSON.stringify({ id: model.User.id })
  const cookieRaw = dataStr + Date.now().toString()
  logger.debug('cookieCreate -> creating cookie from %s', cookieRaw)
  const cookieHash = await bcrypt.hash(cookieRaw, saltRounds)
  logger.debug('cookieCreate -> creating cookie hash %s', cookieHash)
  cache[cookieHash] = model
  setTimeout(() => cookieRemove(cookieHash), maxAge)
  return cookieHash
}

const cookieGet = (id) => cache[id]

module.exports = {
  cookieCreate,
  cookieGet,
  cookieRemove
}
