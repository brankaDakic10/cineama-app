<template>
    <div class="container">
        <h3>Store Movie</h3>
        <b-form @submit.prevent="storeMovie" @reset="resetForm">
            <b-form-group label="Movie Title:">
                <b-form-input type="text" v-model="movieForm.title" placeholder="Enter title">
                </b-form-input>
                <div class="alert alert-danger" role="alert" v-if="errors.title">
                    {{ errors.title[0] }}
                </div>
            </b-form-group>
            <b-form-group label="Director:">
                <b-form-input type="text" v-model="movieForm.director" placeholder="Enter director">
                </b-form-input>
                <div class="alert alert-danger" role="alert" v-if="errors.director">
                    {{ errors.director[0] }}
                </div>
            </b-form-group>
            <b-form-group label="ImageUrl:">
                <b-form-input type="text" v-model="movieForm.imageUrl" placeholder="Enter imageUrl">
                </b-form-input>
                <div class="alert alert-danger" role="alert" v-if="errors.imageUrl">
                    {{ errors.imageUrl[0] }}
                </div>
            </b-form-group>
            <b-form-group label="Duration:">
                <b-form-input type="text" v-model="movieForm.duration" placeholder="Enter duration">
                </b-form-input>
                <div class="alert alert-danger" role="alert" v-if="errors.duration">
                    {{ errors.duration[0] }}
                </div>
            </b-form-group>
            <b-form-group label=" Release Date:">
                <b-form-input type="text" v-model="movieForm.releaseDate" placeholder="Enter releaseDate">
                </b-form-input>
                <div class="alert alert-danger" role="alert" v-if="errors.releaseDate">
                    {{ errors.releaseDate[0] }}
                </div>
            </b-form-group>
            <b-form-group label="Genre:">
                <b-form-input type="text" v-model="movieForm.genre" placeholder="Enter genre">
                </b-form-input>
            </b-form-group>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button type="submit" variant="success">Submit</b-button>
        </b-form>
    </div>
</template>
<script>
    import MoviesService from "./../services/MoviesService"
    export default {
        name: "AddMovie",
        data() {
            return {
                movieForm: {
                    title: "",
                    director: "",
                    imageUrl: "",
                    duration: "",
                    releaseDate: "",
                    genre: ""
                },
                errors: {}
            }

        },
        methods: {
            storeMovie() {
                MoviesService.store(this.movieForm)
                    .then((success) => {
                        this.errors = {}
                        this.redirectToHome()
                    }).catch(errors => {
                        // console.log("err ", errors.response.data)
                        this.errors = errors.response.data
                    })

            },
            redirectToHome() {
                this.$router.push({
                    name: 'home'
                })
            },
            resetForm() {
                this.movieForm = {}
            }
        }

    }
</script>
<style>
</style>