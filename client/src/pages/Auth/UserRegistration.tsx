import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { AUTH } from '../../constants/actionTypes'
import * as api from '../../api/index'
import hairpink from '../../assets/images/hairpink.jpg'
import './UserRegistration.css'

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    role: 'user',
    imageProfile:
      'https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png',
  })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')

  const signup =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      try {
        // sign up the user
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH, data })
        history.push('/')
      } catch (err: any) {
        errorM = err.response.data
        console.log(errorM)
        setErrorMsg(errorM)
      }
    }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(signup(formData, history))
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
  }

  return (
    <div
      className='signup'
      style={{
        backgroundImage: `url(${hairpink})`,
      }}>
      <div className='input-group'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <button>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                setFormData({ ...formData, imageProfile: base64 })
              }}
            />
          </button>
          <h5>First Name:</h5>
          <input name='firstName' onChange={handleChange} autoFocus />
          <h5>Last Name:</h5>
          <input name='lastName' onChange={handleChange} />
          <h5>Email:</h5>
          <input name='email' onChange={handleChange} type='email' />
          <h5>Password:</h5>
          <input name='password' type='password' onChange={handleChange} />
          <h5>Confirm Password:</h5>
          <input
            name='confirmPassword'
            onChange={handleChange}
            type='password'
          />
          <br />
          <p>
            <b>Are you a:</b>
          </p>
          <div>
            <label>User</label>
            &ensp;
            <input
              type='radio'
              name='role'
              value='user'
              onChange={handleChange}
              checked={formData.role === 'user'}
            />
            <br />
            <label>Business Owner</label>
            &ensp;
            <input
              type='radio'
              name='role'
              value='owner'
              onChange={handleChange}
              checked={formData.role === 'owner'}
            />
          </div>
          <br />
          {errorMsg && <p style={{ color: 'red' }}> {errorMsg} </p>}
          <button type='submit'>Sign Up</button>
          <p>
            Have an account?{' '}
            <NavLink to='user-signin' style={{ color: 'blue' }}>
              Click Here
            </NavLink>{' '}
            to Login.
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserRegistration
