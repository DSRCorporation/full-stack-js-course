'use strict'

const { NOT_FOUND } = require('http-status')

const AbstractError = require('./abstract-error')

class NotFoundError extends AbstractError {
  constructor (message) {
    super(message)

    this.status = NOT_FOUND
  }
}

module.exports = NotFoundError
