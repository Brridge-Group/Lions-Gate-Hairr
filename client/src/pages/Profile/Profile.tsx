import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MyBusinessList } from '../../components/MyBusinessList/MyBusinessList'
import { StarSmall } from '../../UIElements/Star'
import { LoadSpinner } from '../../components/LoadSpinner/LoadSpinner'
import './Profile.css'
import axios from 'axios'

interface Profile {
  id: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  author: string
  business: string
}

export const Profile = () => {
  const history = useHistory()
  const { role, _id, name, imageProfile, reviews } = JSON.parse(
    localStorage.getItem('profile') || 'false'
  ).result

  const token = JSON.parse(localStorage.getItem('profile') || 'false').token

  const [userReview, getUserReview] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = () => {
      Promise.all(
        reviews.map((review: any) => axios.get(`api/reviews/${review}`))
      ).then((data: any) => getUserReview(data))
    }
    fetchReviews()
    setLoading(false)
  }, [])

  const deleteReview = async (id: any) => {
    try {
      axios
        .delete(`api/reviews/${id}`, { data: { profileId: _id } })
        .then(res => {
          window.localStorage.removeItem('profile')
          const { result } = res.data
          let userModified = {
            result,
            token,
          }
          window.localStorage.setItem('profile', JSON.stringify(userModified))
        })
      history.push('/')
      alert('Deleted review.')
    } catch (error) {
      console.log('error in delete review')
    }
  }

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
                {loading ? (
                  <LoadSpinner />
                ) : !userReview.length ? (
                  'add some reviews'
                ) : (
                  <ul className='Profile_User_reviews'>
                    {!loading &&
                      userReview.map((r: any) => (
                        <li key={r._id} className='Profile_reviews'>
                          <div className='column-left'>
                            <img src={r.data.review.business.image} alt='' />
                            <div className='review-btns'>
                              <Link
                                to={{
                                  pathname: `/reviews/${r.data.review._id}/edit-review`,
                                  state: r.data.review,
                                }}>
                                {' '}
                                <h6 className='btn--btn-primary reviews'>
                                  edit
                                </h6>
                              </Link>

                              <button
                                className='btn--btn-primary reviews delete'
                                onClick={() => deleteReview(r.data.review._id)}>
                                delete
                              </button>
                            </div>
                          </div>
                          <div className='column-right'>
                            <Link
                              to={`/businesses/${r.data.review.business._id}`}>
                              <h2>{r.data.review.business.businessName}</h2>
                              <h5>{r.data.review.business.address.city}</h5>
                              <StarSmall stars={r.data.review.rating} />
                              <h5>{r.data.review.comment}</h5>
                            </Link>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
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
