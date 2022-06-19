"use strict";
exports.__esModule = true;
exports.MyBusinessReviews = void 0;
var react_1 = require("react");
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
exports.MyBusinessReviews = function (props) {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), businessReviews = _b[0], getBusinessReviews = _b[1];
    console.log(props, props.reviews, 'props');
    // const [reviews, setReviews]
    // useEffect(() => {
    //   const fetchBusinessReviews = () => {
    //     Promise.all(
    //       props.reviews.map((review: any) => axios.get(`api/reviews/${review}`))
    //     )
    //     .then(data => console.log(data, 'in promise'))
    //       // @ts-ignore
    //     .then((data: any) => getUserReview(data))
    //     )
    //   }
    //   // fetchBusinessReviews()
    //   setLoading(false)
    // }, [])
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
    return (React.createElement("div", null, "in business reviews"));
};
