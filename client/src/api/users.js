import axios from 'api'

const getMe = () => axios.get('/users/me')

export default {
  getMe
}
