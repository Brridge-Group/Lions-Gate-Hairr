"use strict";
exports.__esModule = true;
exports.updateUser = exports.signIn = exports.signUp = void 0;
var axios_1 = require("axios");
var API = axios_1["default"].create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use(function (req) {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = "Bearer " + JSON.parse(localStorage.getItem('profile') || '{}').token;
    }
    return req;
});
exports.signUp = function (formData) { return API.post('/users/signup', formData); };
exports.signIn = function (formData) { return API.post('/users/signin', formData); };
exports.updateUser = function (formData) { return API.put('/users/:id', formData); };
