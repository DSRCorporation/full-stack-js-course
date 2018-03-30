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

const Subject = sequelize.define('Subject', schema, options)

module.exports = Subject
