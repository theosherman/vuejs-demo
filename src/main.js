import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'

Vue.use(Vuelidate)

new Vue({
  ...App
}).$mount('#app')
