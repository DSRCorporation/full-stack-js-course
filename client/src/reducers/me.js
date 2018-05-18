import { handleActions } from 'redux-actions'
import { LOGIN_SUCCESS } from 'actions/security'
import { GET_ME_SUCCESS } from 'actions/users'

const initialState = {
  data: null,
  isFetching: false
}

const meReducer = handleActions({
  [LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [GET_ME_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false })
}, initialState)

export default meReducer
