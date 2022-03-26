import { Result } from 'express-validator'
import { useState } from 'react'
import hairgreysm from '../../assets/images/hairgreysm.jpg'
import MyBusinessList from '../../components/Businesses/MyBusinessList'
import './Profile.css'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result

  console.log(user.role)
  return (
    <>
      <div
        className='Profile-Container'
        style={{
          backgroundImage: `url(${hairgreysm})`,
        }}>
        {user.role === 'user' ? (
          <div className='Profile-Container_user'>
            <h1 className='Profile-Container_name'>Hello {user.name} !</h1>
            <div className='Profile-Container_user-container'>
              <div
                className='user-pix-placeholder'
                style={{ fontSize: '15px' }}>
                user foto
              </div>
            </div>
          </div>
        ) : (
          <MyBusinessList />
        )}
      </div>
    </>
  )
}

export default Profile
