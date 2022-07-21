import { useState, useEffect } from 'react'
import axios from 'axios'

import '../components/Card/Card.css'
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

  ///////////////////////////use this when ts is set correctly for reviews.length//////////////////////////
  useEffect(() => {
    let number = 0
    const mapRatings = () => {
      const total = reviews?.reduce(
        (acc: any, r: any) =>
          // ts@ignore
          r.rating + acc,
        number
      )
      // console.log(total, reviews?.length)
      // setTotalStars(Math.round(total / reviews?.length))
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
  const [myTotalStars, setMyTotalStars] = useState(0)
  const [myBusinessReview, getMyBusinessReview] = useState([])

  const { reviews } = props

  useEffect(() => {
    const fetchBusinessReviews = () => {
      Promise.all(
        //@ts-ignore
        reviews?.map((review: any) => axios.get(`api/reviews/${review}`))
        //@ts-ignore
      ).then((data: any) => getMyBusinessReview(data))
    }
    fetchBusinessReviews()
  }, [])

  useEffect(() => {
    let number = 0
    const mapRatings = () => {
      const total = //@ts-ignore
        myBusinessReview.length &&
        //@ts-ignore
        myBusinessReview.reduce(
          (acc: any, r: any) =>
            // ts@ignore
            r.data.review.rating + acc,
          number
        )

      setMyTotalStars(Math.round(total / myBusinessReview.length))
    }
    mapRatings()
  }, [myBusinessReview])

  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(myTotalStars) - 1) {
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
  // console.log(myTotalStars)

  return <div className='Star-container'>{star}</div>
}
