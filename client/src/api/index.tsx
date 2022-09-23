import axios, {AxiosRequestConfig} from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000/api' })

export interface UserData {
  role: string;
  imageProfile: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;

}



API.interceptors.request.use((req: any) => {
  console.log("XXXXXXXXXXXXXX: ",req.headers)
  /* if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile') || '{}').token
    }`
  } */
  return req
})

export const signUp = (formData: UserData) => API.post('/users/signup', formData)
export const signIn = (formData: any) => API.post('/users/signin', formData)
export const updateUser = (formData: any, userId: string) =>
  API.post(`/users/${userId}`, formData)
