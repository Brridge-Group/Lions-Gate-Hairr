import { useState, useEffect } from 'react'
import { StarSmall } from '../../UIElements/Star'
import './BusinessReviews.css'
import axios from 'axios'

interface Props {
  reviews: Array<[]>
}

export const MyBusinessReviews = (props: Props) => {
  const [loading, setLoading] = useState(true)
  const [myBusinessReview, getMyBusinessReview] = useState([])

  const { reviews } = props

  useEffect(() => {
    const fetchBusinessReviews = () => {
      Promise.all(
        reviews.map((review: any) => axios.get(`api/reviews/${review}`))
      ).then((data: any) => getMyBusinessReview(data))
    }
    fetchBusinessReviews()
    setLoading(false)
  }, [])

  // console.log(myBusinessReview, 'mybusinessReview', reviews, 'reviews')
  return (
    <ul className='BusinessReviews_container'>
      {!loading && !myBusinessReview.length ? (
        <h6 className='BusinessReviews_container-noReviews'>no reviews yet</h6>
      ) : (
        myBusinessReview.map((r: any) => (
          <li key={r.data.review._id} className='Business_reviews'>
            <div className='Business_column-left '>
              <div className='img-wrapper'>
                <img
                  src={r.data.review.author.imageProfile}
                  className='person-circle'
                />
              </div>
            </div>
            <div className='Business_column-right'>
              {r.data.review.author.name}
              <h6 className='person-city'>do we want city, state</h6>
              <StarSmall stars={r.data.review.rating} />
              <h6>{r.data.review.comment}</h6>
            </div>
          </li>
        ))
      )}
    </ul>
  )
}
