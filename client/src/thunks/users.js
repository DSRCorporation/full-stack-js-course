import { getMeSuccess } from 'actions/users'
import users from 'api/users'

const getMe = () =>
  (dispatch) => {
    users.getMe()
      .then((response) => {
        dispatch(getMeSuccess(response.data))
      })
  }

export default {
  getMe
}
