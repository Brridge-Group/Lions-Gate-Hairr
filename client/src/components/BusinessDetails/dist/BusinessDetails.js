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
exports.BusinessDetails = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var About_1 = require("./About/About");
var Book_1 = require("./Book");
var Review_1 = require("../Reviews/Review");
require("./BusinessDetails.css");
var MyBusinessReviews_1 = require("../MyBusinessReviews/MyBusinessReviews");
exports.BusinessDetails = function () {
    var _a = react_1.useState(), businessData = _a[0], setBusinessData = _a[1];
    var id = react_router_dom_1.useParams().id;
    // FETCHES BUSINESS DATA FROM REMOTE DATABSE ONCE AND SETS BUSINESSDATA STATE TO IT.
    react_1.useEffect(function () {
        var getBusinessData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, businessData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/businesses/get-business-by-id/" + id)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        businessData = _a.sent();
                        setBusinessData(businessData);
                        return [2 /*return*/];
                }
            });
        }); };
        getBusinessData();
    }, []);
    // CHECKS IF THE BUSINESSDATA STATE HAS VALUE. RENDERS THE BUSINESS PAGE IF IT DOES AND SETS A LOADING SCREEN IF IT DOESN'T.
    // THE FIRST RENDER WON'T HAVE DATA, SINCE USEEFFECT, WHICH GIVES THE STATE IT'S VALUE, RUNS AFTER THE FIRST RENDER.
    console.log('business details', businessData);
    return (React.createElement("div", { className: ' FeatureContainer_image Home' },
        React.createElement("div", { className: 'BusinessContainer' }, businessData ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'BusinessDetails-leftColumn' },
                React.createElement("h4", { className: 'sidebar-hed' },
                    React.createElement("label", { htmlFor: 'features' }, "Features")),
                React.createElement("ul", { className: 'BusinessDetails-ul' }, businessData.features.map(function (feature) { return (React.createElement("h5", { className: 'features' },
                    React.createElement("li", { key: feature._id }, feature.name))); })),
                React.createElement("h4", { className: 'sidebar-hed' },
                    React.createElement("label", { htmlFor: 'features' }, "Services")),
                React.createElement("ul", { className: 'BusinessDetails-ul' }, businessData.services.map(function (service) { return (React.createElement("h5", { className: 'services' },
                    React.createElement("li", { key: service._id }, service.name))); }))),
            React.createElement("div", { className: 'BusinessDetails-rightColumn' },
                React.createElement(About_1.About, { name: businessData.businessName, description: businessData.description, image: businessData.image, address: businessData.address }),
                React.createElement("div", { className: 'BusinessDetails-buttons' },
                    React.createElement(Review_1.Review, { id: id, stars: businessData.stars, ownerId: businessData.ownerId }),
                    React.createElement(Book_1.Book, { phone: businessData.phone, ownerId: businessData.ownerId })),
                React.createElement("div", { className: 'BusinessDetails_reviews' },
                    React.createElement("h4", null, "reviews"),
                    React.createElement(MyBusinessReviews_1.MyBusinessReviews, null))))) : (React.createElement("p", null, "Loading...")))));
};
