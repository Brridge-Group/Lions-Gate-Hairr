import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import './Card.css'
interface Props {
  stars: number
}

export const Star = (props: Props) => {
  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return <AiOutlineStar key={i} style={{ fontSize: '2rem' }} />
    } else {
      return <AiFillStar key={i} style={{ fontSize: '2rem' }} />
    }
  })

  return <div className='Star-container'>{star}</div>
}
