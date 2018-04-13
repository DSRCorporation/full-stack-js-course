'use strict'

const express = require('express')
const { Teacher, User, Subject, Class } = require('models')
const { mapList, mapTeacherCore, mapTeacherExtended } = require('utils/entity-mappers')
const { NotFoundError } = require('errors')
const { asyncMiddleware, validateMiddleware, checkAuthenticated } = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const teachers = await Teacher.findAndCountAll({
      include: [
        { model: User },
        { model: Subject }
      ]
    })
    const teachersFormatted = mapList(mapTeacherCore)(teachers)
    res.json(teachersFormatted)
  }))

router.get('/:id',
  checkAuthenticated([ Teacher ]),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async ({ params: { id } }, res) => {
    const teacher = await Teacher.findById(id, {
      include: [
        { model: User },
        { model: Subject },
        { model: Class }
      ]
    })

    if (!teacher) {
      throw new NotFoundError(`Teacher ${id} not found`)
    }

    const teacherFormatted = mapTeacherExtended(teacher)
    res.json(teacherFormatted)
  }))

module.exports = router
