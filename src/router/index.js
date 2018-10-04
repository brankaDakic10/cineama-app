import Vue from 'vue'
import VueRouter from 'vue-router'

import AppMovies from '../pages/AppMovies'
import AddMovie from '../pages/AddMovie'
import AppLogin from '../pages/AppLogin'
import AppRegister from '../pages/AppRegister'
import AppSingleMovie from '../pages/AppSingleMovie.vue'
import {
    requiresAuth,
    guestOnly
} from './guards'


Vue.use(VueRouter)


const routes = [{
        path: '/',
        redirect: '/movies',
        name: 'home',
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/movies',
        component: AppMovies,
        name: 'movies',
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/add',
        component: AddMovie,
        name: 'add',
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/login',
        component: AppLogin,
        name: 'login',
        meta: {
            guestOnly: true
        }

    },
    {
        path: '/register',
        component: AppRegister,
        name: 'register',
        meta: {
            guestOnly: true
        }


    },
    {
        path: '/movies/:id',
        component: AppSingleMovie,
        name: 'movie',
        meta: {
            requiresAuth: true
        }


    }
]
export const router = new VueRouter({
    mode: 'history',
    routes
})



// auth and guest guard 
router.beforeEach((to, from, next) => {


    //lancana provera
    Promise.resolve(to)
        .then(requiresAuth)
        .then(guestOnly)
        .then(() => {
            console.log('router.beforeEach->Promise.resolve(to)', next)
            next()
        })
        .catch(redirect => {
            console.log('router.beforeEach->catch', redirect)
            next(redirect);
        })
})