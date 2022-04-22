import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })
//let userId: string = JSON.parse(localStorage.getItem('profile')?? 'false').result._id
//console.log("Index.tsx line 5 : "+ userId);

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
<<<<<<< Updated upstream
export const updateUser = (formData: any, userId: string) =>
  API.post(`/users/${userId}`, formData)
=======
export const updateUser = (formData: any, userId: string) => API.post('/users/'+ userId, formData)
>>>>>>> Stashed changes
