import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import './AddReview.css'

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
  businessName: string
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

// ts? BusinessDetails, author

interface AddReview {
  comment: string
  rating: number
  business: any
  author: any
}
export const AddReview = () => {
  // const [businessData, setBusinessData] = useState({})
  const [businessData, setBusinessData] = useState<Business>()

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviewForm, setReviewForm] = useState({ comment: '' })
  const history = useHistory()
  const { id } = useParams<RouteParams>()

  const { comment } = reviewForm

  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result
  console.log(user, user._id, 'user in add review')

  // FETCHES BUSINESS DATA FROM REMOTE DATABSE ONCE AND SETS BUSINESSDATA STATE TO IT.
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await fetch(`/api/businesses/get-business-by-id/${id}`)
      const businessData = await res.json()
      setBusinessData(businessData)
    }
    getBusinessData()
  }, [])
  console.log(businessData, id, typeof businessData, 'businessData, id')
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
  const handleChange = e => {
    e.preventDefault()
    console.log('e.target', e.target.value)
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }
  // const saveNewReview = async () => {
  //   let newReview = {
  //     ...reviewForm,
  //     author: props.user._id,
  //     business: business._id,
  //     rating: rating,
  //   }
  // }
  return (
    <div className='FeatureContainer_image Review'>
      <div className='FeatureContainer'>
        <div className='AddReview-container'>
          <h2>Review your experience with Andrelio Salon</h2>
          {/* <ReviewForm onSubmit={formSubmitHandler}>
          <StarRating id='star-rating' />
          <textarea name='review' id='review' rows={10}></textarea>
          <button type='submit' className='btn--btn-primary'>
            Submit
          </button>
        </ReviewForm> */}
          <form className='form' onSubmit={formSubmitHandler}>
            <div className='form-group star-rating'>
              {[...Array(5)].map((star, index) => {
                index += 1
                return (
                  <button
                    type='button'
                    key={index}
                    className={
                      index <= (hover || rating)
                        ? 'btn-review on'
                        : 'btn-review off'
                    }
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}>
                    <span className='star'>&#9733;</span>
                  </button>
                )
              })}
            </div>
            <div className='form-group'>
              <label htmlFor='comment'></label>
              <textarea
                name='comment'
                // type='text'
                className='form-control text-area'
                onChange={handleChange}
                value={comment}
              />
            </div>
            <button
              // onChange={handleChange}
              type='submit'
              className='btn--btn-primary add-review'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
