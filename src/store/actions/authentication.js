import api from '@/lib/api'
import router from '@/router'
export default {  
  async login ({ commit, state }) {
    try {
      const response = await api.login(state.authentication.username, state.authentication.password)
      commit('setAuthenticationValues', { role: response.username, name: response.name })
      sessionStorage.setItem('access-token', response.token)
        router.replace({ name: '/' })
      // commit('setLoading', { accessor: 'authentication', value: false })
    } catch (error) {
      console.log(error)
    }
  },

  async getUsers({ commit }) {
    try {
      const response = await api.getUsers()
      commit('setUsers', { response })
    } catch (error) {
      console.log(error)
    }
  },

  async saveUser({ commit, state }) {
    try {
      const user = state.users.selected
      const response = await api.saveUser(user)
    } catch (error) {
      console.log(error)
    }
  }

}
