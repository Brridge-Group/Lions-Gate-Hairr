import { Link } from 'react-router-dom'
import './AddReview.css'
import { Book } from '../../components/Book'

interface Props {
  id?: string
  stars: number
  ownerId: string
  name: string
  phone: string
}

export const Review = (props: Props) => {
  const user = JSON.parse(localStorage.getItem('profile') || 'false').result

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
        {user && user._id !== props.ownerId ? (
          <>
            <Link
              to={{ pathname: props.id + '/add-review', state: props.name }}
              className='Btn-Primary review not-owner'>
              Leave a Review
            </Link>
            <Book phone={props.phone} />
          </>
        ) : (
          <Book phone={props.phone} />
        )}
      </div>
    </>
  )
}
