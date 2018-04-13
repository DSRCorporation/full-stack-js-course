'use strict'

const config = require('config')

const pepper = config.get('security.pepper')

const pepperAdd = (password) => password + pepper

module.exports = {
  pepperAdd
}
