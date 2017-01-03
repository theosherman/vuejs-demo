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
      state.message = message
    }
  },

  getters: {
    getMessage: state => {
      return state.message
    }
  }

}
