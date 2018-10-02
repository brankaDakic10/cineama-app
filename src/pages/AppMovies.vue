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
        <div class="pt-3">
            <div class="row mb-2">
                <div class="col-md">
                    <b-badge pill variant="primary" v-if="movies.length">
                        <!--computed- number of selected movies -->
                        Selected: {{ selectedMoviesCounter }}
                    </b-badge>
                </div>

                <!-- buttons div -->
                <div class="col-md">
                    <!-- deselect button -->
                    <b-button size="sm" variant="warning" class="float-right" @click="deselectAll">
                        Deselect All
                    </b-button>
                    <!-- select button -->
                    <b-button size="sm" variant="primary" class="float-right mr-1" @click="selectAll">
                        Select All
                    </b-button>
                </div>
                <!-- end buttons div -->
            </div>

            <movie-row v-for="movie in movies" :key="movie.id"
             :movie="movie" @on-selected-movie="onSelectedMovie"
                :selectedMoviesIds="selectedMoviesIds" />

            <b-alert show variant="warning" v-if="!movies.length">
                No Movies
            </b-alert>
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
                searchTerm: "",
                selectedMoviesIds: [],
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
            selectedMoviesCounter() {
                return this.selectedMoviesIds.length
            }
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
            },

            onSelectedMovie(movie) {
                if (this.selectedMoviesIds.indexOf(movie.id) > -1) {
                    return;
                }
                this.selectedMoviesIds.push(movie.id)
            },
               selectAll(){
this.selectedMoviesIds = this.movies.map((movie) => movie.id);
    },
    deselectAll(){
       this.selectedMoviesIds = []; 
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