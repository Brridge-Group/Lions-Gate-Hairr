import { useState } from 'react'
import UserImage from '../../../UIElements/UserImage'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH } from '../../../constants/actionTypes'
import * as api from '../../../api/index'
import './UserRegistration.css'
import '../../Profile/Profile.css'

import 'react-toastify/dist/ReactToastify.css'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface UserRegistration {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

require('dotenv').config()
toast.configure()

export const UserRegistration = () => {
  const [userData, setUserData] = useState({
    role: 'user',
    imageProfile: 'https://imgur.com/LDpwLVZ.jpg',
  })

  const [errorMsg, setErrorMsg] = useState()
  const [imageSelected, setImageSelected] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState<any | null>(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const signup =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      let data
      try {
        // sign up the user
        data = await api.signUp(userData)
        dispatch({ type: AUTH, data })
        userData.role === 'user'
          ? history.push('/')
          : history.push('/add-business')
      } catch (err: any) {
        errorM = err.response.data
        toast(errorM)
      }
    }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }

  const onImageChange = async (e: any) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      setImageSelected(true)
      const maxFileSize = 2097067 //2mb
      const file = e.target.files[0]

      if (file.type.match('image.*')) {
        if (file.size > maxFileSize) {
          toast.error(
            `File size is too large ${file.size}kb . Please upload image less than 2 mb.`
          )
        } else {
          setImage(URL.createObjectURL(file))
          let base64 = (await new Promise(resolve => {
            let reader = new FileReader()
            reader.onload = e => {
              resolve(e.target?.result as any)
            }
            reader.readAsDataURL(file)
          })) as string

          setUserData({ ...userData, imageProfile: base64 })
        }
      } else {
        toast.error('Error: the file is not a image. It should be png/jpeg.')
      }
    } else {
      toast.error('No image was selected.')
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(signup(userData, history))
  }

  const handleChange = (e: any) => {
    console.log(e.target.value)
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='FeatureContainer_image Profile'>
        <div className='FeatureContainer'>
          <div className='UserRegistration_inputGroup'>
            <form className='UserRegistration_form' onSubmit={handleSubmit}>
              <UserImage
                pic={image}
                name={'profile-picture'}
                handleChange={onImageChange}
              />
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
              <div className='UserRegistration_password-wrapper'>
                <h5>
                  <label>Password</label>
                </h5>
                <input
                  name='password'
                  className='UserRegistration_input'
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='UserRegistration_input-button'
                  onClick={toggleShow}>
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>

              <h5>
                <label>Confirm Password</label>
              </h5>
              <input
                name='confirmPassword'
                className='UserRegistration_input'
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
              />
              <div className='UserRegistration_radioButtons'>
                <h5 className='UserRegistration_radio'>
                  <input
                    type='radio'
                    name='role'
                    value='user'
                    onChange={handleChange}
                    checked={userData.role === 'user'}
                  />
                  User
                </h5>
                <h5 className='UserRegistration_radio'>
                  <input
                    type='radio'
                    name='role'
                    value='owner'
                    onChange={handleChange}
                    checked={userData.role === 'owner'}
                  />{' '}
                  Owner
                </h5>
              </div>
              <button type='submit' className='UserRegistration_submit'>
                <h6 className='btn--btn-primary'>Sign Up</h6>
              </button>
              <p style={{ fontWeight: 300 }}>
                Have an account?{' '}
                <NavLink
                  to='user-signin'
                  style={{ fontWeight: 500, color: 'black' }}>
                  Click Here
                </NavLink>{' '}
                to Login.
              </p>
              <br />
              {errorMsg && <p style={{ color: 'grey' }}> {errorMsg} </p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
