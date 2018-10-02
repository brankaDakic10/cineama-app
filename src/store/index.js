import Vue from "vue"
import Vuex from "vuex"

import MoviesService from "./../services/MoviesService"
Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        movies: []
    },
    getters: {
        getMovies(state) {
            return state.movies
        }
    },
    mutations: {
        setMovies(state, movies) {
            state.movies = movies
        }
    },
    actions: {
        async fetchMovies(store) {
            const {
                data
            } = await MoviesService.index();
            store.commit('setMovies', data);
        },

    }
})