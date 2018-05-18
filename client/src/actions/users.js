import { createActions } from 'redux-actions'

export const GET_ME_REQUEST = 'GET_ME_REQUEST'
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS'
export const GET_ME_FAILURE = 'GET_ME_FAILURE'

export const {
  getMeRequest,
  getMeSuccess,
  getMeFailure
} = createActions({
  GET_ME_REQUEST: undefined,
  GET_ME_SUCCESS: payload => payload,
  GET_ME_FAILURE: payload => payload
})
