'use strict'

const sequelize = require('utils/sequelize')
const { app: logger } = require('utils/logger')

const initializerSequelize = async () => {
  logger.info('initializerSequelize')

  await sequelize.authenticate()

  logger.info('initializerSequelize -> done')
}

module.exports = initializerSequelize
