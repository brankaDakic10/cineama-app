<template>
    <div class="container">
        <h3 class="text-center">All Movies</h3>
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
                    <!-- dropdown button with options -->
                    <b-dropdown class="float-right mr-1" size="sm" text="Sort By">
                        <!-- by title -->
                        <b-dropdown-item @click="sortBy('title', 'asc')">
                            Movie Title ASC
                        </b-dropdown-item>
                        <b-dropdown-item @click="sortBy('title', 'desc')">
                            Movie Title DESC
                        </b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <!-- by duration-->
                        <b-dropdown-item @click="sortBy('duration', 'asc')">
                            Movie Duration ASC
                        </b-dropdown-item>
                        <b-dropdown-item @click="sortBy('duration', 'desc')">
                            Movie Duration DESC
                        </b-dropdown-item>
                    </b-dropdown>
                    <!-- end dropdown -->
                </div>
                <!-- end buttons div -->
            </div>

            <movie-row v-for="movie in visibleCollectionOfMovies" :key="movie.id" :movie="movie" @on-selected-movie="onSelectedMovie"
                :selectedMoviesIds="selectedMoviesIds" />
            <MoviePaginator :number-of-pages="totalNumberOfPages" :current-page="currentPage" @selected-page="changeCurrentPage" />
            <b-alert show variant="warning" v-if="!movies.length">
                No Movies
            </b-alert>
        </div>
    </div>
</template>

<script>
    import MoviesService from "./../services/MoviesService"
    import MovieRow from "./../components/MovieRow.vue"
    import MoviePaginator from "./../components/MoviePaginator.vue"

    import {
        mapGetters,
        mapActions
    } from "vuex"

    export default {
        name: "AppMovies",

        components: {
            MovieRow,

            MoviePaginator
        },
        data() {
            return {
                // movies:[]
                searchTerm: "",
                selectedMoviesIds: [],
                currentPage: 1,
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
            },
            //  moviePaginator
            totalNumberOfPages() {
                return Math.ceil(this.movies.length / 5)
            },
            // show 5 movies on page moviePaginator
            visibleCollectionOfMovies() {
                let bottomIndexLimit = (this.currentPage - 1) * 5
                let topIndexLimit = bottomIndexLimit + 5
                return this.movies.filter(
                    (movie, index) => index >= bottomIndexLimit && index < topIndexLimit)
            }
        },
        methods: {
            ...mapActions([
                "fetchMovies"
            ]),

            onSearchTermChanged(term) {
                MoviesService.index(term)
                    .then(({
                        data
                    }) => {
                        this.movies = data
                    })
            },
            // method for select and deselect single movie-row
            onSelectedMovie(movie, isSelected) {
                if (!isSelected) {
                    let movieIndex = this.selectedMoviesIds.indexOf(movie.id);
                    this.selectedMoviesIds.splice(movieIndex, 1);
                    return;
                }
                this.selectedMoviesIds.push(movie.id)
            },
            selectAll() {
                this.selectedMoviesIds = this.movies.map((movie) => movie.id);
            },
            deselectAll() {
                this.selectedMoviesIds = [];
            },

            sortBy(prop, order) {
                let orderCoefficient = order === 'asc' ? 1 : -1;
                this.movies = this.movies.sort((movie1, movie2) => {
                    return movie1[prop] >= movie2[prop] ?
                        orderCoefficient : -orderCoefficient
                })
            },
            changeCurrentPage(page) {
                this.currentPage = page;
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