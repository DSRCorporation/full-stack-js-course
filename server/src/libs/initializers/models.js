'use strict'

const sequelize = require('utils/sequelize')

const initializerModels = async () => {
    console.log('initializerModels')

    require('models')
    await sequelize.sync()

    console.log('initializerModels -> done')
}

module.exports = initializerModels
