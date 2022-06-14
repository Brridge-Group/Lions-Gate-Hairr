import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MyBusinessList } from '../../components/MyBusinessList/MyBusinessList'
import './Profile.css'
import axios from 'axios'

interface Profile {
  id: string
}

export const Profile = () => {
  const { role, _id, name, imageProfile, reviews } = JSON.parse(
    localStorage.getItem('profile') || 'false'
  ).result

  const user = JSON.parse(localStorage.getItem('profile') || 'false').result
  const [userReview, getUserReview] = useState([])
  const [loading, setLoading] = useState(true)

  // need to update local storage when add new review

  useEffect(() => {
    const fetchReviews = () => {
      // reviews.forEach(async review => {
      //   console.log(review, 'review')
      //   let userReviews = await axios.get(`api/reviews/${review}`)
      //   console.log(userReviews, 'user reviews in fetch')
      //   // @ts-ignore
      //   getUserReview([...userReview, userReviews.data])
      // })

      Promise.all(
        reviews.map((review: any) => axios.get(`api/reviews/${review}`))
      )
        // .then(data => console.log(data, 'in promise'))
        //   // @ts-ignore
        .then((data: any) => getUserReview(data))
      // )
    }
    fetchReviews()
    setLoading(false)
  }, [])
  console.log(userReview, 'userReview line 39', typeof userReview)

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
            <h1 className='Profile_name'>Hello {name}!</h1>
            <div className='Profile-UserContainer '>
              <img
                src={imageProfile || 'https://imgur.com/LDpwLVZ.jpg'}
                alt={name + '_profilePicture'}
                className='Profile-UserContainer_pic'
              />

              <div className='Profile-UserContainer_reviews'>
                <h4>your reviews</h4>
              </div>
              <div className='user-reviews-placeholder'>
                {/* console.log('userReview line 63', userReview) */}
                {/* {console.log('userReview line 63', userReview)} */}
                {!loading &&
                  userReview.map((r: any) => (
                    // console.log(typeof r, 'r', r.review.comment)
                    <ul>
                      <li className='Profile_reviews' key={r._id}>
                        {r.data.review.comment}
                        {r.data.review.rating}
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
            <div className='Profile_links'>
              <Link to={`users/${_id}`}>
                <h6 className='btn--btn-primary'>update profile</h6>
              </Link>
              <Link to={'/add-business'}>
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
