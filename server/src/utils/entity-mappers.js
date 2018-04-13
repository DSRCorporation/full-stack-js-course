'use strict'

const { Teacher } = require('models')
const config = require('config')
const { InternalServerError } = require('errors')

const mapList = (mapEntityFn) => ({ count, rows }) => ({
  count,
  entities: rows.map(mapEntityFn)
})

const mapTeacherCore = ({ id, User, Subject }) => ({
  id,
  ...mapUserCore(User),
  subject: mapSubjectCore(Subject)
})
const mapTeacherExtended = ({ id, User, Subject, Classes }) => ({
  id,
  ...mapUserExtended(User),
  subject: mapSubjectCore(Subject),
  classes: Classes.map(mapClassCore)
})

const mapUserCore = ({ name }) => ({ name })
const mapUserExtended = ({ name, address, phone }) => ({ name, address, phone })

const mapSubjectCore = ({ id, name }) => ({ id, name })

const mapMarkCore = ({ id, value, Subject }) => ({
  id,
  value,
  subject: mapSubjectCore(Subject)
})

const mapClassCore = ({ id, name }) => ({ id, name })

const roles = config.get('security.roles')
const mapUserRole = (modelInstance) => {
  if (modelInstance instanceof Teacher) {
    return roles.teacher
  }
  throw new InternalServerError('Unknown role')
}
const mapUserInfo = (modelInstance) => ({
  id: modelInstance.id,
  name: modelInstance.User.name,
  role: mapUserRole(modelInstance)
})

module.exports = {
  mapSubjectCore,
  mapTeacherCore,
  mapTeacherExtended,
  mapUserCore,
  mapList,
  mapMarkCore,
  mapUserInfo
}
