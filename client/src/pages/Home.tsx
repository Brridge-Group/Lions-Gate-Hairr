import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import ContentHeader from '../components/ContentHeader'

const Home = () => {
  const history = useHistory()
  const [city, setCity] = useState('')

  const handleChange = (e: any) => {
    if (e.target.value !== '') {
      setCity(e.target.value.toLowerCase())
    } else {
      console.log('Error on handleChange')
    }
  }

  const itemSubmitHandler = async (event: React.FormEvent<any>) => {
    event.preventDefault()
    try {
      history.push(`/items/${city}`)
      console.log(city)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <ContentHeader title="Home" />
        <section className="content">
          <div className="container-fluid">
            <h2 className="text-center display-4">
              Im looking for hairstylist in
            </h2>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <form onSubmit={itemSubmitHandler}>
                  <div className="input-group">
                    <input
                      type="search"
                      value={city}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Type the city name here"
                    />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-lg btn-default">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Home
