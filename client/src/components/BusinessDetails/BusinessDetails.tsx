import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { About } from './About'

import { Book } from './Book'
import { Review } from './Review'
import './BusinessDetails.css'

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
  stars: number
  phone: string
}

export const BusinessDetails = () => {
  const [businessData, setBusinessData] = useState<Business>()
  const { id } = useParams<RouteParams>()

  // FETCHES BUSINESS DATA FROM REMOTE DATABSE ONCE AND SETS BUSINESSDATA STATE TO IT.
  useEffect(() => {
    const getBusinessData = async () => {
      const res = await fetch(`/api/businesses/get-business-by-id/${id}`)
      const businessData = await res.json()
      setBusinessData(businessData)
    }
    getBusinessData()
  }, [])

  // CHECKS IF THE BUSINESSDATA STATE HAS VALUE. RENDERS THE BUSINESS PAGE IF IT DOES AND SETS A LOADING SCREEN IF IT DOESN'T.
  // THE FIRST RENDER WON'T HAVE DATA, SINCE USEEFFECT, WHICH GIVES THE STATE IT'S VALUE, RUNS AFTER THE FIRST RENDER.

  console.log('business data', businessData)
  return (
    <div className=' FeatureContainer_image Home'>
      <div className='BusinessContainer'>
        {/* <div className='BusinessDetails-container'> */}
        {businessData ? (
          <>
            <div className='BusinessDetails-leftColumn'>
              <h4 className='sidebar-hed'>
                <label htmlFor='features'>Features</label>
              </h4>
              <ul>
                {businessData.features.map(feature => (
                  <h5 className='features'>
                    <li key={feature._id}>{feature.name}</li>
                  </h5>
                ))}
              </ul>
              <h4 className='sidebar-hed'>
                <label htmlFor='features'>Services</label>
              </h4>
              <ul className='BusinessDetails-ul'>
                {businessData.services.map(service => (
                  <h5 className='services'>
                    <li key={service._id}>{service.name}</li>
                  </h5>
                ))}
              </ul>
            </div>
            <div className='BusinessDetails-rightColumn'>
              <About
                name={businessData.businessName}
                description={businessData.description}
                image={businessData.image}
                address={businessData.address}
              />
              <div className='BusinessDetails-buttons'>
                <Review id={id} stars={businessData.stars} />
                <Book phone={businessData.phone} />
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    // </div>
  )
}
