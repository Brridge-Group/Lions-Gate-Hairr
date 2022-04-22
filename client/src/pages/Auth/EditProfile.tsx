import { useState } from 'react'
import UserImage from '../../UIElements/UserImage'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { UPDATE } from '../../constants/actionTypes'
import * as api from '../../api/index'
import './UserRegistration.css'
import '../Profile/Profile.css'
import 'react-toastify/dist/ReactToastify.css'
<<<<<<< Updated upstream

toast.configure()

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
=======
toast.configure()

export const EditProfile = () => {

  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result;
  
  const dispatch = useDispatch();
  const history = useHistory();
>>>>>>> Stashed changes

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')
  const [userData, setUserData] = useState({
    firstName: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1],
    email: user.email,
    role: user.role,
    imageProfile: user.imageProfile,
    password: "",
    confirmPassword: "",
  })
 
  const updateUser =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      try {
        // update the user
<<<<<<< Updated upstream
        const { data } = await api.updateUser(userData, user._id)
=======
        const { data } = await api.updateUser(userData, user._id);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      toast('Unknown error , try again.')
=======
      toast('Unknown error, try again')
>>>>>>> Stashed changes
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(updateUser(userData, history))
  }

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
<<<<<<< Updated upstream
    console.log(userData)
  }
=======
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
>>>>>>> Stashed changes

  return (
    <>
      <div className='FeatureContainer_image EditUser'>
        <div className='FeatureContainer'>
          <div className='UserRegistration_inputGroup'>
            <form className='UserRegistration_form' onSubmit={handleSubmit}>
<<<<<<< Updated upstream
              <UserImage
                pic={userData.imageProfile}
                name={'Sergio'}
=======
              {<UserImage
                pic={userData.imageProfile}
                name={user.name+'_pictureProfile'}
>>>>>>> Stashed changes
                handleChange={onImageChange}
              /> }
              <h5>
                <label>First Name</label>
              </h5>
             <input
                name='firstName'
<<<<<<< Updated upstream
                value={userData.firstName}
=======
>>>>>>> Stashed changes
                onChange={handleChange}
                autoFocus
                value={userData && userData.firstName}
                className='UserRegistration_input'
              />
              <h5>
                <label>Last Name</label>
              </h5>
              <input
                name='lastName'
<<<<<<< Updated upstream
                value={userData.lastName}
=======
                value={userData && userData.lastName}
>>>>>>> Stashed changes
                onChange={handleChange}
                className='UserRegistration_input'
              />
              <h5>
                <label>Email</label>
              </h5>
              <input
                name='email'
                onChange={handleChange}
<<<<<<< Updated upstream
                value={userData.email}
=======
                value={userData &&  userData.email} 
>>>>>>> Stashed changes
                className='UserRegistration_input'
              />
              <h5>
                <label>New Password</label>
              </h5>
              <Input
                name='password'
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
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
