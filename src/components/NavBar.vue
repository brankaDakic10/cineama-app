<template>
   <div>
        <nav class="navbar navbar-expand-lg navbar-dark main-nav">
            <router-link class="navbar-brand" :to="{name:'home'}">AppCinema</router-link>
            <div class="navbar-nav w-100">
                <router-link class="nav-item nav-link" :to="{name:'movies'}">Movies</router-link>
                <div class="navbar-nav"></div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
name:"NavBar"
}
</script>

<style scoped>
.main-nav{
    background-color: cornflowerblue;
}
</style>
