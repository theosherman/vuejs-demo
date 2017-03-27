import Vue from 'vue'
import Vuelidate from 'vuelidate'
import miniToastr from 'mini-toastr'

Vue.use(Vuelidate)

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
