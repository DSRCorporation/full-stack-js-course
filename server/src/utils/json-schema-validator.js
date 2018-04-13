'use strict'

const Ajv = require('ajv')

const ajv = new Ajv({
  allErrors: true,
  verbose: true
})

module.exports = ajv
