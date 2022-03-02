// React Components
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

// Custom Imports
import Card from '../../UIElements/Card'
import Star from '../../UIElements/Star'
import About from '../../components/BusinessDetails/About'
import FilterServicesAndFeatures from '../../components/FilterServicesAndFeatures/FilterServicesAndFeatures'
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner'

interface RouteParams {
  city: string
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

const BusinessList = () => {
  const [list, setList]: any = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { city } = useParams<RouteParams>()

  // Initialize  Services and Features to state
  const [feats, setFeats]: any = useState([]) // Features full object
  const [services, setServices]: any = useState([]) // Services full object
  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])

  // Initialize state objects for form checkboxes
  const [isChecked, setIsChecked]: any = useState(false)
  const [isFeatsChecked, setIsFeatsChecked]: any = useState([])
  const [isServicesChecked, setIsServicesChecked]: any = useState([])

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

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch('/api/features', {
          method: 'GET'
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
        setLoading(false)
      }
    }

    const fetchServicesData = async () => {
      try {
        const response = await fetch('/api/services', {
          method: 'GET'
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

  console.log(servicesArr)
  console.log(featuresArr)

  //* Filter Business Features and Services
  const [filterResults, setFilterResults]: any = useState([...list])
  console.log(filterResults)
  const [filteredFeats, setFilteredFeats]: any = useState([])
  const [filteredServices, setFilteredServices]: any = useState([])

  // Listen for the features' and services' checkbox changes and capture that data from the `Filters` child component
  const onFeatChange = data => {
    setFilteredFeats(data)
  }

  const onServiceChange = data => {
    setFilteredServices(data)
  }

  const handleResetFilter = () => {
    window.location.reload()
    // setFilterResults(busFilter) // FIXME: resets to an empty array
  }

  if (loading) {
    return (
      <div className='content-wrapper'>
        <div className=''>
          <div className='card-body row d-flex justify-content-center align-self-center mx-auto'>
            <LoadSpinner />
          </div>
        </div>
      </div>
    )
  }

  if (list.length === 0) {
    return (
      <div className='content-wrapper'>
        <Card>
          <h2>No businesses found.</h2>
        </Card>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <div className='content-wrapper'>
          <div className='container-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-6'>
                  {/* ternary operator 
                  if city is defined, show city name, else show '' */}
                  {city == 'undefined' ? (
                    <h1>List of Businesses</h1>
                  ) : (
                    <h1> List of {city} Businesses</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className='businessesList-container'
            style={{ display: 'flex', width: '100%' }}
          >
            <div
              className='filters'
              style={{
                width: '15vw',
                flexShrink: 0,
                marginLeft: '20px'
              }}
            >
              <FilterServicesAndFeatures
                featuresArr={featuresArr}
                servicesArr={servicesArr}
                onFeatChange={onFeatChange}
                onServiceChange={onServiceChange}
                loading={loading}
                handleResetFilter={handleResetFilter}
              />
            </div>
            <div className='businesses-list' style={{ width: '100%' }}>
              {list.map((business: any) => (
                <Card
                  className='BusinessCard card-primary card-outline'
                  key={business._id}
                >
                  <div
                    onClick={() => history.push(`/businesses/${business._id}`)}
                  >
                    <About
                      name={business.name}
                      description={business.description}
                      image={business.image}
                      address={business.address}
                    />
                    <Star stars={business.stars} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BusinessList