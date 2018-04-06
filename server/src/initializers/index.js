'use strict'

const initializerSequelize = require('./sequelize')
const initializerModels = require('./models')
const initializerSeed = require('./seed')
const initializerRoutes = require('./routes')
const initializerMiddlewares = require('./middlewares')

module.exports = {
  initializerModels,
  initializerSeed,
  initializerSequelize,
  initializerRoutes,
  initializerMiddlewares
}
