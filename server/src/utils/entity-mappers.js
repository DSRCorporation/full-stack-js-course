'use strict'

const mapList = (mapEntityFn) => ({ count, rows }) => ({
  count,
  entities: rows.map(mapEntityFn)
})

const mapTeacherCore = ({ id, User, Subject }) => ({
  id,
  ...mapUserCore(User),
  subject: mapSubjectCore(Subject)
})

const mapUserCore = ({ name }) => ({ name })

const mapSubjectCore = ({ id, name }) => ({ id, name })

module.exports = {
  mapSubjectCore,
  mapTeacherCore,
  mapUserCore,
  mapList
}
