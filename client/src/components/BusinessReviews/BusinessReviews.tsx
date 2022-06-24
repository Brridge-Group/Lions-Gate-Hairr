import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { StarSmall } from '../../UIElements/Star'
import './BusinessReviews.css'
import axios from 'axios'

interface Props {
  reviews: Array<[]>
}

// const location = useLocation<any>()
// ownerId: string

// import { LoadSpinner } from '../LoadSpinner/LoadSpinner'
// import { StarSmall } from '../../UIElements/Star'
// import { useLocation } from 'react-router-dom'

// interface Business {
//   businessName: string
//   description: string
//   image: string
//   address: {
//     address1: string
//     address2: string
//     city: string
//     region: string
//     postalCode: string
//   }
//   reviews: []
// }
interface User {
  name: string
  imageProfile: string
}

interface BusinessReviews {
  _id: string
  comment: string
  rating: number
  author: string
}

export const BusinessReviews = (props: Props) => {
  const [loading, setLoading] = useState(true)
  const [businessReview, getBusinessReview] = useState([])
  console.log(
    props,
    props.reviews,
    'props.reviews, in business reviews',
    props.reviews
  )

  const { reviews } = props

  useEffect(() => {
    const fetchBusinessReviews = () => {
      Promise.all(
        reviews.map((review: any) => axios.get(`api/reviews/${review}`))
      ).then((data: any) => getBusinessReview(data))
    }
    fetchBusinessReviews()
    setLoading(false)
  }, [])

  console.log(businessReview, 'businessReview')
  // console.log(reviews, 'reviews, in business reviews')
  return (
    <ul className='BusinessReviews_container'>
      {!loading && !businessReview ? (
        <h6 className='BusinessReviews_container-noReviews'>
          sorry, no reviews
        </h6>
      ) : (
        businessReview.map((r: any) => (
          <li key={r.data.review._id} className='Business_reviews'>
            <div className='Business_column-left '>
              <img
                src={r.data.review.author.imageProfile}
                className='person-circle'
              />
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
