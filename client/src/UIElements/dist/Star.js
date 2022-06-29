"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MyStarList = exports.StarList = exports.StarSmall = exports.Star = void 0;
var react_1 = require("react");
require("./Card.css");
exports.Star = function (props) {
    var star = __spreadArrays(Array(5)).map(function (star, i) {
        if (i <= Math.round(props.stars) - 1) {
            return (React.createElement("div", { className: 'star btn-review on', key: i }, "\u2605"));
        }
        else {
            return (React.createElement("div", { className: 'star btn-review off', key: i }, "\u2605"));
        }
    });
    return React.createElement("div", { className: 'Star-container' }, star);
};
exports.StarSmall = function (props) {
    var star = __spreadArrays(Array(5)).map(function (star, i) {
        if (i <= Math.round(props.stars) - 1) {
            return (React.createElement("div", { className: 'star_small btn-review_small on', key: i }, "\u2605"));
        }
        else {
            return (React.createElement("div", { className: 'star_small btn-review_small off ', key: i }, "\u2605"));
        }
    });
    return React.createElement("div", { className: 'Star-container_small' }, star);
};
exports.StarList = function (props) {
    var _a = react_1.useState(0), totalStars = _a[0], setTotalStars = _a[1];
    var reviews = props.reviews;
    react_1.useEffect(function () {
        var number = 0;
        var mapRatings = function () {
            reviews === null || reviews === void 0 ? void 0 : reviews.map(function (r, idx) { return (number = number + r.rating / (reviews === null || reviews === void 0 ? void 0 : reviews.length)); });
            setTotalStars(Math.round(number));
        };
        mapRatings();
    }, [reviews]);
    console.log('in star, props', props, totalStars);
    var star = __spreadArrays(Array(5)).map(function (star, i) {
        if (i <= Math.round(totalStars) - 1) {
            return (React.createElement("div", { className: 'star btn-review on', key: i }, "\u2605"));
        }
        else {
            return (React.createElement("div", { className: 'star btn-review off', key: i }, "\u2605"));
        }
    });
    return React.createElement("div", { className: 'Star-container' }, star);
};
exports.MyStarList = function (props) {
    var _a = react_1.useState(0), totalStars = _a[0], setTotalStars = _a[1];
    var _b = react_1.useState([]), myBusinessReview = _b[0], getMyBusinessReview = _b[1];
    var reviews = props.reviews;
    // useEffect(() => {
    //   const fetchBusinessReviews = () => {
    //     Promise.all(
    //       reviews
    //         ?.map((review: any) => axios.get(`api/reviews/${review}`))
    //         .then((data: any) => getMyBusinessReview(data))
    //     )
    //   }
    //   fetchBusinessReviews()
    // }, [])
    console.log(myBusinessReview, 'myBusinessReview');
    // useEffect(() => {
    //   let number = 0
    //   const mapRatings = () => {
    //     myBusinessReview?.map(
    //       (r: any, idx: any) => (number = number + r.rating / myBusinessReview?.length)
    //     )
    //     setTotalStars(Math.round(number))
    //   }
    //   mapRatings()
    // }, [myBusinessReview])
    console.log('in mystarList, props', props, totalStars);
    var star = __spreadArrays(Array(5)).map(function (star, i) {
        if (i <= Math.round(totalStars) - 1) {
            return (React.createElement("div", { className: 'star btn-review on', key: i }, "\u2605"));
        }
        else {
            return (React.createElement("div", { className: 'star btn-review off', key: i }, "\u2605"));
        }
    });
    return React.createElement("div", { className: 'Star-container' }, star);
};
