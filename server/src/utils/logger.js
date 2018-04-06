'use strict'

const winston = require('winston')
const config = require('config')

const loggerConfs = config.get('loggers')

const loggers = Object
  .entries(loggerConfs)
  // [['app', {}], ['db', {}]]
  .reduce(
    (accum, [ name, config ]) => {
      accum[name] = winston.createLogger(config)
      // on first iteration accum = { app: Winston }
      // on second iteration accum = { app: Winston, db: Winston }
      return accum
    }, {}
  )

module.exports = loggers
