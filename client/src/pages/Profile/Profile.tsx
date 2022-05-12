import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Image } from '@chakra-ui/react'
import { MyBusinessList } from '../../components/MyBusinessList/MyBusinessList'
import './Profile.css'

export const Profile = () => {
  const {role, _id, name, imageProfile} = JSON.parse(localStorage.getItem('profile') || '{}').data.result; 

  return (
   <div
      className={
        role === 'user'
          ? 'FeatureContainer_image User'
          : 'FeatureContainer_image Owner'
      }>
      <div className='FeatureContainer'>
        {role && role === 'user' ? (
          <div className='Profile_user'>
            <h1 className='Profile_name'>Hello {name} !</h1>
            <div className='Profile-UserContainer '>
              <div className='' style={{ fontSize: '15px' }}>
              <Image
                src={imageProfile || 'https://imgur.com/LDpwLVZ.jpg'}
                alt={name+'_profilePicture'}
                boxSize='125px'
                borderRadius='25rem'
                fallbackSrc='https://imgur.com/LDpwLVZ.jpg'
              />
              </div>
              <div className='Profile-UserContainer_reviews'>
                <h4>your reviews</h4>
              </div>
              <div className='user-reviews-placeholder'>
                reviews scroll here
              </div>
            </div>
            <div className='Profile_links'>
              <Link to={`users/${_id}`}>
                <h6 className='btn--btn-primary'>update profile</h6>
              </Link>
              <Link to={'#'}>
                {' '}
                <h6 className='btn--btn-primary twoLines'>become an owner</h6>
              </Link>
            </div>
          </div>
        ) : (
          <MyBusinessList />
        )}
      </div>
    </div>
  )
}
