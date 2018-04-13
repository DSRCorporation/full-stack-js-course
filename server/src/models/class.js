'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const schema = {
  name: {
    type: Sequelize.STRING
  }
}

const options = {
  indexes: [
    {
      fields: [ 'name' ]
    }
  ]
}

const Class = sequelize.define('Class', schema, options)

module.exports = Class
