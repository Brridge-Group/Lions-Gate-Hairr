import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MyStarList } from '../../UIElements/Star'
import { About } from '../BusinessDetails/About/About'
import '../../pages/Profile/Profile.css'
import './MyBusinessList.css'
import { MyBusinessReviews } from '../BusinessReviews/MyBusinessReviews'
import axios from 'axios'

import { LoadSpinner } from '../LoadSpinner/LoadSpinner'

interface MyBusinessReviews {
  reviews: Array<[]>
}

export const MyBusinessList = () => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  let history = useHistory();

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
  }

  const deleteBusiness = async (id: any) => {
    try {
      axios
        .delete(`api/businesses/${id}`, { data: { businessId: id } })
        .then(res => {
          window.location.reload();
          alert(res.data.message)
        })
    } catch (error:any) {
      alert(error.message)
      console.log('error in delete review: ', error.message)
    }
  }

  ////// want an open dropdown to close if click on another dropdown?  start of logic////
  // const dropDownArray = list.map(l => l._id)
  // console.log(dropDownArray, 'dropDownArray', id, 'id')
  // dropDownArray.filter(drop => {
  //   if (drop === id) {
  //     console.log('yes')
  //   }
  // })

  // console.log('in my business list, list', list)

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
                          <Link
                            to={{
                              pathname: `/businesses/${business._id}/edit-business`,
                              state: business,
                            }}>
                            <h6 className='btn--btn-primary twoLines business'>
                              edit <br />
                              business
                            </h6>
                          </Link>
                          <button
                            className='btn--btn-primary twoLines business'
                            onClick={() => deleteBusiness(business._id)}>
                            delete <br />
                            business
                          </button>
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
          <div className='Profile_links'>
            <Link to={'/add-business'}>
              {' '}
              <h6 className='btn--btn-primary twoLines'>
                add a<br /> business
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
