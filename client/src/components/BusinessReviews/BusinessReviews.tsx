import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { StarSmall } from '../../UIElements/Star'
import './BusinessReviews.css'
import axios from 'axios'

interface Props {
  reviews: Array<[]>

  // const id = (state as any)?.id;
}
// const (_id: any)?._id
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

  //ts@ignore

  // useEffect(() => {
  //   const fetchBusinessReviews = () => {
  //     Promise.all(
  //       reviews.map((review: any) => axios.get(`api/reviews/${review._id}`))
  //       // ).then((data: any) => getBusinessReview(data))
  //     ).then((data: any) =>
  //       console.log(data, 'in fetch bus reviews promise, data')
  //     )
  //   }
  //   fetchBusinessReviews()
  //   setLoading(false)
  // }, [])

  // console.log(reviews, 'reviews, in business reviews')
  return (
    <ul className='BusinessReviews_container'>
      {reviews.map((r: any) => (
        <li key={r._id} className='Business_reviews author'>
          <div className='Business_column-left '>
            <div className='person-circle no-author'></div>
            {/* <img
              src={r.data.review.author.imageProfile}
              className='person-circle'
            /> */}
          </div>
          <div className='Business_column-right '>
            person name
            {/* {r.data.review.author.name} */}
            <h6 className='person-city'>do we want city, state</h6>
            <StarSmall stars={r.rating} />
            <h6>{r.comment}</h6>
          </div>
        </li>
      ))}
    </ul>
  )
}
