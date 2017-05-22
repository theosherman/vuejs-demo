import Vue from 'vue'
import Vuelidate from 'vuelidate'
import miniToastr from 'mini-toastr'
import { ServerTable, ClientTable, Event } from 'vue-tables-2'

Vue.use(Vuelidate)
Vue.use(ClientTable, {}, false)

miniToastr.init()

import App from './App'
import router from './router'
import store from './store'

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
