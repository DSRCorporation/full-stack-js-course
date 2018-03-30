'use strict'

const Sequelize = require('sequelize')

const URI = 'postgres://postgres:password@localhost:5432/digital-diary-server'
const OPTIONS = {}

module.exports = new Sequelize(URI, OPTIONS)