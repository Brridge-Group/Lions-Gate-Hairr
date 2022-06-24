"use strict";
exports.__esModule = true;
exports.BusinessReviews = void 0;
var react_1 = require("react");
var Star_1 = require("../../UIElements/Star");
require("./BusinessReviews.css");
var axios_1 = require("axios");
exports.BusinessReviews = function (props) {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState([]), businessReview = _b[0], getBusinessReview = _b[1];
    console.log(props, props.reviews, 'props.reviews, in business reviews', props.reviews);
    var reviews = props.reviews;
    react_1.useEffect(function () {
        var fetchBusinessReviews = function () {
            Promise.all(reviews.map(function (review) { return axios_1["default"].get("api/reviews/" + review); })).then(function (data) { return getBusinessReview(data); });
        };
        fetchBusinessReviews();
        setLoading(false);
    }, []);
    console.log(businessReview, 'businessReview');
    // console.log(reviews, 'reviews, in business reviews')
    return (React.createElement("ul", { className: 'BusinessReviews_container' }, !loading && !businessReview.length ? (React.createElement("h6", { className: 'BusinessReviews_container-noReviews' }, "sorry, no reviews")) : (businessReview.map(function (r) { return (React.createElement("li", { key: r.data.review._id, className: 'Business_reviews' },
        React.createElement("div", { className: 'Business_column-left ' },
            React.createElement("img", { src: r.data.review.author.imageProfile, className: 'person-circle' })),
        React.createElement("div", { className: 'Business_column-right' },
            r.data.review.author.name,
            React.createElement("h6", { className: 'person-city' }, "do we want city, state"),
            React.createElement(Star_1.StarSmall, { stars: r.data.review.rating }),
            React.createElement("h6", null, r.data.review.comment)))); }))));
};
