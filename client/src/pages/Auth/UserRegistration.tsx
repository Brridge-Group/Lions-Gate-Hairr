import { useState } from 'react'
import UserImage from '../../UIElements/UserImage'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {toast} from 'react-toastify';

import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH } from '../../constants/actionTypes'
import * as api from '../../api/index'
import './UserRegistration.css'
import 'react-toastify/dist/ReactToastify.css';

require('dotenv').config()
toast.configure()

export const UserRegistration = () => {
  const [userData, setUserData] = useState({
    role: 'user',
    imageProfile: 'https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png',
  })

  const [isChecked, setIsChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState<any | null>(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')
 

  const signup =
    (formData: any, history: any, errorM?: any) => async (dispatch: any) => {
      let data;
      try {
        // sign up the user
        data = await api.signUp(userData)
        dispatch({ type: AUTH, data })
        history.push('/')
      } catch (err: any) {
        errorM = err.response.data
        toast(errorM)
      }
    }

  const toggleShow = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onImageChange = async(event: any) => {
    if (event.target.files[0]) {
      if(event.target.files[0].type.match('image')){
        setImage(URL.createObjectURL(event.target.files[0]))
      
        let base64 = await new Promise(resolve => {
          let reader = new FileReader();
          reader.onload = (e) => {
              resolve(e.target?.result as any);
          }
          reader.readAsDataURL(event.target.files[0]);
        }) as string;
  
        setUserData({ ...userData, imageProfile: base64 })
      }else{
        toast('Image type error, it should be png/jpeg.');
      }
      }else{
        toast('Unknown.');
      }
  }


  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(signup(userData, history))
  }

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  
  return (
    <>
      <div className='FeatureContainer_image UserRegistration'>
        <div className='FeatureContainer'>
          <div className='UserRegistration_inputGroup'>
            <form className='UserRegistration_form' onSubmit={handleSubmit}>
              
              <UserImage pic={image} name={'Sergio'} handleChange = {onImageChange}/>
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
              <Input
                name='password'
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className='UserRegistration_input'
                endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                          onClick={toggleShow}
                          onMouseDown={handleMouseDownPassword}
                        >{showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
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
                type={showPassword ? "text" : "password"} 
                onChange={handleChange} 
              />
              <div className='UserRegistration_radioButtons'>
                <h5 className='UserRegistration_radio'>
                  <input 
                    type='radio'
                    name='role' 
                    value='user' 
                    onChange={handleChange}
                    checked={userData.role === "user"}
                  /> 
                  User
                </h5>
                <h5 className='UserRegistration_radio'>
                  <input 
                    type='radio'
                    name='role' 
                    value='owner'
                    onChange={handleChange}
                    checked={userData.role === "owner"}
                      /> Owner
                </h5>
              </div>
              <button type='submit' className='UserRegistration_submit'>
                <h6 className='btn--btn-primary'>Sign Up</h6>
              </button>
              <p>
                  Have an account? <NavLink to="user-signin" style={{ color: "blue" }}>Click Here</NavLink> to
                  Login.
                </p>
              <br />
                {errorMsg && <p style={{ color: "red" }}> {errorMsg} </p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
