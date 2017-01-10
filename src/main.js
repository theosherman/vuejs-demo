import Vue from 'vue'
import Vuelidate from 'vuelidate'
import miniToastr from 'mini-toastr'

Vue.use(Vuelidate)

miniToastr.init()

import App from './App'

new Vue({
  ...App
}).$mount('#app')
