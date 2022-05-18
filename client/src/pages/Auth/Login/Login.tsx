import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { LOGIN } from '../../../constants/actionTypes'
import * as api from '../../../api/index'
import './Login.css'

const initialState = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState(initialState)
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
    <div className=' FeatureContainer_image Login'>
      <div className='FeatureContainer'>
        <div className='Login_inputGroup'>
          <form onSubmit={handleSubmit} className='Login_form'>
            <h5>
              <label>Email</label>
            </h5>
            <input
              name='email'
              onChange={handleChange}
              type='email'
              className='Login_input'
              autoFocus
            />
            <h5>
              <label>Password</label>
            </h5>
            <input
              name='password'
              type='Password'
              onChange={handleChange}
              className='Login_input'
            />
            <br />
            {errorMsg && <p style={{ color: 'grey' }}> {errorMsg} </p>}
            <button type='submit' className='Login btn--btn-primary'>
              Sign In
            </button>
            <p style={{ fontWeight: 300 }}>
              Don't have an account?{' '}
              <NavLink
                to='user-signup'
                style={{ fontWeight: 500, color: 'black' }}
              >
                Click Here{' '}
              </NavLink>
              to Sign Up
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
