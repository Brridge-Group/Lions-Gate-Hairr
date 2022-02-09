import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Card from '../../UIElements/Card'
import Star from '../../UIElements/Star'
import About from '../../components/BusinessDetails/About'

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
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const { city } = useParams<RouteParams>()

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

  if (loading) {
    return (
      <div className='content-wrapper'>
        <div className='card'>
          <div className='card-body row'>
            <h2>Loading....</h2>
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
                marginRight: '10px'
              }}
            >
              Filters
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
