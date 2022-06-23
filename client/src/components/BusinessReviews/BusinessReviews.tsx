import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { StarSmall } from '../../UIElements/Star'
import './BusinessReviews.css'

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

  // useEffect(() => {
  //   const fetchBusinessReviews = () => {
  //     Promise.all(
  //       reviews.map((review: any) => axios.get(`api/reviews/${review}`))
  //     ).then(data => console.log(data, 'in promise, business reviews'))
  //     // @ts-ignore
  //     // .then((data: any) => getBusinessReview(data))
  //   }
  //   fetchBusinessReviews()
  //   setLoading(false)
  // }, [reviews])

  // console.log(businessReview, 'businessReview')
  console.log(reviews, 'reviews, in business reviews')
  return (
    <ul className='BusinessReviews_container'>
      {reviews.map((r: any) => (
        <>
          <li key={r._id} className='Business_reviews'>
            <div className='Business_column-left '>
              <div className='person-circle'>person foto</div>
            </div>
            <div className='Business_column-right'>
              {/* <Link to={`/businesses/${r.data.review.business._id}`}> */}
              person name
              <h6 className='person-city'>person city, state</h6>
              <StarSmall stars={r.rating} />
              <h6>{r.comment}</h6>
              {/* </Link> */}
            </div>
          </li>
        </>
      ))}
    </ul>
  )
}
