import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { About } from './About/About'
import { Book } from './Book'
import { Review } from '../Reviews/Review'
import './BusinessDetails.css'
import { BusinessReviews } from '../BusinessReviews/BusinessReviews'
import { LoadSpinner } from '../LoadSpinner/LoadSpinner'

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

  // FETCHES BUSINESS DATA FROM REMOTE DATABSE ONCE AND SETS BUSINESSDATA STATE TO IT.
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await fetch(`/api/businesses/get-business-by-id/${id}`)
      const businessData = await res.json()
      setBusiness(businessData)
    }
    getBusinessData()
  }, [])

  // console.log(business, 'business, business details')

  useEffect(() => {
    let number = 0
    const mapRatings = () => {
      business?.reviews.map(
        (r: any, idx: any) =>
          (number = number + r.rating / business?.reviews.length)
      )
      setTotalStars(Math.round(number))
    }
    mapRatings()
  }, [business])
  // if (p1.address && typeof p1.address.country === 'string')
  // CHECKS IF THE BUSINESSDATA STATE HAS VALUE. RENDERS THE BUSINESS PAGE IF IT DOES AND SETS A LOADING SCREEN IF IT DOESN'T.
  // THE FIRST RENDER WON'T HAVE DATA, SINCE USEEFFECT, WHICH GIVES THE STATE IT'S VALUE, RUNS AFTER THE FIRST RENDER.

  console.log('totalStars', totalStars)
  return (
    <div className=' FeatureContainer_image Home'>
      <div className='BusinessContainer'>
        {business ? (
          <>
            <div className='BusinessDetails-leftColumn'>
              <h4 className='sidebar-hed'>
                <label htmlFor='features'>Features</label>
              </h4>
              <ul className='BusinessDetails-ul'>
                {business.features.map(feature => (
                  <h5 className='features'>
                    <li key={feature._id}>{feature.name}</li>
                  </h5>
                ))}
              </ul>
              <h4 className='sidebar-hed'>
                <label htmlFor='features'>Services</label>
              </h4>
              <ul className='BusinessDetails-ul'>
                {business.services.map(service => (
                  <h5 className='services'>
                    <li key={service._id}>{service.name}</li>
                  </h5>
                ))}
              </ul>
            </div>
            <div className='BusinessDetails-rightColumn'>
              <About
                name={business.businessName}
                description={business.description}
                image={business.image}
                address={business.address}
              />
              <div className='BusinessDetails-buttons'>
                <Review
                  id={id}
                  stars={totalStars}
                  ownerId={business.ownerId}
                  name={business.businessName}
                />
                <Book phone={business.phone} />
              </div>
              <div className='BusinessDetails_reviews'>
                <h4>reviews</h4>
                <BusinessReviews reviews={business.reviews} />
              </div>
            </div>
          </>
        ) : (
          <LoadSpinner />
        )}
      </div>
    </div>
  )
}
