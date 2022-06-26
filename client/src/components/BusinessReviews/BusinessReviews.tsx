import { useState, useEffect } from 'react'
import { StarSmall } from '../../UIElements/Star'
import './BusinessReviews.css'
import axios from 'axios'

interface Props {
  reviews: Array<[]>
}

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
