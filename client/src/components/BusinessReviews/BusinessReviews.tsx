import { StarSmall } from '../../UIElements/Star'
import './BusinessReviews.css'

interface Props {
  reviews: Array<[]>
}

export const BusinessReviews = (props: Props) => {
  // console.log(props, props.reviews, 'props.reviews, in business reviews')
  const { reviews } = props

  return (
    <ul className='BusinessReviews_container'>
      {reviews.map((r: any) => (
        <li key={r._id} className='Business_reviews author'>
          <div className='Business_column-left '>
            <div className='img-wrapper'>
              <img src={r.image} className='person-circle' />
            </div>
          </div>
          <div className='Business_column-right '>
            {r.name === undefined ? 'person name' : r.name}
            <h6 className='person-city'>do we want city, state</h6>
            <StarSmall stars={r.rating} />
            <h6>{r.comment}</h6>
          </div>
        </li>
      ))}
    </ul>
  )
}
