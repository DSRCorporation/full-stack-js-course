import { createActions } from 'redux-actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const {
  loginSuccess,
  loginFailure
} = createActions({
  LOGIN_SUCCESS: payload => payload,
  LOGIN_FAILURE: payload => payload
})
