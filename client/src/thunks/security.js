import { loginSuccess } from 'actions/security'
import routes from 'actions/routes'
import security from 'api/security'
import { SubmissionError } from 'redux-form'

const login = (credentials, resolve, reject) =>
  (dispatch) => {
    security.login(credentials)
      .then((response) => {
        dispatch(loginSuccess(response.data))
        dispatch(routes.goToMain())
      })
      .catch((error) => reject(new SubmissionError({ _error: error.response.data.message })))
  }

const logout = () => (dispatch) => security.logout().then(() => dispatch(routes.goToLogin()))

export default {
  login,
  logout
}
