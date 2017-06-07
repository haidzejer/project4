import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

const clientAuth = {

  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if(token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },

  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  logIn: (credentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  getUsers: () => {
    return axios({
      url: '/',
      method: 'GET'
    })
    // .then( res => {
    //   return res.data
    // })
  },

  editUser: (editedUser) => {
    return axios({
      url: `/api/users/${editedUser._id}`,
      method: 'patch',
      data: editedUser
    })
    .then(res => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

  deleteUser: (id) => {
    return axios({
      url: `/api/users/${id}`,
      method: 'delete'
    })
    .then(res => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
    })
  },

  logOut: () => {
    return new Promise((resolve) => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve("bye.")
    })
  }
}


clientAuth.setTokenHeader()
export default clientAuth
