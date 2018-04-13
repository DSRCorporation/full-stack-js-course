'use strict'

const { INTERNAL_SERVER_ERROR } = require('http-status')

const AbstractError = require('./abstract-error')

class InternalServerError extends AbstractError {
  constructor (message) {
    super(message)

    this.status = INTERNAL_SERVER_ERROR
  }
}

module.exports = InternalServerError
