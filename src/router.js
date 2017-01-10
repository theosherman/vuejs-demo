import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import _ from 'lodash'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      component: require('./components/Home.vue')
    },
    {
      path: '/databinding',
      component: require('./components/DataBinding.vue')
    },
    {
      path: '/grid',
      component: require('./components/Grid.vue')
    },
    {
      path: '/form',
      component: require('./components/Form.vue')
    },
    {
      path: '/statemanagement',
      component: require('./components/StateManagement.vue')
    },
    {
      path: '/jquery',
      component: require('./components/Jquery.vue')
    },
    {
      path: '/modal',
      component: require('./components/Modal.vue')
    },
    {
      path: '/secureroute',
      component: require('./components/SecureRoute.vue'),
      meta: {
        peopleWithAccess: ['David']
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const meta = _.first(to.matched).meta;

  if (meta.peopleWithAccess) {
    const name = store.state.auth.displayName
    if (_.includes(meta.peopleWithAccess, name))
      next()
    else
      alert('Permission denied. Go away!')
  } else {
    next()
  }
})

export default router
