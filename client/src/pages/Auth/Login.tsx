import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { LOGIN } from '../../constants/actionTypes'
import * as api from '../../api/index'
import hairpink from '../../assets/images/hairpink.jpg'
import './Login.css'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
  const login =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      try {
        // log in the user
        const { data } = await api.signIn(formData)
        dispatch({ type: LOGIN, data })
        history.push('/')
      } catch (err: any) {
        errorM = err.response.data
        console.log(errorM)
        setErrorMsg(errorM)
      }
    }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    dispatch(login(formData, history))
  }
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div
      className='login'
      style={{
        backgroundImage: `url(${hairpink})`,
      }}>
      <div className='input-group'>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <h5>Username:</h5>
          <input name='email' onChange={handleChange} type='email' />
          <h5>Password:</h5>
          <input name='password' type='Password' onChange={handleChange} />
          <br />
          {errorMsg && <p style={{ color: 'red' }}> {errorMsg} </p>}
          <button type='submit'>Sign In</button>
          <p>
            Not registered?{' '}
            <NavLink to='user-signup' style={{ color: 'blue' }}>
              Click Here
            </NavLink>{' '}
            to register.
          </p>
        </form>
      </div>
    </div>
  )
}
export default Login
