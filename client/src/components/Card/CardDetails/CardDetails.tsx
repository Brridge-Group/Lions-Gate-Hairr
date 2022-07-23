//* Custom Styles
import './CardDetails.css'

//* Types
interface Business {
  businessName: string
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
      <figure className='CardDetails-ImageContainer'>
        <img
          src={business.image}
          className='CardDetails-Image'
          alt='Hair salon.'
        />
      </figure>
      <div className='CardDetails-InfoContainer'>
        <h2>{business.businessName}</h2>
        <h3>{business?.description}</h3>
        <p>
          {business.address?.address1}
          <br />
          {business.address?.address2}
          {business.address?.city}, {business.address?.region}
          <br />
          {business.address?.postalCode}
        </p>
      </div>
    </section>
  )
}
