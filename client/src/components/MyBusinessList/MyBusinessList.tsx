import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MyStarList } from '../../UIElements/Star'
import { About } from '../BusinessDetails/About/About'
import '../../pages/Profile/Profile.css'
import './MyBusinessList.css'
import { MyBusinessReviews } from '../BusinessReviews/MyBusinessReviews'

import { LoadSpinner } from '../LoadSpinner/LoadSpinner'

interface MyBusinessReviews {
  reviews: Array<[]>
}

export const MyBusinessList = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  const [selected, setSelected] = useState({})

  const toggleIt = (id: any) => {
    setSelected({ ...selected, [id]: !selected[id] })
    console.log({ ...selected, [id]: !selected[id] }, 'toggleit selected')

    const dropDownArray = list.map(l => l._id)
    console.log(dropDownArray, 'dropDownArray', id, 'id')
    dropDownArray.filter(drop => {
      if (drop === id) {
        console.log('yes')
      }
    })
  }
  console.log('in my business list, list', list)

  return (
    <div className='FeatureContainer_image Owner'>
      <div className='FeatureContainer'>
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
                  <div className='BusinessCard-container'>
                    {list.map((business: any, idx) => (
                      <div className='BusinessCard ' key={business._id}>
                        <About
                          name={business.businessName}
                          description={business.description}
                          image={business.image}
                          address={business.address}
                        />
                        <MyStarList
                          stars={business.stars}
                          reviews={business.reviews}
                        />
                        <div className='BusinessCard-buttons'>
                          <h6
                            className='btn--btn-primary twoLines business reviews'
                            onClick={() => toggleIt(business._id)}
                            data-idx={idx}
                            id={business._id}>
                            {!selected[business._id]
                              ? 'read reviews'
                              : 'close reviews'}
                          </h6>
                          <Link to={'#'}>
                            <h6 className='btn--btn-primary twoLines business'>
                              edit <br />
                              business
                            </h6>
                          </Link>
                          <Link to={'#'}>
                            <h6 className='btn--btn-primary twoLines business'>
                              delete <br />
                              business
                            </h6>
                          </Link>
                        </div>
                        <div
                          className={
                            !selected[business._id]
                              ? 'menu-business'
                              : 'menu-business open'
                          }>
                          <MyBusinessReviews reviews={business.reviews} />
                        </div>
                      </div>
                    ))}{' '}
                  </div>
                  {/*end of map method */}
                </div>
              </>
            )}
          </div>
        </div>
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
