'use strict'

const path = require('path')
require('app-module-path').addPath(path.resolve(__dirname))

const Express = require('express')
const {
  initializerModels,
  initializerSeed,
  initializerSequelize,
  initializerMiddlewares,
  initializerRoutes,
  initializerValidators
} = require('initializers')
const config = require('config')
const { app: logger } = require('utils/logger')

const main = async () => {
  const { port } = config.get('express')
  logger.info('main', { port })

  const app = new Express()

  await initializerSequelize(app)
  await initializerModels(app)
  await initializerSeed(app)
  await initializerMiddlewares(app)
  await initializerRoutes(app)
  await initializerValidators(app)

  await new Promise((resolve, reject) => app
    .listen(port, resolve)
    .on('error', reject))

  logger.info('main -> done')
}

main().catch((err) => logger.error('Uncaught expection %j', err))
