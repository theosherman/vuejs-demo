import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: require('./components/Home.vue') },
    { path: '/databinding', component: require('./components/DataBinding.vue') },
    { path: '/grid', component: require('./components/Grid.vue') },
    { path: '/form', component: require('./components/Form.vue') },
    { path: '/statemanagement', component: require('./components/StateManagement.vue') },
  ]
})

export default router
