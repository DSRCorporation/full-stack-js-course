'use strict'

const sequelize = require('utils/sequelize')
const Sequelize = require('sequelize')
const config = require('config')
const bcrypt = require('bcrypt')
const { pepperAdd } = require('utils/security')

const schema = {
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}

const saltRounds = config.get('security.saltRounds')
const hashPasswordHook = async (user, options) => {
  if (!user.changed('password')) {
    return
  }
  const passwordHash = await bcrypt.hash(pepperAdd(user.password), saltRounds)
  user.password = passwordHash
}

const options = {
  indexes: [
    {
      fields: [ 'name' ]
    },
    {
      fields: [ 'phone' ]
    }
  ],
  hooks: {
    beforeCreate: hashPasswordHook,
    beforeUpdate: hashPasswordHook
  }
}

const User = sequelize.define('User', schema, options)

module.exports = User
