import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import _ from 'lodash'
import miniToastr from 'mini-toastr'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      component: require('./components/Home')
    },
    {
      path: '/databinding',
      component: require('./components/DataBinding')
    },
    {
      path: '/grid',
      component: require('./components/Grid'),
      children: [
        {
          path: '/grid/localdata',
          component: require('./components/Grid/LocalData')
        },
        {
          path: '/grid/serverdata',
          component: require('./components/Grid/ServerData')
        },
        {
          path: '/grid/vuetables2client',
          component: require('./components/Grid/VueTables2Client')
        }
      ]
    },
    {
      path: '/form',
      component: require('./components/Form'),
      children: [
        {
          path: '/form/basicform',
          component: require('./components/Form/BasicForm')
        },
        {
          path: '/form/advancedform',
          component: require('./components/Form/AdvancedForm')
        }
      ]
    },
    {
      path: '/statemanagement',
      component: require('./components/StateManagement')
    },
    {
      path: '/jquery',
      component: require('./components/Jquery')
    },
    {
      path: '/modal',
      component: require('./components/Modal')
    },
    {
      path: '/secureroute',
      component: require('./components/SecureRoute'),
      meta: {
        peopleWithAccess: ['David']
      }
    },
    {
      path: '/lazyroute',
      component: resolve => require(['./components/LazyRoute'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  const meta = _.first(to.matched).meta

  if (meta.peopleWithAccess) {
    const name = store.state.auth.displayName
    if (_.includes(meta.peopleWithAccess, name))
      next()
    else
      miniToastr.warn('Permission denied')
  } else {
    next()
  }
})

export default router
