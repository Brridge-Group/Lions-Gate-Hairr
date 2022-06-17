import { Link } from 'react-router-dom'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
interface Props {
  id?: string
  stars: number
}

const isLoggedIn: boolean = true

export const Review = (props: Props) => {
  const stars: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return (
        <AiFillStar
          key={i}
          style={{ fontSize: '2rem', color: 'rgba(0,0,0,0.7)' }}
        />
      )
    } else {
      return (
        <AiOutlineStar
          key={i}
          style={{ fontSize: '2rem', color: 'rgba(0,0,0,0.5)' }}
        />
      )
    }
  })

  return (
    <>
      <div className='Review-container'>
        <div className='Star-container'>{stars}</div>
        {isLoggedIn ? (
          <Link
            to={props.id + '/add-review'}
            className='btn--btn-primary review'>
            Leave a Review
          </Link>
        ) : null}
      </div>
    </>
  )
}
