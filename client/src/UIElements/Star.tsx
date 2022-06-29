import { useState, useEffect } from 'react'
import axios from 'axios'

import './Card.css'
interface Props {
  stars: number
  reviews?: []
}

export const Star = (props: Props) => {
  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return (
        <div className='star btn-review on' key={i}>
          &#9733;
        </div>
      )
    } else {
      return (
        <div className='star btn-review off' key={i}>
          &#9733;
        </div>
      )
    }
  })

  return <div className='Star-container'>{star}</div>
}

export const StarSmall = (props: Props) => {
  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return (
        <div className='star_small btn-review_small on' key={i}>
          &#9733;
        </div>
      )
    } else {
      return (
        <div className='star_small btn-review_small off ' key={i}>
          &#9733;
        </div>
      )
    }
  })

  return <div className='Star-container_small'>{star}</div>
}

export const StarList = (props: Props) => {
  const [totalStars, setTotalStars] = useState(0)

  const { reviews } = props

  useEffect(() => {
    let number = 0
    const mapRatings = () => {
      reviews?.map(
        (r: any, idx: any) => (number = number + r.rating / reviews?.length)
      )
      setTotalStars(Math.round(number))
    }
    mapRatings()
  }, [reviews])

  // console.log('in star, props', props, totalStars)
  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(totalStars) - 1) {
      return (
        <div className='star btn-review on' key={i}>
          &#9733;
        </div>
      )
    } else {
      return (
        <div className='star btn-review off' key={i}>
          &#9733;
        </div>
      )
    }
  })

  return <div className='Star-container'>{star}</div>
}

export const MyStarList = (props: Props) => {
  const [totalStars, setTotalStars] = useState(0)
  const [myBusinessReview, getMyBusinessReview] = useState([])

  const { reviews } = props

  useEffect(() => {
    const fetchBusinessReviews = () => {
      Promise.all(
        //@ts-ignore
        reviews?.map((review: any) => axios.get(`api/reviews/${review}`))
        //@ts-ignore
      ).then((data: any) => getMyBusinessReview(data))
      // ).then((data: any) => console.log(data, 'data'))
    }
    fetchBusinessReviews()
  }, [])

  console.log(myBusinessReview, 'myBusinessReview')
  useEffect(() => {
    let number = 0
    console.log(myBusinessReview, 'myBusinessReview in useefffect')
    const mapRatings = () => {
      //@ts-ignore
      myBusinessReview.length &&
        //@ts-ignore
        myBusinessReview.map(
          (r: any, idx: any) =>
            (number = number + r.data.review.rating / myBusinessReview.length)
        )
      setTotalStars(Math.round(number))
    }
    mapRatings()
  }, [myBusinessReview])

  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(totalStars) - 1) {
      return (
        <div className='star btn-review on' key={i}>
          &#9733;
        </div>
      )
    } else {
      return (
        <div className='star btn-review off' key={i}>
          &#9733;
        </div>
      )
    }
  })

  return <div className='Star-container'>{star}</div>
}
