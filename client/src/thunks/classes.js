import { getClassesSuccess } from 'actions/classes'
import classes from 'api/classes'

const getClasses = () =>
  (dispatch) => {
    classes.getClasses()
      .then((response) => {
        dispatch(getClassesSuccess(response.data))
      })
  }

export default {
  getClasses
}
