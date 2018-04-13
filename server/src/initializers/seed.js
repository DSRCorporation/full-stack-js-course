'use strict'

const sequelize = require('utils/sequelize')
const { User, Teacher, Subject, Class } = require('models')
const Chance = require('chance')
const config = require('config')
const { app: logger } = require('utils/logger')

const chance = new Chance()

const initializerSeed = async () => {
  const { numTeachers, numSubjects, numClasses } = config.get('db.seed')
  logger.info('initializerSeed %j', { numTeachers, numSubjects, numClasses })

  const usersNum = await User.count()

  if (usersNum) {
    logger.info('initializerSeed -> seed executed earlier')
    return
  }

  await sequelize.transaction(async (transaction) => {
    const subjects = []
    for (let i = 0; i < numSubjects; i++) {
      const subject = await Subject.create({
        name: chance.animal()
      }, { transaction })
      subjects.push(subject)
    }
    const classes = []
    for (let i = 0; i < numClasses; i++) {
      const newClass = await Class.create({
        name: chance.animal()
      }, { transaction })
      classes.push(newClass)
    }
    for (let i = 0; i < numTeachers; i++) {
      const userData = {
        name: chance.name(),
        address: chance.address(),
        phone: chance.phone(),
        password: chance.word()
      }
      const user = await User.create(userData, { transaction })
      const teacher = Teacher.build({})
      teacher.setUser(user, { save: false })
      teacher.setSubject(subjects[0], { save: false })
      await teacher.save({ transaction })
      await teacher.setClasses(classes, { transaction })
      logger.debug('initializerSeed -> user creted %j', userData)
    }
  })

  logger.info('initializerSeed -> done')
}

module.exports = initializerSeed
