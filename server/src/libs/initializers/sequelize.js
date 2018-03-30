'use strict'

const sequelize = require('utils/sequelize')

const initializerSequelize = async () => {
    console.log('initializerSequelize')

    await sequelize.authenticate()

    console.log('initializerSequelize -> done')
}

module.exports = initializerSequelize
