//* React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

//* Custom Imports
import { StarList } from '../../UIElements/Star'
import { GrClose } from 'react-icons/gr'

import { LoadSpinner } from '../../components/LoadSpinner/LoadSpinner'
import { Card } from '../../components/Card/Card'
import { CardDetails } from '../../components/Card/CardDetails/CardDetails'
import { FilterServicesAndFeatures } from '../../components/FilterServicesAndFeatures/FilterServicesAndFeatures'

//* Custom Styles
import './BusinessList.css'

//* Types
interface RouteParams {
  city: string
}

interface Business {
  businessName: string
  description: string
  email: string
  image: string
  phone: string
  address: {
    address1: string
    address2: string
    city: string
    country: string
    region: string
    postalCode: string
  }
  services: Service[]
  features: Feature[]
  reviews: Review[]
  stars: number
}

interface Service {
  _id: string
  isChecked: boolean
  name: string
}

interface Feature {
  _id: string
  isChecked: boolean
  name: string
}

interface Review {
  _id: string
  comment: string
  rating: number
}
export const BusinessList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { city } = useParams<RouteParams>()
  const [list, setList]: any[] = useState([])
  const getIsMobile = () => window.innerWidth <= 575

  //* Initialize Services and Features to State with full database data object
  const [feats, setFeats] = useState<Business['features'][]>([])
  const [services, setServices] = useState<Business['services'][]>([])

  //* Initialize Services and Features Arrays to State
  const [featuresArr, setFeaturesArr]: any[] = useState([])
  const [servicesArr, setServicesArr]: any[] = useState([])
  const [isMobile, setIsMobile] = useState(getIsMobile)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  const addClass = 'Btn-Primary modal'

  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
    console.log('hi')
  }
  const handleClickClose = () => {
    setIsModalOpen(false)
    console.log('hi')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/businesses/get-businesses')
        setIsLoading(true)
        const businessesList = await res.json()
        if (typeof city !== 'undefined') {
          const filtered = businessesList.filter((business: Business) => {
            return business.address.city
              .toLowerCase()
              .includes(city.toLowerCase())
          })
          setList(filtered)
        } else {
          setList(businessesList)
        }
        setIsLoading(false)
      } catch (err: any) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // console.log('Business List', list)

  //* Fetch Features and Services from the database
  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch('/api/features', {
          method: 'GET',
        })
        const responseData = await response.json()
        setFeats(responseData)
        const featsArr = responseData.map(el => {
          let featsName = el.name
          let featsId = el._id
          let featsIsChecked = el.isChecked

          return [featsName, featsId, featsIsChecked]
        })
        setFeaturesArr(featsArr)
      } catch (err: any) {
        console.log(err)
        setIsLoading(false)
      }
    }

    const fetchServicesData = async () => {
      try {
        const response = await fetch('/api/services', {
          method: 'GET',
        })
        const responseData = await response.json()
        setServices(responseData)
        const servicesArr = responseData.map(el => {
          let servicesName = el.name
          let servicesId = el._id
          let servicesIsChecked = el.isChecked

          return [servicesName, servicesId, servicesIsChecked]
        })
        setServicesArr(servicesArr)
      } catch (err: any) {
        console.log(err)
        setIsLoading(false)
      }
    }

    fetchFeaturesData()
    fetchServicesData()
  }, [])

  // console.log(`servicesArr`, servicesArr)
  // console.log(`featuresArr`, featuresArr)

  //* Initialize State Arrays to Filter Business Features and Services
  const [filteredResults, setFilteredResults]: any[] = useState([])
  const [filteredFeats, setFilteredFeats]: any[] = useState([])
  const [filteredServices, setFilteredServices]: any[] = useState([])

  // console.log(`filteredResults`, filteredResults)

  //* Listen for the features' and services' checkbox changes and capture that data from the `FilterServicesAndFeatures` child component
  const onFeatChange = (feature: any[]): void => {
    setFilteredFeats(feature)
  }

  const onServiceChange = (service: any[]): void => {
    setFilteredServices(service)
  }

  //* Filter Business by *All* User Selected Features and Services
  const handleFilteredResults = (): void => {
    let tempSelectedFeatsServices: any[] = []

    //* Filter out elements that are only selected as true/checked and push those true objects to tempSelectedFeatsServices
    tempSelectedFeatsServices = [...filteredFeats, ...filteredServices].filter(
      tempFeatOrService => tempFeatOrService.isChecked
    )

    if (tempSelectedFeatsServices.length > 0) {
      //* Filter out Businesses that do not have the selected Features and Services
      const filteredBusinesses: any[] = list.filter(businessObject => {
        //* Return an array of business Iterate through the Features and Services of each business
        const businessFeatAndService = [
          ...businessObject.features,
          ...businessObject.services,
        ].map(businessFeatOrService => businessFeatOrService._id)

        //* Iterate through, `tempSelectedFeatsServices`, the Features && Services of each business
        return tempSelectedFeatsServices.every(tempFeatOrService => {
          //* If the business' Features && Service has the selected filter Features && Service `_id`, return true
          return businessFeatAndService.includes(tempFeatOrService._id)
        })
      })
      // console.log(`🔇 -> filteredBusinesses`, filteredBusinesses)
      setFilteredResults(filteredBusinesses)
    }
    if (tempSelectedFeatsServices.length === 0) {
      setFilteredResults(() => {
        let newFilteredResults: any[] = [...list]
        return newFilteredResults
      })
    }
  }

  useEffect(() => {
    //* Set `filteredResults` Business List
    setFilteredResults(() => {
      let newFilteredResults: any[] = [...list]
      return newFilteredResults
    })
  }, [list, city])
  // console.log(list, city, 'list, city')

  return (
    <div className='BusinessList-Container_image FeatureContainer_image '>
      <main className='BusinessList-Container FeatureContainer'>
        {isLoading ? (
          <LoadSpinner />
        ) : !list.length || city == 'undefined' ? (
          <div className='BusinessList-Header_errorMessage'>
            <h1>No businesses found. Please try another city.</h1>
          </div>
        ) : (
          <>
            <h1 className='BusinessList-Header'>{city} Businesses</h1>
            {isMobile ? (
              <>
                <button onClick={handleClick} className='Btn-Primary modal'>
                  Filter Services & Features
                </button>
                <div
                  className={
                    isModalOpen
                      ? 'BusinessList-modal open'
                      : 'BusinessList-modal'
                  }>
                  {/* 'BusinessList-modal'> */}
                  <button
                    onClick={handleClick}
                    className='BusinessList-modalButton'>
                    <GrClose />
                  </button>
                  <section className='BusinessList-FiltersContainer modal'>
                    <FilterServicesAndFeatures
                      isLoading={isLoading}
                      list={list}
                      filteredResults={filteredResults}
                      setFilteredResults={setFilteredResults}
                      featuresArr={featuresArr}
                      setFeaturesArr={setFeaturesArr}
                      servicesArr={servicesArr}
                      setServicesArr={setServicesArr}
                      onFeatChange={onFeatChange}
                      onServiceChange={onServiceChange}
                      // isChecked={isChecked}
                      handleFilteredResults={handleFilteredResults}
                    />
                  </section>
                </div>
              </>
            ) : (
              <section className='BusinessList-FiltersContainer'>
                <FilterServicesAndFeatures
                  isLoading={isLoading}
                  list={list}
                  filteredResults={filteredResults}
                  setFilteredResults={setFilteredResults}
                  featuresArr={featuresArr}
                  setFeaturesArr={setFeaturesArr}
                  servicesArr={servicesArr}
                  setServicesArr={setServicesArr}
                  onFeatChange={onFeatChange}
                  onServiceChange={onServiceChange}
                  // isChecked={isChecked}
                  handleFilteredResults={handleFilteredResults}
                />
              </section>
            )}
            <section className='BusinessList-CardContainer'>
              {/* If the list of Businesses is not empty, display filtered results, further filtered by user selected Services and Features*/}
              {filteredResults && filteredResults.length > 0 ? (
                filteredResults?.map((business: any) => (
                  // <div key={`${business._id}_` + business.name} className='BusinessList-Card'>
                  <Card className='BusinessCard List' key={business._id}>
                    <Link
                      to={{
                        pathname: `/businesses/${business._id}`,
                      }}>
                      <CardDetails
                        businessName={business.businessName}
                        description={business.description}
                        image={business.image}
                        address={business.address}
                      />
                    </Link>
                    <StarList
                      stars={business.stars}
                      reviews={business.reviews}
                    />
                  </Card>
                ))
              ) : (
                <>
                  <h2 className='BusinessList-Header_errorMessage_noResults'>
                    No businesses were found with the chosen services and or
                    features.
                  </h2>
                  <br />
                  <h2 className='BusinessList-Header_errorMessage_noResults'>
                    Please change your selection and filter again.
                  </h2>
                </>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
