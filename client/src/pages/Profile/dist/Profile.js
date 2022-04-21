"use strict";
exports.__esModule = true;
exports.Profile = void 0;
var react_router_dom_1 = require("react-router-dom");
var MyBusinessList_1 = require("../../components/MyBusinessList/MyBusinessList");
require("./Profile.css");
exports.Profile = function () {
    var _a;
    var user = JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false').result;
    console.log(user.role);
    return (
    //use following if have different image for owner profile
    // <div
    //   className={
    //     user.role === 'user'
    //       ? 'FeatureContainer_image User'
    //       : 'FeatureContainer_image Owner'
    //   }>
    React.createElement("div", { className: 'FeatureContainer_image User' },
        React.createElement("div", { className: 'FeatureContainer' }, user && user.role === 'user' ? (React.createElement("div", { className: 'Profile_user' },
            React.createElement("h1", { className: 'Profile_name' },
                "Hello ",
                user.name,
                " !"),
            React.createElement("div", { className: 'Profile-UserContainer ' },
                React.createElement("div", { className: '', style: { fontSize: '15px' } },
                    React.createElement("h6", { className: 'user-foto' }, "user foto"),
                    React.createElement("img", { src: 'https://imgur.com/LDpwLVZ.jpg', className: 'user-pix-placeholder' })),
                React.createElement("div", { className: 'Profile-UserContainer_reviews' },
                    React.createElement("h4", null, "your reviews")),
                React.createElement("div", { className: 'user-reviews-placeholder' }, "reviews scroll here")),
            React.createElement("div", { className: 'Profile_links' },
                React.createElement(react_router_dom_1.Link, { to: 'users/:id' },
                    React.createElement("h6", { className: 'btn--btn-primary' }, "update profile")),
                React.createElement(react_router_dom_1.Link, { to: '#' },
                    ' ',
                    React.createElement("h6", { className: 'btn--btn-primary twoLines' }, "become an owner"))))) : (React.createElement(MyBusinessList_1.MyBusinessList, null)))));
};
