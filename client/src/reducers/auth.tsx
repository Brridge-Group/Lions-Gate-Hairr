/* eslint-disable import/no-anonymous-default-export */
import { AUTH, LOGIN, LOGOUT, UPDATE } from '../constants/actionTypes'
export default (
  state = { authData: null },
  action: { type: any; data: any }
) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data }
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data }
    case UPDATE:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data }
    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }
    default:
      return state
  }
}
