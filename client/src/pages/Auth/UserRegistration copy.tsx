import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { AUTH } from '../../constants/actionTypes'
import * as api from '../../api/index'
//import pinkcrop1 from "../../assets/images/pinkcrop1.jpg";
import pinkcrop1 from '../../assets/images/hairpink.jpg'
import './UserRegistration.css'

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    role: 'user',
    // imageProfile:
    //   'https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png',
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
    <>
      <div className='FeatureContainer_image UserRegistration'>
        <div className='FeatureContainer'>
          {/* <div className="UserRegistration_container"> */}
          <div className='UserRegistration_inputGroup'>
            <label>First Name</label>
            <input
              name='lastName'
              onChange={handleChange}
              autoFocus
              className='UserRegistration_input'
            />
            <label>Last Name</label>
            <input
              name='lastName'
              onChange={handleChange}
              autoFocus
              className='UserRegistration_input'
            />
          </div>
          <div className='UserRegistration_radioButton'></div>
          {/* </div>  */}
        </div>
      </div>
    </>
  )
}

export default UserRegistration
