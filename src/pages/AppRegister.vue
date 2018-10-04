<template>
    <div class="container">

        <form @submit.prevent="onSubmit" @reset="onReset" class="jumbotron">
            <h4 class=" mb-4">Register please</h4>
            <div class="form-group row">

                <div class="col-8">
                    <label for="name" class="col-4 col-form-label">Name</label>
                    <input id="name" name="name" type="name" class="form-control here" v-model="newUser.name">
                    <div class="alert alert-danger" role="alert" v-if="errors.name">
                        {{ errors.name[0] }}
                    </div>
                </div>

            </div>


            <div class="form-group row">

                <div class="col-8">
                    <label for="email" class="col-4 col-form-label">Email</label>
                    <input id="email" name="email" type="email" class="form-control here" v-model="newUser.email">
                    <!-- error -->
                    <div class="alert alert-danger" role="alert" v-if="errors.email">
                        {{ errors.email[0] }}
                    </div>
                </div>

            </div>

            <div class="form-group row">

                <div class="col-8">
                    <label for="password" class="col-4 col-form-label">Password</label>
                    <input id="password" name="password" type="password" class="form-control here" v-model="newUser.password">
                    <!-- error -->
                    <div class="alert alert-danger" role="alert" v-if="errors.password">
                        {{ errors.password[0] }}
                    </div>
                </div>


            </div>

            <div class="form-group row">

                <div class="col-8">
                    <label for="password_confirmation" class="col-4 col-form-label">Password_confirmation:</label>
                    <input id="password_confirmation" name="password_confirmation" type="password" class="form-control here" v-model="newUser.password_confirmation">
                    <!-- error -->
                    <div class="alert alert-danger" role="alert" v-if="errors.password_confirmation">
                        {{ errors.password_confirmation[0] }}
                    </div>
                </div>

            </div>




            <div class="form-group row">

                <div class="offset-6 col-12">

                    <button name="reset" type="reset" class="btn btn-danger">Reset</button>

                    <button name="submit" type="submit" class="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import {
        authService
    } from './../services/AuthService'
   

   
    export default {
        name: "AppRegister",
        data() {
            return {
                errors:{},
                newUser: {
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: ""
                }
            }
        },
        methods: {
                 onSubmit(){
                   
                      authService.register(this.newUser)
                    .then(() => {
                        this.errors = {}
                        this.$router.push({
                            name: 'login'
                        })
                        
                    }).catch(err => {
                      this.errors = err.response.data;
                      console.log('see',this.errors)
                       
                        
                    })
                 },
                   onReset(){
                     this.newUser={}
                     this.errors={}
                 }
        }
    }
</script>



<style>
</style>
