import { Link } from 'react-router-dom'
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
              <div className='Profile-Container_user-container_reviews'>
                <h4>your reviews</h4>
              </div>
              <div className='user-reviews-placeholder'>
                reviews scroll here
              </div>
            </div>
            <div className='Profile-Container_user-container_links'>
              <Link to={'#'}>
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
    </>
  )
}

export default Profile
