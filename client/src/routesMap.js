import classes from 'thunks/classes'

export default {
  FORBIDDEN: '/forbidden',
  CLASSES: {
    path: '/classes',
    thunk: (dispatch, getState) => {
      dispatch(classes.getClasses())
    }
  },
  LOGIN: '/login',
  MAIN: {
    path: '/',
    thunk: (dispatch, getState) => {
      //
    }
  }
}
