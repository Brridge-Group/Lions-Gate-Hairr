"use strict";
exports.__esModule = true;
exports.App = void 0;
//* React Components
var react_router_dom_1 = require("react-router-dom");
//* Custom Imports
var Home_1 = require("./pages/Home/Home");
var UserRegistration_1 = require("./pages/Auth/UserRegistration/UserRegistration");
var Login_1 = require("./pages/Auth/Login/Login");
var BusinessList_1 = require("./pages/BusinessList/BusinessList");
var BusinessDetails_1 = require("./pages/BusinessDetails/BusinessDetails");
var AddBusiness_1 = require("./pages/AddBusiness/AddBusiness");
var AddReview_1 = require("./components/Reviews/AddReview");
var EditReview_1 = require("./components/Reviews/EditReview");
var MyBusinessList_1 = require("./components/MyBusinessList/MyBusinessList");
var EditBusiness_1 = require("./pages/EditBusiness/EditBusiness");
var Navbar_1 = require("./components/Navbar/Navbar");
var Profile_1 = require("./pages/Profile/Profile");
var EditProfile_1 = require("./pages/Auth/EditProfile");
require("./App.css");
exports.App = function () {
    var routes;
    routes = (React.createElement(react_router_dom_1.Switch, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/' },
            React.createElement(Home_1.Home, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/user-signin' },
            React.createElement(Login_1["default"], null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/user-signup' },
            React.createElement(UserRegistration_1.UserRegistration, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/users/:id' },
            React.createElement(EditProfile_1.EditProfile, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/my-businesses' },
            React.createElement(MyBusinessList_1.MyBusinessList, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/businesses/:id/edit-business' },
            React.createElement(EditBusiness_1.EditBusiness, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/businesses/:id' },
            React.createElement(BusinessDetails_1.BusinessDetails, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/businessByCity/:city' },
            React.createElement(BusinessList_1.BusinessList, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/add-business' },
            React.createElement(AddBusiness_1.AddBusiness, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/businesses/:id/add-review' },
            React.createElement(AddReview_1.AddReview, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/reviews/:id/edit-review' },
            React.createElement(EditReview_1.EditReview, null)),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/profile' },
            React.createElement(Profile_1.Profile, null)),
        React.createElement(react_router_dom_1.Redirect, { to: '/' })));
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement("div", { className: 'AppContainer' },
            React.createElement(Navbar_1.Navbar, null),
            routes)));
};
