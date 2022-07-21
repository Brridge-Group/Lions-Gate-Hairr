"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var App_1 = require("./App");
var reportWebVitals_1 = require("./reportWebVitals");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var auth_1 = require("./reducers/auth");
var store = redux_1.createStore(auth_1["default"], redux_1.compose(redux_1.applyMiddleware(redux_thunk_1["default"])));
react_dom_1["default"].render(react_1["default"].createElement(react_1["default"].StrictMode, null,
    react_1["default"].createElement(react_redux_1.Provider, { store: store },
        react_1["default"].createElement(App_1.App, null))), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1["default"]();
