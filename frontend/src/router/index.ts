import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewModel from '../views/ViewModel.vue'
import Profile from '../views/Profile.vue'
import Files from '../views/Files.vue'
import Tags from '../views/Tags.vue'
import Families from '../views/Families.vue'
import DSGVO from '../views/DSGVO.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/ViewModel',
    name: 'ViewModel',
    component: ViewModel
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/families',
    name: 'Families',
    component: Families
  },
  {
    path: '/dsgvo',
    name: 'DSGVO',
    component: DSGVO
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
