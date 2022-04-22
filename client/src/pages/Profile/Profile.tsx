import { Link } from 'react-router-dom'
import { Image } from '@chakra-ui/react'
import { MyBusinessList } from '../../components/MyBusinessList/MyBusinessList'
import './Profile.css'

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result

<<<<<<< Updated upstream
  console.log('User on Profile page line 8: ', user)
=======
>>>>>>> Stashed changes
  return (
    <div
      className={
        user.role === 'user'
          ? 'FeatureContainer_image User'
          : 'FeatureContainer_image Owner'
      }>
      <div className='FeatureContainer'>
        {user && user.role === 'user' ? (
          <div className='Profile_user'>
            <h1 className='Profile_name'>Hello {user.name} !</h1>
            <div className='Profile-UserContainer '>
              <div className='' style={{ fontSize: '15px' }}>
<<<<<<< Updated upstream
                <img src={user.imageProfile} className='user-pix-placeholder' />
=======
              <Image
                src={user.imageProfile || 'https://imgur.com/LDpwLVZ.jpg'}
                alt={user.name+'_profilePicture'}
                boxSize='125px'
                borderRadius='25rem'
                fallbackSrc='https://imgur.com/LDpwLVZ.jpg'
    />
                {/* <img
                  src={user.imageProfile}
                  className='user-pix-placeholder'
                /> */}
>>>>>>> Stashed changes
              </div>
              <div className='Profile-UserContainer_reviews'>
                {/* when reviews are imported here, add loading, setLoading state as in mybusiness component */}
                <h4>your reviews</h4>
              </div>
              <div className='user-reviews-placeholder'>
                reviews scroll here
              </div>
            </div>
            <div className='Profile_links'>
<<<<<<< Updated upstream
              <Link to={`users/${user._id}`}>
=======
              <Link to={'users/'+ user._id}>
>>>>>>> Stashed changes
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
