"use strict";
exports.__esModule = true;
exports.Profile = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var MyBusinessList_1 = require("../../components/MyBusinessList/MyBusinessList");
var Star_1 = require("../../UIElements/Star");
var LoadSpinner_1 = require("../../components/LoadSpinner/LoadSpinner");
require("./Profile.css");
var axios_1 = require("axios");
exports.Profile = function () {
    var _a = JSON.parse(localStorage.getItem('profile') || 'false').result, role = _a.role, _id = _a._id, name = _a.name, imageProfile = _a.imageProfile, reviews = _a.reviews;
    var user = JSON.parse(localStorage.getItem('profile') || 'false').result;
    var _b = react_1.useState([]), userReview = _b[0], getUserReview = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    // need to update local storage when add new review
    react_1.useEffect(function () {
        var fetchReviews = function () {
            Promise.all(reviews.map(function (review) { return axios_1["default"].get("api/reviews/" + review); }))
                //   // @ts-ignore
                .then(function (data) { return getUserReview(data); });
        };
        fetchReviews();
        setLoading(false);
    }, []);
    console.log(userReview, 'userReview line 39', typeof userReview);
    return (React.createElement("div", { className: role === 'user'
            ? 'FeatureContainer_image User'
            : 'FeatureContainer_image Owner' },
        React.createElement("div", { className: 'FeatureContainer' }, role && role === 'user' ? (React.createElement("div", { className: 'Profile_user' },
            React.createElement("h1", { className: 'Profile_name' },
                "Hello ",
                name,
                "!"),
            React.createElement("div", { className: 'Profile-UserContainer ' },
                React.createElement("img", { src: imageProfile || 'https://imgur.com/LDpwLVZ.jpg', alt: name + '_profilePicture', className: 'Profile-UserContainer_pic' }),
                React.createElement("div", { className: 'Profile-UserContainer_reviews' },
                    React.createElement("h4", null, "your reviews"),
                    React.createElement("div", { className: 'profile-container' }, loading ? (React.createElement(LoadSpinner_1.LoadSpinner, null)) : !userReview.length ? ('add some reviews') : (React.createElement("ul", { className: 'Profile_User_reviews' }, !loading &&
                        userReview.map(function (r) { return (React.createElement(React.Fragment, null,
                            React.createElement("li", { key: r.data.review._id, className: 'Profile_reviews' },
                                React.createElement("div", { className: 'column-left' },
                                    React.createElement("img", { src: r.data.review.business.image }),
                                    React.createElement("div", { className: 'review-btns' },
                                        React.createElement(react_router_dom_1.Link, { to: "/reviews/" + r.data.review._id + "/edit-review" },
                                            React.createElement("h6", { className: 'btn--btn-primary reviews' }, "edit")),
                                        React.createElement(react_router_dom_1.Link, { to: "#" },
                                            React.createElement("h6", { className: 'btn--btn-primary reviews' }, "delete")))),
                                React.createElement("div", { className: 'column-right' },
                                    React.createElement("h2", null, r.data.review.business.businessName),
                                    React.createElement("h5", null, r.data.review.business.address.city),
                                    React.createElement(Star_1.StarSmall, { stars: r.data.review.rating }),
                                    React.createElement("h5", null, r.data.review.comment))))); })))))),
            React.createElement("div", { className: 'Profile_links' },
                React.createElement(react_router_dom_1.Link, { to: "users/" + _id },
                    React.createElement("h6", { className: 'btn--btn-primary' }, "update profile")),
                React.createElement(react_router_dom_1.Link, { to: '/add-business' },
                    ' ',
                    React.createElement("h6", { className: 'btn--btn-primary twoLines' }, "become an owner"))))) : (React.createElement(MyBusinessList_1.MyBusinessList, null)))));
};
