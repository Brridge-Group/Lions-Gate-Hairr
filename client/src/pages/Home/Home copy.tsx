import { ContactSupportOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'

export const Home = () => {
  const history = useHistory()
  const [city, setCity] = useState('')
  const user = JSON.parse(localStorage.getItem('profile') ?? 'false').result

  const handleChange = (e: any) => {
    try {
      setCity(e.target.value)
    } catch (error) {}
  }

  const itemSubmitHandler = async (event: React.FormEvent<any>) => {
    event.preventDefault()
    try {
      history.push(`/businessByCity/${city}`, { from: 'Home' })
    } catch (err) {}
  }
  return (
    <>
      <div
        className={
          localStorage.getItem('profile') === null
            ? ' FeatureContainer_image Home'
            : ' FeatureContainer_image LoggedIn'
        }>
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
    </>
  )
}
