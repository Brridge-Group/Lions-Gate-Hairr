import { Link } from 'react-router-dom'
import './AddReview.css'
interface Props {
  id?: string
  stars: number
  ownerId: string
  name: string
}

const isLoggedIn: boolean = true

export const Review = (props: Props) => {
  const user = JSON.parse(localStorage.getItem('profile') || 'false').result
  console.log(
    'in review, id, ownerId, props, user',
    props.id,
    props.ownerId,
    props,
    user
  )
  const stars: JSX.Element[] = [...Array(5)].map((star, i) => {
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

  return (
    <>
      <div className='Review-container'>
        <div className='Star-container'>{stars}</div>
        {isLoggedIn ? (
          <Link
            to={{ pathname: props.id + '/add-review', state: props.name }}
            className='btn--btn-primary review'>
            Leave a Review
          </Link>
        ) : null}
      </div>
    </>
  )
}
