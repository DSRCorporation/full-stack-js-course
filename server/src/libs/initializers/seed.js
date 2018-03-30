'use strict'

const sequelize = require('utils/sequelize')
const { User, Teacher, Subject } = require('models')
const Chance = require('chance')

const chance = new Chance()

const SUBJECT_NUM = 5
const TEACHER_NUM = 15

const initializerSeed = async () => {
    console.log('initializerSeed')

    const usersNum = await User.count()

    if (usersNum) {
        console.log('initializerSeed -> seed executed earlier')
        return
    }

    await sequelize.transaction(async (transaction) => {
        const subjects = []
        for(let i = 0; i < SUBJECT_NUM; i++) {
            const subject = await Subject.create({
                name: chance.animal()
            }, { transaction })
            subjects.push(subject)
        }
        for(let i = 0; i < TEACHER_NUM; i++) {
            const user = await User.create({
                name: chance.name(),
                address: chance.address(),
                phone: chance.phone()
            }, { transaction })
            const teacher = Teacher.build({})
            teacher.setUser(user, { save: false })
            teacher.setSubject(subjects[0], { save: false })
            await teacher.save({ transaction })
        }
    })

    console.log('initializerSeed -> done')
}

module.exports = initializerSeed
