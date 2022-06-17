// Custom Styles
import './CardDetails.css'

// Custom Imports
import { Star } from '../../UIElements/Star'

// Types
interface Business {
  businessName: string
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

export const CardDetails = (business: Business) => {
  return (
    <section className='CardDetails-Container'>
      <figure className='CardDetails-FigureContainer'>
        {/* <img className='CardDetails-Image' src={business.image} alt='Business Image' /> */}
        <img
          className='CardDetails-Image'
          src={
            business.image == ''
              ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
              : business.image
          }
          alt='Business Image'
        />
        <Star stars={business.stars} />
      </figure>
      <div className='CardDetails-Info'>
        <h2 className='CardDetails-Name'>{business.businessName}</h2>
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
