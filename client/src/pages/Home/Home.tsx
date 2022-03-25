import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Home.css'
import hairpink from '../../assets/images/hairpink.jpg'

export const Home = () => {
  const history = useHistory()
  const [city, setCity] = useState('')

  const handleChange = (e: any) => {
    try {
      setCity(e.target.value)
      console.log('handleChange: ', city)
    } catch (error) {
      console.log('Error on handleChange function', error)
    }
  }

  const itemSubmitHandler = async (event: React.FormEvent<any>) => {
    event.preventDefault()
    try {
      history.push(`/businessByCity/${city}`, { from: 'Home' })
      console.log('ItemSubmitHandler: ', city)
    } catch (err) {
      console.log('Error on itemSubmitHandler function', err)
    }
  }
  return (
    <div
      className='home'
      style={{
        backgroundImage: `url(${hairpink})`,
      }}>
      <div className='input-group'>
        <h3>I'm looking for hair stylist in</h3>
        <form onSubmit={itemSubmitHandler}>
          <input type='search' value={city} onChange={handleChange} autoFocus />
        </form>
      </div>
    </div>
  )
}
