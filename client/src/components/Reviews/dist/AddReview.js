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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AddReview = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./AddReview.css");
exports.AddReview = function () {
    var _a, _b;
    var history = react_router_dom_1.useHistory();
    var location = react_router_dom_1.useLocation();
    var busName = location.state;
    var _c = react_1.useState(0), rating = _c[0], setRating = _c[1];
    var _d = react_1.useState(0), hover = _d[0], setHover = _d[1];
    var _e = react_1.useState({ comment: '' }), reviewForm = _e[0], setReviewForm = _e[1];
    var id = react_router_dom_1.useParams().id;
    var comment = reviewForm.comment;
    var user = JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false').result;
    var token = JSON.parse((_b = localStorage.getItem('profile')) !== null && _b !== void 0 ? _b : 'false').token;
    // console.log('user, in add review', user)
    var handleChange = function (e) {
        var _a;
        e.preventDefault();
        setReviewForm(__assign(__assign({}, reviewForm), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var saveNewReview = function () { return __awaiter(void 0, void 0, void 0, function () {
        var newReview, requestOptions, response, res, userModified, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newReview = __assign(__assign({}, reviewForm), { author: user._id, business: id, rating: rating, image: user.imageProfile, name: user.name });
                    requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(__assign({}, newReview))
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/reviews', requestOptions)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('New review not saved! Please resubmit.');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    res = _a.sent();
                    window.localStorage.removeItem('profile');
                    userModified = {
                        result: res.result,
                        token: token
                    };
                    window.localStorage.setItem('profile', JSON.stringify(userModified));
                    alert('Review successful.');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Review not created.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var submitReview = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            try {
                saveNewReview();
                history.push('/');
            }
            catch (err) { }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: 'FeatureContainer_image Review' },
        React.createElement("div", { className: 'FeatureContainer' },
            React.createElement("div", { className: 'AddReview-container' },
                React.createElement("h2", null,
                    "Review your experience with",
                    ' ',
                    React.createElement("span", { className: 'AddReview-name' }, busName)),
                React.createElement("form", { className: 'form', onSubmit: submitReview },
                    React.createElement("div", { className: 'form-group star-rating' }, __spreadArrays(Array(5)).map(function (star, index) {
                        index += 1;
                        return (React.createElement("button", { type: 'button', key: index, className: index <= (hover || rating)
                                ? 'btn-review on'
                                : 'btn-review off', onClick: function () { return setRating(index); }, onMouseEnter: function () { return setHover(index); }, onMouseLeave: function () { return setHover(rating); } },
                            React.createElement("span", { className: 'star' }, "\u2605")));
                    })),
                    React.createElement("div", { className: 'form-group' },
                        React.createElement("label", { htmlFor: 'comment' }),
                        React.createElement("textarea", { name: 'comment', className: 'form-control text-area', onChange: handleChange, value: comment })),
                    React.createElement("button", { onChange: handleChange, type: 'submit', className: 'btn--btn-primary add-review' }, "Submit"))))));
};
