'use strict'

const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        value: {
          type: 'integer',
          maximum: 5,
          minimum: 2
        }
      },
      required: ['value']
    },
    params: {
      $ref: 'emptyObject'
    },
    query: {
      $ref: 'emptyObject'
    }
  },
  required: ['body']
}

module.exports = schema
