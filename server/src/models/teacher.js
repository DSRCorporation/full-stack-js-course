'use strict'

const sequelize = require('utils/sequelize')

const Subject = require('./subject')
const User = require('./user')

const schema = {}

const Teacher = sequelize.define('Teacher', schema)
Teacher.belongsTo(User)
Teacher.belongsTo(Subject)

module.exports = Teacher
