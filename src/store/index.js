import Vue from "vue"
import Vuex from "vuex"

import MoviesService from "./../services/MoviesService"
Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        movies: [],
        searchTerm: '',
        isAuthenticated: false
    },
    getters: {
        getMovies(state) {
            return state.movies
        },
        getSearchTerm(state) {
            return state.searchTerm
        },
        getIsAuthenticated(state) {
            return state.isAuthenticated;
        }
    },
    mutations: {
        setMovies(state, movies) {
            state.movies = movies
        },
        setSearchTerm(state, searchTerm) {
            state.searchTerm = searchTerm
        },
        setIsAuthenticated(state, auth) {
            state.isAuthenticated = auth;
        }
    },
    actions: {
        // async fetchMovies(store) {
        //     const {
        //         data
        //     } = await MoviesService.index();
        //     store.commit('setMovies', data);
        // },
     
        fetchMovies(store) {
            MoviesService.index().then(({
                data
            }) => {
                let movies = data.map((movie) => {
                    movie.duration = Number(movie.duration)
                    return movie
                })
                store.commit('setMovies', movies)
            })
        }
    }
})