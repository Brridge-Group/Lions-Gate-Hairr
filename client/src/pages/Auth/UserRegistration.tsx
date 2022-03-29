import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH } from '../../constants/actionTypes'
import * as api from '../../api/index'
import './UserRegistration.css'

export const UserRegistration = () => {
  const [formData, setFormData] = useState({
    role: 'user',
    // imageProfile:
    //   'https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png',
  })
  const [isChecked, setIsChecked] = useState(false)
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
    <>
      <div className='FeatureContainer_image UserRegistration'>
        <div className='FeatureContainer'>
          <div className='UserRegistration_inputGroup'>
            <form className='UserRegistration_form'>
              <h5>
                <label>First Name</label>
              </h5>
              <input
                name='firstName'
                onChange={handleChange}
                autoFocus
                className='UserRegistration_input'
              />
              <h5>
                <label>Last Name</label>
              </h5>
              <input
                name='lastName'
                onChange={handleChange}
                className='UserRegistration_input'
              />
              <h5>
                <label>Email</label>
              </h5>
              <input
                name='email'
                onChange={handleChange}
                className='UserRegistration_input'
              />
              <h5>
                <label>Password</label>
              </h5>
              <input
                name='password'
                onChange={handleChange}
                className='UserRegistration_input'
              />
              <h5>
                <label>Confirm Password</label>
              </h5>
              <input
                name='password'
                onChange={handleChange}
                className='UserRegistration_input'
              />
              <div className='UserRegistration_radioButtons'>
                <h5 className='UserRegistration_radio'>
                  <input type='radio' value='User' name='role' /> User
                </h5>
                <h5 className='UserRegistration_radio'>
                  <input type='radio' value='Owner' name='role' /> Owner
                </h5>
              </div>
              <button type='submit' className='UserRegistration_submit'>
                <h6 className='btn--btn-primary'>submit</h6>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
