'use strict'

const express = require('express')
const { Subject, Mark, Teacher } = require('models')
const { mapList, mapMarkCore } = require('utils/entity-mappers')
const { asyncMiddleware, validateMiddleware, checkAuthenticated } = require('utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const marks = await Mark.findAndCountAll({
      include: [
        { model: Subject }
      ]
    })
    const marksFormatted = mapList(mapMarkCore)(marks)
    res.json(marksFormatted)
  }))

router.post('/',
  checkAuthenticated([ Teacher ]),
  validateMiddleware('markCreate'),
  asyncMiddleware(async ({ body: markData, authenticatedUser }, res) => {
    const mark = await Mark.create({
      TeacherId: authenticatedUser.id,
      SubjectId: authenticatedUser.SubjectId,
      ...markData
    })
    const markFormatted = mapMarkCore({ Subject: authenticatedUser.Subject, ...mark.get() })
    res.json(markFormatted)
  }))

module.exports = router
