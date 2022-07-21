//* React Components
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

//* Custom Imports
import { CardDetails } from '../../components/Card/CardDetails/CardDetails'
import { Book } from '../../components/Book'
import { Review } from '../../components/Reviews/Review'
import { BusinessReviews } from '../../components/BusinessReviews/BusinessReviews'
import { LoadSpinner } from '../../components/LoadSpinner/LoadSpinner'

//* Custom Styles
import './BusinessDetails.css'

//* Types
interface BusinessReviews {
  reviews: Array<[]>
}

interface RouteParams {
  id: string
}

interface Service {
  _id: string
  name: string
}

interface Feature {
  _id: string
  name: string
}

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
  services: Service[]
  features: Feature[]
  reviews: Array<[]>
  stars: number
  phone: string
  ownerId: string
}

export const BusinessDetails = () => {
  const [business, setBusiness] = useState<Business>()
  const [totalStars, setTotalStars] = useState(0)

  const { id } = useParams<RouteParams>()

  // FETCHES BUSINESS DATA FROM REMOTE DATABASE ONCE AND SETS `BUSINESSDATA` STATE TO IT.
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await fetch(`/api/businesses/get-business-by-id/${id}`)
      const businessData = await res.json()
      setBusiness(businessData)
    }
    getBusinessData()
  }, [])

  useEffect(() => {
    let number = 0
    const mapRatings = () => {
      business?.reviews.map((r: any, idx: any) => (number = number + r.rating / business?.reviews.length))
      setTotalStars(Math.round(number))
    }
    mapRatings()
  }, [business])

  ///////////////////////////use this when ts is set correctly for business.reviews.length//////////////////////////
  useEffect(() => {
    let number = 0
    const mapRatings = () => {
      const total = business?.reviews.reduce(
        (acc: any, r: any) =>
          // ts@ignore
          r.rating + acc,
        number
      )

      // console.log('newNumber', total, business?.reviews.length)
      // setTotalStars(Math.round(total/business?.reviews.length)
    }
    mapRatings()
  }, [business])

  // if (p1.address && typeof p1.address.country === 'string')
  // CHECKS IF THE `BUSINESSDATA` STATE HAS VALUE. RENDERS THE BUSINESS PAGE IF IT DOES AND SETS A LOADING SCREEN IF IT DOESN'T.
  // THE FIRST RENDER WON'T HAVE DATA, SINCE USEEFFECT, WHICH GIVES THE STATE IT'S VALUE, RUNS AFTER THE FIRST RENDER.

  // console.log('totalStars', totalStars)
  return (
    <div className='FeatureContainer_image Home'>
      <main className='BusinessContainer'>
        {business ? (
          <>
            <aside className='BusinessDetails-leftColumn'>
              <h4 className='AsideSidebar-Header'>
                <label htmlFor='features'>Features</label>
              </h4>
              <ul className='BusinessDetails-ul'>
                {business.features.map(feature => (
                  <h5 className='features' key={feature._id}>
                    <li>{feature.name}</li>
                  </h5>
                ))}
              </ul>
              <h4 className='AsideSidebar-Header'>
                <label htmlFor='features'>Services</label>
              </h4>
              <ul className='BusinessDetails-ul'>
                {business.services.map(service => (
                  <h5 className='services' key={service._id}>
                    <li>{service.name}</li>
                  </h5>
                ))}
              </ul>
            </aside>
            <section className='BusinessDetails-rightColumn'>
              <CardDetails businessName={business.businessName} description={business.description} image={business.image} address={business.address} />
              <div className='BusinessDetails-buttons'>
                <Review id={id} stars={totalStars} ownerId={business.ownerId} name={business.businessName} />
                <Book phone={business.phone} />
              </div>
              <div className='BusinessDetails_reviews'>
                <h4>reviews</h4>
                <BusinessReviews reviews={business.reviews} />
              </div>
            </section>
          </>
        ) : (
          <LoadSpinner />
        )}
      </main>
    </div>
  )
}
