"use strict";
exports.__esModule = true;
exports.App = void 0;
// React Components
var react_router_dom_1 = require("react-router-dom");
// Custom Imports
var Home_1 = require("./pages/Home/Home");
var UserRegistration_1 = require("./pages/Auth/UserRegistration/UserRegistration");
var Login_1 = require("./pages/Auth/Login/Login");
var BusinessList_1 = require("./pages/BusinessList/BusinessList");
var BusinessDetails_1 = require("./components/BusinessDetails/BusinessDetails");
var AddBusiness_1 = require("./pages/AddBusiness/AddBusiness");
var AddReview_1 = require("./components/Reviews/AddReview");
var EditReview_1 = require("./components/Reviews/EditReview");
var MyBusinessList_1 = require("./components/MyBusinessList/MyBusinessList");
var Navbar_1 = require("./components/Navbar/Navbar");
var Profile_1 = require("./pages/Profile/Profile");
var EditProfile_1 = require("./pages/Auth/EditProfile");
// Custom Styles
require("./App.css");
exports.App = function () {
    var routes;
    routes = (React.createElement(react_router_dom_1.Switch, null,
        React.createElement(react_router_dom_1.Route, { path: '/', exact: true },
            React.createElement(Home_1.Home, null)),
        React.createElement(react_router_dom_1.Route, { path: '/user-signin', exact: true },
            React.createElement(Login_1["default"], null)),
        React.createElement(react_router_dom_1.Route, { path: '/user-signup', exact: true },
            React.createElement(UserRegistration_1.UserRegistration, null)),
        React.createElement(react_router_dom_1.Route, { path: '/users/:id', exact: true },
            React.createElement(EditProfile_1.EditProfile, null)),
        React.createElement(react_router_dom_1.Route, { path: '/my-businesses', exact: true },
            React.createElement(MyBusinessList_1.MyBusinessList, null)),
        React.createElement(react_router_dom_1.Route, { path: '/businesses/:id', exact: true },
            React.createElement(BusinessDetails_1.BusinessDetails, null)),
        React.createElement(react_router_dom_1.Route, { path: '/businessByCity/:city', exact: true },
            React.createElement(BusinessList_1.BusinessList, null)),
        React.createElement(react_router_dom_1.Route, { path: '/add-business', exact: true },
            React.createElement(AddBusiness_1.AddBusiness, null)),
        React.createElement(react_router_dom_1.Route, { path: '/businesses/:id/add-review', exact: true },
            React.createElement(AddReview_1.AddReview, null)),
        React.createElement(react_router_dom_1.Route, { path: '/reviews/:id/edit-review', exact: true },
            React.createElement(EditReview_1.EditReview, null)),
        React.createElement(react_router_dom_1.Route, { path: '/profile', exact: true },
            React.createElement(Profile_1.Profile, null)),
        React.createElement(react_router_dom_1.Redirect, { to: '/' })));
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement("div", { className: 'AppContainer' },
            React.createElement(Navbar_1.Navbar, null),
            routes)));
};
