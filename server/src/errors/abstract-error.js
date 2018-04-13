'use strict'

class AbstractError extends Error {
  constructor (message) {
    super(message)

    if (this.constructor === AbstractError) {
      throw new TypeError('Abstract class "AbstractClass" cannot be instantiated directly.')
    }

    this.name = this.constructor.name
    this.message = message

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AbstractError
