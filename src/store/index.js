import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    stateManagement: require('./state-management.js')
  }
})

export default store
