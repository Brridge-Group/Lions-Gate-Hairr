import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  const history = useHistory()
  const location = useLocation()
  const [city, setCity] = useState('')

  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result

  const handleChange = (e: any) => {
    try {
      setCity(e.target.value)
    } catch (error) {}
  }
  console.log('location', location, location.state)

  const itemSubmitHandler = async (event: React.FormEvent<any>) => {
    event.preventDefault()
    try {
      history.push(`/businessByCity/${city}`, { from: 'Home' })
    } catch (err) {}
  }
  return (
    <>
      {localStorage.getItem('profile') === null ? (
        <div className=' FeatureContainer_image Home'>
          <div className='FeatureContainer'>
            <div className='Home_inputGroup'>
              <h3>I'm looking for hair stylist in</h3>
              <form onSubmit={itemSubmitHandler}>
                <input
                  type='search'
                  className='Home_input'
                  value={city}
                  onChange={handleChange}
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className=' FeatureContainer_image LoggedIn'>
          <div className='FeatureContainer'>
            <div className='Home_inputGroup'>
              <h3>I'm looking for hair stylist in</h3>
              <form onSubmit={itemSubmitHandler}>
                <input
                  type='search'
                  className='Home_input'
                  value={city}
                  onChange={handleChange}
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
