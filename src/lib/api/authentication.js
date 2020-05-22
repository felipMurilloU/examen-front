import fetchToApi from '@/lib/fetchToApi'
export default {
  async login (username, password) {
    let payload = await fetchToApi('users/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ username, password }),
      errors: [
        { code: 400, message: 'Usuario o Contraseña inválidos' }
      ]
    })
    if (!payload.success) {
      throw new Error(payload.message)
    } else {
      return payload
    }
  },

  async getUsers () {
    let payload = await fetchToApi('users', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      errors: [
        { code: 400, message: 'Usuario o Contraseña inválidos' }
      ]
    })
    return payload
  },

  async saveUser (user) {
    let payload = await fetchToApi('users', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(user),
      errors: [
        { code: 400, message: 'Usuario o Contraseña inválidos' }
      ]
    })
    return payload
  }
}
