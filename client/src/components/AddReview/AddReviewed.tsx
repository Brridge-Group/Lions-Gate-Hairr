import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ReviewForm } from './AddReview/AddReviewElements'
import './AddReview.css'

import { StarRating } from './StarRating'

interface RouteParams {
  id: string
}

interface Service {
  _id: string
  name: string
}

interface Feature {
  _id: string
  name: string
}

interface Business {
  name: string
  description: string
  image: string
  address: {
    street: string
    city: string
    region: string
    postalCode: string
  }
  services: Service[]
  features: Feature[]
  stars: number
  phone: string
}

export const AddReview = () => {
  const [businessData, setBusinessData] = useState<Business>()
  const history = useHistory()
  const { id } = useParams<RouteParams>()

  // FETCHES BUSINESS DATA FROM REMOTE DATABSE ONCE AND SETS BUSINESSDATA STATE TO IT.
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await fetch(`/api/businesses/${id}`)
      const businessData = await res.json()
      setBusinessData(businessData)
    }
    getBusinessData()
  }, [])

  const formSubmitHandler = async e => {
    e.preventDefault()
    try {
      // SENDING POST REQUEST WILL BE DONE AFTER WE CAN GET USER ID TO SEND.
      // await axios.post(`/api/businesses/${id}/review`, {
      //   rating: e.target.rating.value,
      //   review: e.target.review.value,
      // });
      // history.push(`/businesses/${id}`);

      // AGAIN, NEED A WAY TO GET USER ID TO CONNECT THE REVIEW WITH ITS AUTHOR.
      console.log({
        userId: null,
        rating: e.target.rating.value,
        review: e.target.review.value,
      })
    } catch (e) {
      console.log('Review submission error occured!', e)
    }
  }

  return (
    <div className='FeatureContainer_image Owner'>
      <div className='FeatureContainer'>
        <h1>Review Business</h1>
        <h2>Review your experience with Andrelio Salon</h2>
        <ReviewForm onSubmit={formSubmitHandler}>
          <StarRating id='star-rating' />
          <label htmlFor='review'>Leave a Review</label>
          <textarea name='review' id='review' rows={10}></textarea>
          <button type='submit'>Submit</button>
        </ReviewForm>
      </div>
    </div>
  )
}
