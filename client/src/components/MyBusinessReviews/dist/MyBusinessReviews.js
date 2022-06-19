"use strict";
exports.__esModule = true;
exports.MyBusinessReviews = void 0;
var react_1 = require("react");
exports.MyBusinessReviews = function (props) {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), businessReviews = _b[0], getBusinessReviews = _b[1];
    console.log(props, props.reviews, 'props.reviews, in my business reviews');
    // useEffect(() => {
    //   const fetchBusinessReviews = () => {
    //     Promise.all(
    //       props.reviews.map((review: any) => axios.get(`api/reviews/${review}`))
    //     )
    //       .then(data => console.log(data, 'in promise'))
    //       // @ts-ignore
    //       .then((data: any) => getUserReview(data))
    //   }
    //   fetchBusinessReviews()
    //   setLoading(false)
    // }, [])
    return (React.createElement("div", null, "in business reviews"));
};
