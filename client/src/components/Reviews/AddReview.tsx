import { useEffect, useState } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'

import './AddReview.css'

interface RouteParams {
  id: string
}

interface AddReview {
  comment: string
  rating: number
  business: any
  author: any
}
export const AddReview = () => {
  const history = useHistory()
  const location = useLocation<any>()
  const busName = location.state

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [reviewForm, setReviewForm] = useState({ comment: '' })
  const { id } = useParams<RouteParams>()

  const { comment } = reviewForm

  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result

  const handleChange = e => {
    e.preventDefault()
    console.log('e.target', e.target.value)
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value })
  }
  const saveNewReview = async () => {
    let newReview = {
      ...reviewForm,
      author: user._id,
      business: id,
      rating: rating,
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newReview }),
    }

    try {
      const response = await fetch('/api/reviews', requestOptions)
      if (!response.ok) {
        throw new Error('New review not saved! Please resubmit.')
      }
      await response.json()
      alert('Review successful.')
    } catch (error) {
      console.error('Review not created.')
    }
  }

  const submitReview = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    try {
      saveNewReview()
      history.push('/')
    } catch (err) {}
  }

  return (
    <div className='FeatureContainer_image Review'>
      <div className='FeatureContainer'>
        <div className='AddReview-container'>
          <h2>
            Review your experience with{' '}
            <span className='AddReview-name'>{busName}</span>
          </h2>
          <form className='form' onSubmit={submitReview}>
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
                className='form-control text-area'
                onChange={handleChange}
                value={comment}
              />
            </div>
            <button
              onChange={handleChange}
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
