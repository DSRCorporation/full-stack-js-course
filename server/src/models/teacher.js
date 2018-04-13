'use strict'

const sequelize = require('utils/sequelize')

const Subject = require('./subject')
const User = require('./user')
const Class = require('./class')

const schema = {}

const Teacher = sequelize.define('Teacher', schema)
Teacher.belongsTo(User)
Teacher.belongsTo(Subject)
Teacher.belongsToMany(Class, { through: 'TeachersClasses' })

module.exports = Teacher
