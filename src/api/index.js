import axios from 'axios'
import config from '../config'

export default class Api {
  constructor() {
    this.client = axios.create({ baseURL: '/api' })
    this.client.interceptors.request.use(
      axiosConfig => {
        console.log('intercept')
        return {
          ...axiosConfig,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(config.LOCAL_STORAGE_NAME)}`
          },
        }
      },
      e => Promise.reject(e)
    )


  }

  async register({ name, password }) {
    return this.client.post('/auth/register', { name, password })
  }

  async login({ name, password }) {
    return this.client.post('/auth/login', { name, password })
  }

  async account() {
    return this.client.get('/account')
  }

  async getAccount(id) {
    return this.client.get(`/account/${id}`)
  }

  async transfer(from, to, amount) {
    return this.client.post(`/account/transfer/${from}/${to}`, { amount })
  }
}