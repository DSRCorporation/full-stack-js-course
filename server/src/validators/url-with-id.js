'use strict'

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string'
    }
  },
  required: ['id']
}

module.exports = schema
