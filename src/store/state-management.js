export default {

  state: {
    message: 'Hello world!',
    hide: false
  },

  actions: {
    setMessage({ commit }) {
      commit('setMessage')
    }
  },

  mutations: {
    setMessage(state, message) {
      state.stateManagement.message = message
    }
  },

  getters: {
    getMessage: state => {
      return state.stateManagement.message
    }
  }

}
