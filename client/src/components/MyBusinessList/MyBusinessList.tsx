import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Card } from '../../UIElements/Card'
import { Star } from '../../UIElements/Star'
import { About } from '../BusinessDetails/About/About'
import '../../pages/Profile/Profile.css'
import './MyBusinessList.css'
import { MyBusinessReviews } from '../MyBusinessReviews/MyBusinessReviews'

import { LoadSpinner } from '../LoadSpinner/LoadSpinner'
// import { MyBusinessReviews } from '../MyBusinessReviews/dist/MyBusinessReviews'

export const MyBusinessList = () => {
  const history = useHistory()
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)

  const user = JSON.parse(localStorage.getItem('profile') || 'false').result

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/businesses/get-business-by-ownersId/?id=${user._id}`
        )
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

  const menu = toggle ? 'menu open' : 'menu'
  // const reviewRoute = () => {
  //   history.push(`/my-businesses/${business._id}/reviews`, {
  //     business: business,
  //   })
  // }

  const toggleIt = idx => {
    console.log(idx, 'idx')
    setToggle(!toggle)

    // const toggle = () => {
    //   handleClick(idx)
    // }
  }
  console.log('in business list, list', list)

  return (
    <div className='Profile_user'>
      <h1 className='Profile_name'>Hello {user.name}!</h1>
      <div className='Profile-UserContainer Owner'>
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
              <div className='BusinessCard-container'>
                {list.map((business: any, idx) => (
                  <div className='BusinessCard ' key={business._id}>
                    <About
                      name={business.businessName}
                      description={business.description}
                      image={business.image}
                      address={business.address}
                    />
                    <Star stars={business.stars} />
                    <div className='BusinessCard-buttons'>
                      <button
                        className='btn--btn-primary twoLines business'
                        onClick={() => toggleIt(idx)}>
                        {!toggle ? 'read reviews' : 'close'}
                      </button>
                      <Link to={'#'}>
                        <h6 className='btn--btn-primary twoLines business'>
                          edit <br />
                          business
                        </h6>
                      </Link>
                      <Link to={'#'}>
                        <h6 className='btn--btn-primary twoLines business'>
                          delete business
                        </h6>
                      </Link>
                    </div>
                    {/* <div className='Reviews-dropdown-toggle'> */}
                    <div className={menu}>
                      <MyBusinessReviews />
                    </div>
                  </div>
                ))}{' '}
              </div>
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
