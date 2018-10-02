<template>
    <div class="container">
        <h3 class="text-center">All Movies</h3>
        <movie-search @search-term-change="onSearchTermChanged" class="mt-4" />

        <!-- <div>
<input class="form-control" v-model="searchTerm" type="text" placeholder="Search movie title" />
<div v-for="movie in filterMovies" :key="movie.id" v-text="movie.title"/>
 <div v-if="!filterMovies.length" class="alert alert-danger" role="alert">
            This movie title is not included in the list of movies!
        </div>

</div> -->
        <div class="container">

        <movie-row v-for="movie in movies" :key="movie.id" :movie="movie" />
         <div v-if="!movies.length" class="alert alert-danger" role="alert">
            There are no movies on the list!
        </div>

        
        </div>

    </div>
</template>

<script>
    import MoviesService from "./../services/MoviesService"
    import MovieRow from "./../components/MovieRow.vue"
    import MovieSearch from './../components/MovieSearch.vue'
    import {
        mapGetters,
        mapActions
    } from "vuex"

    export default {
        name: "AppMovies",

        components: {
            MovieRow,
            MovieSearch
        },
        data() {
            return {
                // movies:[]
                searchTerm: ""
            }
        },
        computed: {
            ...mapGetters({
                movies: "getMovies"
            }),
            // filterMovies() {
            //     return this.movies.filter(movie => {

            //         return movie.title.toLowerCase()
            //             .startsWith(this.searchTerm.toLowerCase())
            //     })
            // }

        },
        methods: {
            ...mapActions([
                "fetchMovies"
            ]),

            onSearchTermChanged(term) {
                MoviesService.getAll(term)
                    .then(({
                        data
                    }) => {
                        this.movies = data
                    })
            }
        },
        beforeRouteEnter(to, from, next) {
            // MoviesService.getAll()
            //   .then(({data}) => {
            //     next((vm) => {
            //       vm.movies = data
            //     })

            //   })
            next()
        },

        created() {
            this.fetchMovies();
        }
    }
</script>

<style>

</style>