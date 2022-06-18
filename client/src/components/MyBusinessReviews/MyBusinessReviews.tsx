// import { useState, useEffect } from 'react'
// import { LoadSpinner } from '../LoadSpinner/LoadSpinner'
// import { StarSmall } from '../../UIElements/Star'
// import { useLocation } from 'react-router-dom'

// interface Business {
//   businessName: string
//   description: string
//   image: string
//   address: {
//     address1: string
//     address2: string
//     city: string
//     region: string
//     postalCode: string
//   }
//   reviews: []
// }
// interface User {
//   name: string
//   imageProfile: string
// }

// interface Review {
//   _id: string
//   comment: string
//   rating: number
// }

export const MyBusinessReviews = () => {
  // const [businessReviews, getBusinessReviews] = useState([])

  // const [loading, setLoading] = useState(true)
  // const location = useLocation()

  //geting reviews here from my business list
  // const { from } = location.state

  // useEffect(() => {
  //   const fetchReviews = () => {
  //     Promise.all(
  //       reviews.map((review: any) => axios.get(`api/reviews/${review}`))
  //     )
  //       // .then(data => console.log(data, 'in promise'))
  //       //   // @ts-ignore
  //       .then((data: any) => getBusinessReviews(data))
  //     // )
  //   }
  //   fetchReviews()
  //   setLoading(false)
  // }, [])
  return (
    <div>
      {/* <div className='Profile-UserContainer_reviews'>
        <div className='profile-container'> */}
      {/* {loading ? (
            <LoadSpinner />
          ) : 'add some reviews' ? (
            'add some reviews'
          ) : ( */}
      {/* <ul className='Profile_User_reviews'> */}
      {/* {!loading &&
                businessReviews.map((r: any) => (
                  <>
                    <li className='Profile_reviews' key={r._id}>
                      <div className='column-left'>
                        <img src={r.data.review.business.image} />
                        <div className='review-btns'>
                          <button className='btn--btn-primary reviews'>
                            edit
                          </button>
                          <button className='btn--btn-primary reviews'>
                            delete
                          </button>
                        </div>
                      </div>
                      <div className='column-right'>
                        <h2>{r.data.review.business.businessName}</h2>
                        <h5>{r.data.review.business.address.city}</h5>
                        <StarSmall stars={r.data.review.rating} />
                        <h5>{r.data.review.comment}</h5>
                      </div>
                    </li>
                  </>
                ))} */}
      {/* </ul> */}
      {/* )} */}
      {/* </div> */}
      {/* </div> */}
    </div>
  )
}
