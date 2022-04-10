import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header, ContentWrapper, HR } from './BusinessDetailsPageElements'
import { About } from '../About'
import { ServicesAndFeatures } from '../ServicesAndFeatures'
import { Book } from '../Book'
import { Review } from '../Review'

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
  name: string
  description: string
  image: string
  address: {
    street: string
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
  return (
    <div className='content-wrapper'>
      <ContentWrapper>
        <Header>
          <h1>Business Details</h1>
        </Header>
        <HR />
        {businessData ? (
          <>
            <About
              name={businessData.name}
              description={businessData.description}
              image={businessData.image}
              address={businessData.address}
            />
            <Review id={id} stars={businessData.stars} />
            <ServicesAndFeatures
              services={businessData.services}
              features={businessData.features}
            />
            <Book phone={businessData.phone} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </ContentWrapper>
    </div>
  )
}