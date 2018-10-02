<template>
    <div class="row p-2 mb-1" :class="{ 'highlighted text-white': selected }">
        <div class="col-sm" v-text="movie.id"></div>
        <div class="col-sm" v-text="movie.title"></div>
        <div class="col-sm" v-text="movie.director"></div>
        <div class="col-sm" v-text="movie.genre"></div>
        <div class="col-sm" v-text="movie.releaseDate"></div>
        <div class="col-sm" v-text="movie.duration"></div>
        <div class="col-sm">
            <b-button type="submit" variant="primary" @click="onSelected">
                Select
            </b-button>
        </div>


    </div>
</template>
<script>
    export default {
        name: "MovieRow",
        props: {
            movie: {
                type: Object,
                required: true
            },
            selectedMoviesIds: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        // data() {
        //     return {
        //         selected: false
        //     }
        // },
        computed: {
            selected() {
                return this.selectedMoviesIds
                    .indexOf(this.movie.id) > -1;
            }
        },
        methods: {
            onSelected() {
                this.$emit('on-selected-movie', this.movie, !this.selected)
            }
        }
    }
</script>
<style>
    .highlighted {
        background: rgb(134, 160, 185);
    }
</style>