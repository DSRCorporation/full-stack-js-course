'use strict'

const validator = require('utils/json-schema-validator')
const { app: logger } = require('utils/logger')
const validators = require('validators')

const initializerValidators = async (app) => {
  logger.info('initializerValidators')

  Object.entries(validators).forEach(([ name, schema ]) => {
    logger.debug('initializerValidators -> adding %s', name)
    validator.addSchema(schema, name)
    logger.debug('initializerValidators -> added %s', name)
  })

  logger.info('initializerValidators -> done')
}

module.exports = initializerValidators
