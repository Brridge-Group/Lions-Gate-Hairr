"use strict";
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
exports.__esModule = true;
exports.Profile = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Star_1 = require("../../UIElements/Star");
var LoadSpinner_1 = require("../../components/LoadSpinner/LoadSpinner");
require("./Profile.css");
var axios_1 = require("axios");
exports.Profile = function () {
    var history = react_router_dom_1.useHistory();
    var _a = JSON.parse(localStorage.getItem('profile') || 'false').result, role = _a.role, _id = _a._id, name = _a.name, imageProfile = _a.imageProfile, reviews = _a.reviews;
    var token = JSON.parse(localStorage.getItem('profile') || 'false').token;
    var _b = react_1.useState([]), userReview = _b[0], getUserReview = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    react_1.useEffect(function () {
        var fetchReviews = function () {
            Promise.all(reviews.map(function (review) { return axios_1["default"].get("api/reviews/" + review); })).then(function (data) { return getUserReview(data); });
        };
        fetchReviews();
        setLoading(false);
    }, []);
    var deleteReview = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                axios_1["default"]["delete"]("api/reviews/" + id, { data: { profileId: _id } })
                    .then(function (res) {
                    window.localStorage.removeItem('profile');
                    var result = res.data.result;
                    var userModified = {
                        result: result,
                        token: token
                    };
                    window.localStorage.setItem('profile', JSON.stringify(userModified));
                });
                history.push('/');
                alert('Deleted review.');
            }
            catch (error) {
                console.log('error in delete review');
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: 'FeatureContainer_image User' },
        React.createElement("div", { className: 'FeatureContainer' },
            React.createElement("div", { className: 'Profile_user' },
                React.createElement("h1", { className: 'Profile_name' },
                    "Hello ",
                    name,
                    "!"),
                React.createElement("div", { className: 'Profile-UserContainer ' }, loading || !userReview.length ? (React.createElement(LoadSpinner_1.LoadSpinner, null)) : (React.createElement(React.Fragment, null,
                    React.createElement("img", { src: imageProfile || 'https://imgur.com/LDpwLVZ.jpg', alt: name + '_profilePicture', className: 'Profile-UserContainer_pic' }),
                    React.createElement("div", { className: 'Profile-UserContainer_reviews' },
                        React.createElement("h4", null, "your reviews"),
                        React.createElement("ul", { className: 'Profile_User_reviews' }, !loading &&
                            userReview.map(function (r) { return (React.createElement("li", { key: r._id, className: 'Profile_reviews' },
                                React.createElement("div", { className: 'column-left' },
                                    React.createElement("img", { src: r.data.review.business.image, alt: '' }),
                                    React.createElement("div", { className: 'review-btns' },
                                        React.createElement(react_router_dom_1.Link, { to: {
                                                pathname: "/reviews/" + r.data.review._id + "/edit-review",
                                                state: r.data.review
                                            } },
                                            ' ',
                                            React.createElement("h6", { className: 'btn--btn-primary reviews' }, "edit")),
                                        React.createElement("button", { className: 'btn--btn-primary reviews delete', onClick: function () { return deleteReview(r.data.review._id); } }, "delete"))),
                                React.createElement("div", { className: 'column-right' },
                                    React.createElement(react_router_dom_1.Link, { to: "/businesses/" + r.data.review.business._id },
                                        React.createElement("h2", null, r.data.review.business.businessName),
                                        React.createElement("h5", null, r.data.review.business.address.city),
                                        React.createElement(Star_1.StarSmall, { stars: r.data.review.rating }),
                                        React.createElement("h5", null, r.data.review.comment))))); })))))),
                React.createElement("div", { className: 'Profile_links' },
                    React.createElement(react_router_dom_1.Link, { to: "users/" + _id },
                        React.createElement("h6", { className: 'btn--btn-primary' }, "update profile")),
                    React.createElement(react_router_dom_1.Link, { to: '/add-business' },
                        ' ',
                        React.createElement("h6", { className: 'btn--btn-primary twoLines' }, "become an owner")))))));
};
