"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/* eslint-disable import/no-anonymous-default-export */
var actionTypes_1 = require("../constants/actionTypes");
exports["default"] = (function (state, action) {
    if (state === void 0) { state = { authData: null }; }
    switch (action.type) {
        case actionTypes_1.LOGIN:
            localStorage.setItem('profile', JSON.stringify(__assign({}, action === null || action === void 0 ? void 0 : action.data)));
            return __assign(__assign({}, state), { authData: action === null || action === void 0 ? void 0 : action.data });
        case actionTypes_1.AUTH:
            localStorage.setItem('profile', JSON.stringify(__assign({}, action === null || action === void 0 ? void 0 : action.data)));
            return __assign(__assign({}, state), { authData: action === null || action === void 0 ? void 0 : action.data });
        case actionTypes_1.UPDATE:
            localStorage.setItem('profile', JSON.stringify(__assign({}, action === null || action === void 0 ? void 0 : action.data)));
            return __assign(__assign({}, state), { authData: action === null || action === void 0 ? void 0 : action.data });
        case actionTypes_1.LOGOUT:
            localStorage.clear();
            return __assign(__assign({}, state), { authData: null });
        default:
            return state;
    }
});
