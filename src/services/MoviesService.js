import Axios from 'axios'

const axios = Axios.create({
  baseURL: `http://localhost:3000/api/`
})
 const ENDPOINTS = {
  MOVIES: `/movies`
}
 export default {
 
  getAll() {
    return axios.get(ENDPOINTS.MOVIES)
  }
  
}