<template>
    <div>
        <h4 class="text-center">Login please</h4>
        <form @submit.prevent="onSubmit" class="jumbotron">
             <div class="form-group row">
                <label for="email" class="col-4 col-form-label">Email</label>
                <div class="col-8">
                    <input id="email" name="email" type="email" class="form-control here" v-model="email">
                </div>
            </div>
             <div class="form-group row">
                <label for="password" class="col-4 col-form-label">Password</label>
                <div class="col-8">
                    <input id="password" name="password" type="password" class="form-control here" v-model="password">
                </div>
            </div>
             <div class="form-group row">
                 <div class="offset-4 col-8">
                    <!-- errors from server -->
                    <div v-for="(error, key) in errors" :key="key" v-if="error" class="alert alert-danger">
                        {{error}}
                    </div>
                     <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>
 <script>
    import {
        authService
    } from './../services/AuthService'
    import {
        mapMutations
    } from "vuex";
    export default {
        name: "AppLogin",
         data() {
            return {
                errors: [],
                email: '',
                password: ''
             }
        },
        methods: {
            ...mapMutations([
                "setIsAuthenticated"
            ]),
            onSubmit() {
                authService.login(this.email, this.password)
                    .then(() => {
                        this.$router.push({
                            name: "movies"
                        });
                        // vuex
                        this.setIsAuthenticated(true);
                     }).catch((error) => {
                        this.errors = error.response.data;
                        console.log('See errors', this.errors)
                    })
             },
         }
    }
</script>
 <style>
</style> 