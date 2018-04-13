'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      $ref: 'emptyObject'
    },
    params: {
      $ref: 'urlWithId'
    },
    query: {
      $ref: 'emptyObject'
    }
  }
}

module.exports = schema
