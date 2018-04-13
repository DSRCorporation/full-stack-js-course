'use strict'

const { raw } = require('config/raw')
const winston = require('winston')

const configDefault = {
  express: {
    port: 4000,
    limit: '10mb'
  },
  api: {
    base: '/api',
    v1: '/v1'
  },
  security: {
    pepper: 'nmWwY73T546vaaT6vBRw',
    saltRounds: 10,
    roles: {
      teacher: 'teacher'
    },
    cookie: {
      name: 'auth',
      config: {
        httpOnly: true,
        maxAge: 1800000
      }
    }
  },
  db: {
    seed: {
      numTeachers: 15,
      numSubjects: 5,
      numClasses: 3
    },
    config: {
      database: 'digital-diary-server',
      username: 'postgres',
      password: null,
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    }
  },
  loggers: {
    app: raw({
      level: 'debug',
      format: winston.format.combine(
        winston.format.splat(),
        // log server %s started, serverName
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.label({ label: 'app' }),
        winston.format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new winston.transports.Console()
      ]
    }),
    db: raw({
      level: 'debug',
      format: winston.format.combine(
        winston.format.splat(),
        // log server %s started, serverName
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.label({ label: 'db' }),
        winston.format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new winston.transports.Console()
      ]
    })
  }
}

module.exports = configDefault
