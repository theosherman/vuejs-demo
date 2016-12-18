import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: require('./components/Home.vue') },
    { path: '/grid', component: require('./components/Grid.vue') }
  ]
})

export default router
