import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Toast from 'vue-easy-toast'

Vue.use(Toast)
Vue.use(Vuelidate)

import App from './App'

new Vue({
  ...App
}).$mount('#app')
