"use strict";
exports.__esModule = true;
exports.BusinessReviews = void 0;
var react_1 = require("react");
var Star_1 = require("../../UIElements/Star");
require("./BusinessReviews.css");
exports.BusinessReviews = function (props) {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), businessReview = _b[0], getBusinessReview = _b[1];
    console.log(props, props.reviews, 'props.reviews, in business reviews', props.reviews);
    var reviews = props.reviews;
    // useEffect(() => {
    //   const fetchBusinessReviews = () => {
    //     Promise.all(
    //       reviews.map((review: any) => axios.get(`api/reviews/${review}`))
    //     ).then(data => console.log(data, 'in promise, business reviews'))
    //     // @ts-ignore
    //     // .then((data: any) => getBusinessReview(data))
    //   }
    //   fetchBusinessReviews()
    //   setLoading(false)
    // }, [reviews])
    // console.log(businessReview, 'businessReview')
    console.log(reviews, 'reviews, in business reviews');
    return (React.createElement("ul", { className: 'BusinessReviews_container' }, reviews.map(function (r) { return (React.createElement(React.Fragment, null,
        React.createElement("li", { key: r._id, className: 'Business_reviews' },
            React.createElement("div", { className: 'Business_column-left ' },
                React.createElement("div", { className: 'person-circle' }, "person foto")),
            React.createElement("div", { className: 'Business_column-right' },
                "person name",
                React.createElement("h6", { className: 'person-city' }, "person city, state"),
                React.createElement(Star_1.StarSmall, { stars: r.rating }),
                React.createElement("h6", null, r.comment))))); })));
};
