"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Review = void 0;
var react_router_dom_1 = require("react-router-dom");
require("./AddReview.css");
var isLoggedIn = true;
exports.Review = function (props) {
    var user = JSON.parse(localStorage.getItem('profile') || 'false').result;
    console.log('in review, id, ownerId, props, user', props.id, props.ownerId, props, user);
    var stars = __spreadArrays(Array(5)).map(function (star, i) {
        if (i <= Math.round(props.stars) - 1) {
            return (React.createElement("div", { className: 'star btn-review on', key: i }, "\u2605"));
        }
        else {
            return (React.createElement("div", { className: 'star btn-review off', key: i }, "\u2605"));
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'Review-container' },
            React.createElement("div", { className: 'Star-container' }, stars),
            isLoggedIn ? (React.createElement(react_router_dom_1.Link, { to: { pathname: props.id + '/add-review', state: props.name }, className: 'btn--btn-primary review' }, "Leave a Review")) : null)));
};
