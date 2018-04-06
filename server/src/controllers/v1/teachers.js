'use strict'

const express = require('express')
const { app: logger } = require('utils/logger')
const { Teacher, User, Subject } = require('models')
const { mapList, mapTeacherCore } = require('utils/entity-mappers')

const router = new express.Router()

router.get('/', async (req, res) => {
  const teachers = await Teacher.findAndCountAll({
    include: [
      { model: User },
      { model: Subject }
    ]
  })
  const teachersFormatted = mapList(mapTeacherCore)(teachers)
  res.json(teachersFormatted)
})

module.exports = router
