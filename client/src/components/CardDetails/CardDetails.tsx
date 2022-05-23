// Custom Styles
import './CardDetails.css'

// Custom Imports
import { Star } from '../../UIElements/Star'

// Types
interface Business {
  name: string
  description: string
  image: string
  stars: number
  address: {
    address1: string
    address2: string
    city: string
    region: string
    postalCode: string
  }
}

interface Business {
  name: string
  description: string
  image: string
  address: {
    address1: string
    address2: string
    city: string
    region: string
    postalCode: string
  }
}

export const CardDetails = (business: Business) => {
  return (
    <section className='CardDetails-Container'>
      <figure className='CardDetails-FigureContainer'>
        <img
          className='CardDetails-Image'
          src={business.image}
          alt='Business Image'
        />
        <Star stars={business.stars} />
      </figure>
      <div className='CardDetails-Info'>
        <h2 className='CardDetails-Name'>{business.name}</h2>
        <p className='CardDetails-Description'>{business.description}</p>
        <div className='CardDetails-Address'>
          <p>{business.address?.address1}</p>
          <p>{business.address?.address2}</p>
          <p>
            {business.address?.city}, {business.address?.region}
          </p>
          <p>{business.address?.postalCode}</p>
        </div>
      </div>
    </section>
  )
}

// export default CardDetails
