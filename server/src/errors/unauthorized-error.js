'use strict'

const { UNAUTHORIZED } = require('http-status')

const AbstractError = require('./abstract-error')

class UnauthorizedError extends AbstractError {
  constructor (message) {
    super(message)

    this.status = UNAUTHORIZED
  }
}

module.exports = UnauthorizedError
