'use strict'

const BadRequestError = require('./bad-request-error')
const ForbiddenError = require('./forbidden-error')
const InternalServerError = require('./internal-server-error')
const NotFoundError = require('./not-found-error')
const UnauthorizedError = require('./unauthorized-error')

module.exports = {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError
}
