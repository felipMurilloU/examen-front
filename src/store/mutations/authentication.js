
export default {
  setAuthenticationValue (state, payload) {
    state.authentication[payload.name] = payload.value
  },
  setAuthenticationValues (state, payload) {
    state.authentication = { ...state.authentication, ...payload }
  },

  setUserSelected(state, payload) {
    state.users.selected = payload
  },

  setUserValues (state, payload) {
    state.users.selected[payload.name] = payload.value
  },

  setUsers (state, payload) {
    state.users.items = payload.response
  },

  signOut (state) {
    state.authentication = {
      ...state.authentication,
      loading: false
    }
    sessionStorage.removeItem('access-token')
    // router.push({ name: 'sign-in' })
  }
}
