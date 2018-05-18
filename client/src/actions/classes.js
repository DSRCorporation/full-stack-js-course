import { createActions } from 'redux-actions'

export const GET_CLASSES_REQUEST = 'GET_CLASSES_REQUEST'
export const GET_CLASSES_SUCCESS = 'GET_CLASSES_SUCCESS'
export const GET_CLASSES_FAILURE = 'GET_CLASSES_FAILURE'

export const {
  getClassesRequest,
  getClassesSuccess,
  getClassesFailure
} = createActions({
  GET_CLASSES_REQUEST: undefined,
  GET_CLASSES_SUCCESS: payload => payload,
  GET_CLASSES_FAILURE: payload => payload
})
