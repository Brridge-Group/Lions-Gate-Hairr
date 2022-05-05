// Custom Styles
import './CardDetails.css'

// Custom Imports
import { Star } from '../../UIElements/Star'

// Types
interface Props {
  name: string
  description: string
  image: string
  stars: number
  address: {
    address1: string
    city: string
    region: string
    postalCode: string
  }
}

const CardDetails = (props: Props) => {
  return (
    <section className='CardDetails-Container'>
      <figure className='CardDetails-FigureContainer'>
        <img className='CardDetails-Image' src={props.image} alt='Business Image' />
        <Star stars={props.stars} />
      </figure>
      <div className='CardDetails-Info'>
        <h2 className='CardDetails-Name'>{props.name}</h2>
        <p className='CardDetails-Description'>{props.description}</p>
        <div className='CardDetails-Address'>
          <p>{props.address.address1}</p>
          <p>
            {props.address.city}, {props.address.region}
          </p>
          <p>{props.address.postalCode}</p>
        </div>
      </div>
    </section>
  )
}

export default CardDetails
