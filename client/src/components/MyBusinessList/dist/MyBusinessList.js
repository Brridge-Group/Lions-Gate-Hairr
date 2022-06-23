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
exports.MyBusinessList = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Star_1 = require("../../UIElements/Star");
var About_1 = require("../BusinessDetails/About/About");
require("../../pages/Profile/Profile.css");
require("./MyBusinessList.css");
var BusinessReviews_1 = require("../BusinessReviews/BusinessReviews");
var LoadSpinner_1 = require("../LoadSpinner/LoadSpinner");
exports.MyBusinessList = function () {
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState([]), list = _a[0], setList = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(false), toggle = _c[0], setToggle = _c[1];
    var _d = react_1.useState(list.map(function (element) { return true; })), show = _d[0], setShow = _d[1];
    var user = JSON.parse(localStorage.getItem('profile') || 'false').result;
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, businessesList, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("/api/businesses/get-business-by-ownersId/?id=" + user._id)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        businessesList = _a.sent();
                        setList(businessesList);
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    console.log('in my bus list,list', list);
    var menuBus = toggle ? 'menu-business open' : 'menu-business';
    // const showNumber = list.map((l, i) => i)
    var showNumber = list.map(function (l, i) { return i; });
    var toggleIt = function (idx) {
        // showNumber.map(i => {å
        console.log(showNumber, 'i, id, toggleit, showNumber');
        // if (id === showNumber) {
        // if (showNumber == idx) {
        setToggle(!toggle);
        // }
        //FIX THIS only toggle above idx
        // })
    };
    //   hideShow = (index) => {
    //     const newShowStatus = [...this.state.show];
    //     newShowStatus[index] = !this.state.show[index];
    //     this.setState({show: newShowStatus});
    // }
    console.log('in business list, list', list);
    return (React.createElement("div", { className: 'Profile_user' },
        React.createElement("h1", { className: 'Profile_name' },
            "Hello ",
            user.name,
            "!"),
        React.createElement("div", { className: 'Profile-UserContainer Owner' }, loading ? (React.createElement(LoadSpinner_1.LoadSpinner, null)) : !list.length ? (React.createElement("div", { className: 'Profile-UserContainer_reviews business' },
            React.createElement("h4", null, "no businesses found"))) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'Profile-UserContainer_reviews business' },
                React.createElement("h4", null, "Your businesses"),
                React.createElement("div", { className: 'BusinessCard-container' },
                    list.map(function (business, idx) { return (React.createElement("div", { className: 'BusinessCard ', key: business._id },
                        React.createElement(About_1.About, { name: business.businessName, description: business.description, image: business.image, address: business.address }),
                        React.createElement(Star_1.Star, { stars: business.stars }),
                        React.createElement("div", { className: 'BusinessCard-buttons' },
                            React.createElement("h6", { className: 'btn--btn-primary twoLines business reviews', 
                                // onClick={() => toggleIt(business._id)}
                                onClick: function () { return toggleIt(idx); }, "data-idx": idx, id: business._id }, !toggle ? 'read reviews' : 'close reviews'),
                            React.createElement(react_router_dom_1.Link, { to: '#' },
                                React.createElement("h6", { className: 'btn--btn-primary twoLines business' },
                                    "edit ",
                                    React.createElement("br", null),
                                    "business")),
                            React.createElement(react_router_dom_1.Link, { to: '#' },
                                React.createElement("h6", { className: 'btn--btn-primary twoLines business' }, "delete business"))),
                        React.createElement("div", { className: menuBus },
                            React.createElement(BusinessReviews_1.BusinessReviews, { reviews: business.reviews })))); }),
                    ' '))))),
        React.createElement("div", { className: 'Profile_links' },
            React.createElement(react_router_dom_1.Link, { to: "/users/" + user._id },
                ' ',
                React.createElement("h6", { className: 'btn--btn-primary' }, "update profile"),
                ' '),
            React.createElement(react_router_dom_1.Link, { to: '/add-business' },
                ' ',
                React.createElement("h6", { className: 'btn--btn-primary twoLines' },
                    "add a",
                    React.createElement("br", null),
                    " business")))));
};
