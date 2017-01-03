import Vue from 'vue'
import Vuex from 'vuex'

import stateManagement from './state-management'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    stateManagement
  }
})

export default store
