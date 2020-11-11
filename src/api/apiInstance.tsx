import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'https://app.fakejson.com/q',
  timeout: 1000,
})

export default apiInstance
