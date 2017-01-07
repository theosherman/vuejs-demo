export default {
  
  namespaced: true,

  state: {
    displayName: 'Theo'
  },

  mutations: {
    setDisplayName(state, displayName) {
      state.displayName = displayName
    }
  }

}
