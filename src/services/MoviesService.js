import Axios from 'axios'

const axios = Axios.create({
  baseURL: `http://localhost:8000/api/`
})
 const ENDPOINTS = {
  MOVIES: `/movies`
}
 export default {
 
    index(term="") {
        return axios.get(ENDPOINTS.MOVIES, {
          params: {
            term
          }
        })
    },
  store(movie) {
    return axios.post(ENDPOINTS.MOVIES, movie)
  },
  getMovie(id){
    return axios.get(`/movies/${id}`)
  }

}