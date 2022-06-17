import { useState } from 'react'
import UserImage from '../../UIElements/UserImage'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UPDATE } from '../../constants/actionTypes'
import * as api from '../../api/index'
import './UserRegistration/UserRegistration.css'
import '../Profile/Profile.css'
import 'react-toastify/dist/ReactToastify.css'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
toast.configure()

interface EditProfile {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
export const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result

  const dispatch = useDispatch()
  const history = useHistory()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [userData, setUserData] = useState({
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1],
    email: user.email,
    role: user.role,
    imageProfile: user.imageProfile,
    password: '',
    confirmPassword: '',
  })

  const updateUser =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      try {
        // update the user
        const { data } = await api.updateUser(userData, user._id)
        dispatch({ type: UPDATE, data })
        userData.role === 'user'
          ? history.push('/')
          : history.push('/add-business')
      } catch (err: any) {
        errorM = err.response.data
        setErrorMsg(errorM)
      }
    }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }

  const onImageChange = async (event: any) => {
    if (event.target.files[0]) {
      if (event.target.files[0].type.match('image')) {
        let base64 = (await new Promise(resolve => {
          let reader = new FileReader()
          reader.onload = e => {
            resolve(e.target?.result as any)
          }
          reader.readAsDataURL(event.target.files[0])
        })) as string
        setUserData({ ...userData, imageProfile: base64 })
      } else {
        toast('Image type error, it should be png/jpeg.')
      }
    } else {
      toast('Unknown error, try again')
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(updateUser(userData, history))
  }

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='FeatureContainer_image Profile'>
        <div className='FeatureContainer'>
          <div className='UserRegistration_inputGroup'>
            <form className='UserRegistration_form' onSubmit={handleSubmit}>
              {
                <UserImage
                  pic={userData.imageProfile}
                  name={user.name + '_pictureProfile'}
                  handleChange={onImageChange}
                />
              }
              <h5>
                <label>First Name</label>
              </h5>
              <input
                name='firstName'
                value={userData.firstName}
                onChange={handleChange}
                autoFocus
                className='UserRegistration_input'
              />
              <h5>
                <label>Last Name</label>
              </h5>
              <input
                name='lastName'
                value={userData.lastName}
                onChange={handleChange}
                className='UserRegistration_input'
              />
              <h5>
                <label>Email</label>
              </h5>
              <input
                name='email'
                onChange={handleChange}
                value={userData.email}
                className='UserRegistration_input'
              />

              <div className='UserRegistration_password-wrapper'>
                <h5>
                  <label>New Password</label>
                </h5>
                <input
                  name='Password'
                  className='UserRegistration_input'
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                />
                <button
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
                    checked={userData.role === 'user'}
                    onChange={handleChange}
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
