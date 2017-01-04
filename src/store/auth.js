export default {
  
  namespaced: true,

  state: {
    displayName: 'Scott Kamm'
  },

  mutations: {
    setDisplayName(state, displayName) {
      state.displayName = displayName
    }
  }

}
