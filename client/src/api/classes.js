import axios from 'api'

const getClasses = () => axios.get('/classes')

export default {
  getClasses
}
