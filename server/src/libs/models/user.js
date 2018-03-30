'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')

const schema = {
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }
}

const options = {
    indexes: [
        {
            fields: [ 'name' ]
        },
        {
            fields: [ 'phone' ]
        }
    ]
}

const User = sequelize.define('User', schema, options)

module.exports = User
