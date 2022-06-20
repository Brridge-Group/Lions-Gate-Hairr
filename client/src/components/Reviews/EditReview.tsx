import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Star } from '../../UIElements/Star'
import './AddReview.css'

interface RouteParams {
  id: string
}

interface EditReview {
  comment: string
  rating: number
}
export const EditReview = () => {
  const history = useHistory()

  const [hover, setHover] = useState(0)
  const [reviewData, setReviewData] = useState<any>({})
  const { id } = useParams<RouteParams>()

  useEffect(() => {
    const getReview = async () => {
      const res = await fetch(`/api/reviews/${id}`)
      const reviewData = await res.json()
      setReviewData(reviewData.review)
    }
    getReview()
  }, [])

  console.log(
    'in edit review, reviewData',
    reviewData,
    reviewData.comment,
    reviewData.rating
  )

  const [rating, setRating] = useState(reviewData.rating)
  const [reviewForm, setReviewForm] = useState({
    comment: reviewData.comment,
    // rating: reviewData.rating,
  })

  const { comment } = reviewForm

  const handleChange = (e: any) => {
    e.preventDefault()
    console.log('e.target in handle change', e.target.value)
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }
  const saveUpdatedReview = async () => {
    let newReview = {
      ...reviewForm,
      rating: rating,
    }

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newReview }),
    }

    try {
      const response = await fetch(`/api/reviews/${id}`, requestOptions)
      if (!response.ok) {
        throw new Error('New review not saved! Please resubmit.')
      }
      await response.json()
      alert('Review successful.')
    } catch (error) {
      console.error('Review not created.')
    }
  }

  const updateReview = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    try {
      saveUpdatedReview()
      history.push('/')
    } catch (err) {}
  }

  return (
    <div className='FeatureContainer_image Review'>
      <div className='FeatureContainer'>
        <div className='AddReview-container'>
          <h2>
            Update your Review with businessData.businessName will read as
            undefined
          </h2>
          <form className='form' onSubmit={updateReview}>
            <div className='form-group star-rating'>
              {[...Array(5)].map((star, index) => {
                index += 1
                return (
                  <button
                    type='button'
                    key={index}
                    className={
                      index <= (hover || reviewData.rating)
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
                className='form-control text-area'
                onChange={handleChange}
                value={reviewData.comment}
              />
            </div>
            <button type='submit' className='btn--btn-primary add-review'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
