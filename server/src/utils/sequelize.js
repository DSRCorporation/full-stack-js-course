'use strict'

const Sequelize = require('sequelize')
const config = require('config')

const sequelizeConfig = config.get('db.config')

module.exports = new Sequelize(sequelizeConfig)
