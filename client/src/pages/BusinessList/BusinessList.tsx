// React Components
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

// Custom Imports
import { Card } from '../../UIElements/Card'
import { CardDetails } from '../../components/CardDetails/CardDetails'
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
  stars: number
}

// export const FilterServicesAndFeatures: React.FC<Props> = (props: Props) => {
// export const ListItems: React.FC = () => {
export const BusinessList = () => {
  const [list, setList]: any = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { city } = useParams<RouteParams>()

  console.log(`initial list`, list)

  //* Initialize Services and Features to state
  const [feats, setFeats]: any = useState([]) // Features full object
  const [services, setServices]: any = useState([]) // Services full object
  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])

  //* Initialize state objects for form checkboxes
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
            return business.address.city.toLowerCase().includes(city.toLowerCase())
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
      <div
        className='BusinessList-Wrapper'
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          placeItems: 'center'
        }}
      >
        <div className='BusinessList-Wrapper_loader'>
          <LoadSpinner />
        </div>
      </div>
    )
  }

  if (list.length === 0) {
    return (
      <div
        className='BusinessList-Wrapper'
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          placeItems: 'center'
        }}
      >
        <h2>No businesses found. Please try another city.</h2>
      </div>
    )
  } else {
    return (
      <section className='BusinessList'>
        <div className='BusinessList-Wrapper'>
          <div className='BusinessList-HeaderContainer'>
            {/* ternary operator 
                  if city is defined, show city name, else show '' */}
            {city == 'undefined' ? <h1 className='BusinessList-Header'> All Businesses</h1> : <h1 className='BusinessList-Header'>{city} Businesses</h1>}
          </div>
          <div className='BusinessList-Container'>
            <div className='BusinessList-Filters'>
              <FilterServicesAndFeatures
                featuresArr={featuresArr}
                servicesArr={servicesArr}
                onFeatChange={onFeatChange}
                onServiceChange={onServiceChange}
                loading={loading}
                handleResetFilter={handleResetFilter}
              />
            </div>
            <div className='BusinessList-CardContainer'>
              {list.map((business: any) => (
                <Card
                  className=' BusinessList-Card'
                  key={business._id}
                  onClick={() => history.push(`/businesses/${business._id}`)}
                >
                  <CardDetails
                    name={business.name}
                    description={business.description}
                    image={business.image}
                    address={business.address}
                    stars={business.stars}
                  />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
