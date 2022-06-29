// React Components
import { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from 'axios'

// Custom Imports
import { About } from '../../components/BusinessDetails/About/About'
import { StarList } from '../../UIElements/Star'
import { Card } from '../../UIElements/Card'
import { FilterServicesAndFeatures } from '../../components/FilterServicesAndFeatures/FilterServicesAndFeatures'
import { LoadSpinner } from '../../components/LoadSpinner/LoadSpinner'

// Custom Styles
import './BusinessList.css'

// Types
interface RouteParams {
  city: string
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

export const BusinessList = () => {
  const [list, setList]: any = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { city } = useParams<RouteParams>()

  //* Initialize Services and Features to state
  const [feats, setFeats]: any = useState([]) // Features full object
  const [services, setServices]: any = useState([]) // Services full object

  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])

  // //* Initialize state objects for form checkboxes
  // // TODO: [ ] => Connect with `handleResetFilter` to reset checkboxes to false
  // const [isChecked, setIsChecked]: any = useState(false)
  // const [isFeatsChecked, setIsFeatsChecked]: any = useState([])
  // const [isServicesChecked, setIsServicesChecked]: any = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/businesses/get-businesses')
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
        setLoading(false)
      } catch (err: any) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  console.log('bus list', list)

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
        setLoading(false)
      }
    }

    // history.push(`/businesses/${business._id}`)

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
        setLoading(false)
      }
    }

    fetchFeaturesData()
    fetchServicesData()
  }, [])

  // console.log(`servicesArr`, servicesArr)
  // console.log(`featuresArr`, featuresArr)

  //* Filter Business Features and Services
  const [filteredResults, setFilteredResults]: any = useState([])
  // console.log(`filteredResults`, filteredResults)
  const [filteredFeats, setFilteredFeats]: any = useState([])
  const [filteredServices, setFilteredServices]: any = useState([])

  //* Listen for the features' and services' checkbox changes and capture that data from the `FilterServicesAndFeatures` child component
  const onFeatChange = (feature: any) => {
    setFilteredFeats(feature)
  }

  const onServiceChange = (service: any) => {
    setFilteredServices(service)
  }

  const handleFilteredResults = (): [] => {
    let tempFilteredResults: any[] = []
    let tempSelectedFeatsServices: any[] = []
    //* Push user selected Features to a single temp array, if the filtered array/object is not empty
    if (Object.keys(filteredFeats).length > 0) {
      //* Filter out elements that are only true and push those true objects to tempSelectedFeatsServices
      Object.entries(filteredFeats).filter(featureElement => {
        if (featureElement[1] === true) {
          tempSelectedFeatsServices.push(featureElement)
          return true
        }
      })
    }
    //* Push user selected Services to a single temp array, if the filtered array/object is not empty
    if (Object.keys(filteredServices).length > 0) {
      //* Filter out elements that are only true and push those true objects to tempSelectedFeatsServices
      Object.entries(filteredServices).filter(featureElement => {
        if (featureElement[1] === true) {
          tempSelectedFeatsServices.push(featureElement)
          return true
        }
      })
    }
    //* Filter the list of businesses by the selected Features and Services
    let newList: any[] = [...list].filter(businessObject => {
      //* Iterate through the selected Features and Services
      if (tempSelectedFeatsServices.length === 0) {
        tempFilteredResults.push(businessObject)
        return true
      }
      if (tempSelectedFeatsServices.length > 0) {
        return tempSelectedFeatsServices.some(filteredElement => {
          //* Iterate through the Features of each business
          businessObject.features.filter(bizFeats => {
            //* If the business has the selected Features, add it to the tempFilteredResults array
            if (Object.values(bizFeats).includes(filteredElement[0])) {
              tempFilteredResults.push(businessObject)
              return true
            }
          })
          //* Iterate through the Services of each business
          businessObject.services.filter(bizServices => {
            //* If the business has the selected Services, add it to the tempFilteredResults array
            if (Object.values(bizServices).includes(filteredElement[0])) {
              tempFilteredResults.push(businessObject)
              return true
            }
          })
        })
      }
    })
    //* Remove Any Duplicates
    let uniqueTempFilteredResults: any = Array.from(
      new Set(tempFilteredResults)
    )
    setFilteredResults(uniqueTempFilteredResults)
    return filteredResults
  }

  //* Set `filteredResults` Businesses List
  useEffect(() => {
    setFilteredResults(() => {
      let newFilteredResults = [...list]
      return newFilteredResults
    })
  }, [list, city])
  // console.log(list, city, 'list, city')

  const handleResetFilter = (): any => {
    // TODO: [ ] => FIXME: Reset checkboxes to false
    //? TODO: [ ] => Explore connecting to child component to allow for checkbox resetting to opposite of checked
    window.location.reload()
  }

  return (
    <div className='FeatureContainer_image BusinessList'>
      <div className='FeatureContainer BusinessList'>
        {loading ? (
          <LoadSpinner />
        ) : !list.length || city == 'undefined' ? (
          <h1 className='BusinessList-none'>
            No businesses found. Please try another city.
          </h1>
        ) : (
          <>
            <h1 className='BusinessList-Header'>{city} Salons</h1>
            <div className='BusinessList-Filters leftColumn '>
              <FilterServicesAndFeatures
                featuresArr={featuresArr}
                servicesArr={servicesArr}
                onFeatChange={onFeatChange}
                onServiceChange={onServiceChange}
                loading={loading}
                // isChecked={isChecked}
                handleResetFilter={handleResetFilter}
                handleFilteredResults={handleFilteredResults}
              />
            </div>
            <div className='BusinessList-Filters rightColumn'>
              {/* Display full Business List by city or a Filtered list by Services and Features   */}
              {filteredResults && filteredResults.length > 0 ? (
                filteredResults?.map((business: any) => (
                  <>
                    <Card className='BusinessCard List' key={business._id}>
                      <Link
                        to={{
                          pathname: `/businesses/${business._id}`,
                        }}>
                        <About
                          name={business.businessName}
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
                  </>
                ))
              ) : (
                <>
                  <h2 className='BusinessCard-noResults'>
                    No businesses were found with the chosen services and or
                    features.
                  </h2>
                  <br />
                  <h2 className='BusinessCard-noResults'>
                    Please change your selection and filter again.
                  </h2>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
