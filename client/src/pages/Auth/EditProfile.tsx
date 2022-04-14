import { useState, useEffect } from 'react'
import UserImage from '../../UIElements/UserImage'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH, UPDATE, LOGIN } from '../../constants/actionTypes'
import * as api from '../../api/index'
import './UserRegistration.css'
import '../Profile/Profile.css'
import 'react-toastify/dist/ReactToastify.css'

require('dotenv').config()
toast.configure()

export const EditProfile = () => {
  const [userData, setUserData] = useState<any | {}>({})

  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
  const [firstName, setFirstName] = useState<any | ''>('')
  const [lastName, setLastName] = useState<any | ''>('')
  const [email, setEmail] = useState<any | ''>('')
  const [password, setPassword] = useState<any | ''>('')
  const [confirmPassword, setConfirmPassword] = useState<any | ''>('')
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState<any | null>(null)
  const [isRole, setIsRole] = useState<any | ''>('')
  const [imageProfile, setImageProfile] = useState<any | ''>('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile') ?? 'false')
    console.log(user)
    setFirstName(user.result.name.split(' ')[0])
    setLastName(user.result.name.split(' ')[1])
    setEmail(user.result.email)
    setImage(user.result.imageProfile)
    setIsRole(user.result.role)
    // setImageProfile(user.result.imageProfile)
  }, [])

  const updateUser =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      try {
        // update the user
        const { data } = await api.updateUser(userData)
        dispatch({ type: UPDATE, data })
        history.push('/')
      } catch (err: any) {
        errorM = err.response.data
        setErrorMsg(errorM)
      }
    }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const onImageChange = async (event: any) => {
    if (event.target.files[0]) {
      if (event.target.files[0].type.match('image')) {
        setImage(URL.createObjectURL(event.target.files[0]))

        let base64 = (await new Promise(resolve => {
          let reader = new FileReader()
          reader.onload = e => {
            resolve(e.target?.result as any)
          }
          reader.readAsDataURL(event.target.files[0])
        })) as string
        setImage({ imageProfile: base64 })
        // setUserData({ ...userData, imageProfile: base64 })
        // setUserData({ ...userData, imageProfile: base64 })
      } else {
        return 'Image type error, it should be png/jpeg.'
      }
    } else {
      return 'Unknown.'
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(password, confirmPassword, isRole, imageProfile)
    const name = { name: firstName + ' ' + lastName, email }
    const merge = { ...name, ...userData }
    console.log('merge', merge)
    setUserData(merge)
    console.log('in handle submit, userData', userData)
    dispatch(updateUser(userData, history))
  }

  // const itemUpdateSubmitHandler = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch(`/api/items/${itemId}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, description }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Could not save new item");
  //     }

  //     history.push("/items");
  //   } catch (err) {}
  // };
  // const handleChange = (e: any) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value })
  // }

  return (
    <>
      <div className='FeatureContainer_image EditUser'>
        <div className='FeatureContainer'>
          <div className='UserRegistration_inputGroup'>
            <form className='UserRegistration_form' onSubmit={handleSubmit}>
              <UserImage
                pic={image}
                name={'Sergio'}
                handleChange={onImageChange}
              />
              <h5>
                <label>First Name</label>
              </h5>
              <input
                name='firstName'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                autoFocus
                className='UserRegistration_input'
              />
              <h5>
                <label>Last Name</label>
              </h5>
              <input
                name='lastName'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className='UserRegistration_input'
              />
              <h5>
                <label>Email</label>
              </h5>
              <input
                name='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                className='UserRegistration_input'
              />
              <h5>
                <label>New Password</label>
              </h5>
              <Input
                name='password'
                type={showPassword ? 'text' : 'password'}
                onChange={e => setPassword(e.target.value)}
                className='UserRegistration_input'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={toggleShow}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? (
                        <VisibilityRoundedIcon />
                      ) : (
                        <VisibilityOffRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <h5>
                <label>Confirm Password</label>
              </h5>
              <Input
                name='confirmPassword'
                className='UserRegistration_input'
                type={showPassword ? 'text' : 'password'}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <div className='UserRegistration_radioButtons'>
                <h5 className='UserRegistration_radio'>
                  <input
                    type='radio'
                    name='role'
                    value='user'
                    checked={isRole === 'user'}
                    onChange={e => setIsRole(e.target.value)}
                  />
                  User
                </h5>
                <h5 className='UserRegistration_radio'>
                  <input
                    type='radio'
                    name='role'
                    value='owner'
                    onChange={e => setIsRole(e.target.value)}
                    checked={isRole === 'owner'}
                  />
                  Owner
                </h5>
              </div>
              <button type='submit' className='UserRegistration_submit'>
                <h6 className='btn--btn-primary'>Update Profile</h6>
              </button>
              <br />
              {errorMsg && <p style={{ color: 'grey' }}> {errorMsg} </p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
