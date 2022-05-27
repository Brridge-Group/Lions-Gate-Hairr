import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Card } from '../../UIElements/Card'
import { Star } from '../../UIElements/Star'
import { About } from '../BusinessDetails/About'
import '../../pages/Profile/Profile.css'
import { LoadSpinner } from '../LoadSpinner/LoadSpinner'

export const MyBusinessList = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('profile') || 'false').result

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/businesses/get-business-by-ownersId/?id=${user._id}`)
        const businessesList = await res.json()
        setList(businessesList)
        setLoading(false)
      } catch (err: any) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='Profile_user'>
      <h1 className='Profile_name'>Hello {user.name}!</h1>
      <div className='Profile-UserContainer'>
        {/* update here if change background image */}
        {/* <div className='Profile-UserContainer Owner'> */}
        {loading ? (
          <LoadSpinner />
        ) : !list.length ? (
          <div className='Profile-UserContainer_reviews business'>
            <h4>no businesses found</h4>
          </div>
        ) : (
          <>
            <div className='Profile-UserContainer_reviews business'>
              <h4>Your businesses</h4>
              {/* TODO: fix styles */}
              {list.map((business: any) => (
                <Card className='BusinessCard card-primary card-outline' key={business._id}>
                  <div onClick={() => history.push(`/businesses/${business._id}`)}>
                    <About name={business.name} description={business.description} image={business.image} address={business.address} />
                    <Star stars={business.stars} />
                  </div>
                </Card>
              ))}{' '}
              {/*end of map method */}
            </div>
          </>
        )}
      </div>
      <div className='Profile_links'>
        <Link to={`/users/${user._id}`}>
          {' '}
          <h6 className='btn--btn-primary'>update profile</h6>{' '}
        </Link>
        <Link to={'/add-business'}>
          {' '}
          <h6 className='btn--btn-primary twoLines'>
            add a<br /> business
          </h6>
        </Link>
      </div>
    </div>
  )
}
