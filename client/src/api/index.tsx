import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile') || '{}').token
    }`
  }
  return req
})

export const signUp = (formData: any) => API.post('/users/signup', formData)
export const signIn = (formData: any) => API.post('/users/signin', formData)
export const updateUser = (formData: any, userId: string) =>
  API.post(`/users/${userId}`, formData)
