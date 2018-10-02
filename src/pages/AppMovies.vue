<template>
    <div class="container">
        <movie-row v-for="movie in movies" :key="movie.id" :movie="movie"/>
        </div>
</template>

<script>
import MoviesService from "./../services/MoviesService"
import MovieRow from "./../components/MovieRow.vue"
 import {
        mapGetters,
        mapActions
    } from "vuex"

export default {
name:"AppMovies",

components:{
    MovieRow 
},
data(){
    return{
        // movies:[]
    }
},
computed:{
   ...mapGetters({
          movies: "getMovies"
            }),
},
 methods: {
       ...mapActions([
                "fetchMovies"
            ]),
},
beforeRouteEnter (to, from, next) {
    // MoviesService.getAll()
    //   .then(({data}) => {
    //     next((vm) => {
    //       vm.movies = data
    //     })
        
    //   })
       next()
  },

  created(){
     this.fetchMovies();
        }
}
</script>

<style>

</style>
