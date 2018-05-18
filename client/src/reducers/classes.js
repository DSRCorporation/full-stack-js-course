import { handleActions } from 'redux-actions'
import { GET_CLASSES_REQUEST, GET_CLASSES_SUCCESS, GET_CLASSES_FAILURE } from 'actions/classes'

const initialState = {
  data: null,
  isFetching: false
}

const classes = handleActions({
  [GET_CLASSES_REQUEST]: (state, action) => Object.assign({}, state, { isFetching: true }),
  [GET_CLASSES_SUCCESS]: (state, action) => Object.assign({}, state, { data: action.payload, isFetching: false }),
  [GET_CLASSES_FAILURE]: (state, action) => Object.assign({}, state, { isFetching: false })
}, initialState)

export default classes
