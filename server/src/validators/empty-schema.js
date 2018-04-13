'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      $ref: 'emptyObject'
    },
    params: {
      $ref: 'emptyObject'
    },
    query: {
      $ref: 'emptyObject'
    }
  }
}

module.exports = schema
