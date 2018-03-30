'use strict'

const initializerSequelize = require('./sequelize')
const initializerModels = require('./models')
const initializerSeed = require('./seed')

module.exports = {
    initializerModels,
    initializerSeed,
    initializerSequelize
}
