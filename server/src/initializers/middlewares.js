'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const { app: logger } = require('utils/logger')
const { errorHandler, notFoundHandler } = require('utils/middlewares')
const cookieParser = require('cookie-parser')

const initializerMiddlewares = (app) => {
  const limit = config.get('express.limit')
  logger.info('initializerMiddlewares', limit)

  app.use(bodyParser.json({ limit }))
  app.use(cors())
  app.use(cookieParser())

  app.route = express.Router()
  app.use(app.route)

  app.use(notFoundHandler)
  app.use(errorHandler)

  logger.info('initializerMiddlewares -> done')
}

module.exports = initializerMiddlewares
