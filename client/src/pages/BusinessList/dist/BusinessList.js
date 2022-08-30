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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BusinessList = void 0;
//* React Imports
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
//* Custom Imports
var Star_1 = require("../../UIElements/Star");
var LoadSpinner_1 = require("../../components/LoadSpinner/LoadSpinner");
var Card_1 = require("../../components/Card/Card");
var CardDetails_1 = require("../../components/Card/CardDetails/CardDetails");
var FilterServicesAndFeatures_1 = require("../../components/FilterServicesAndFeatures/FilterServicesAndFeatures");
//* Custom Styles
require("./BusinessList.css");
exports.BusinessList = function () {
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var city = react_router_dom_1.useParams().city;
    var _b = react_1.useState([]), list = _b[0], setList = _b[1];
    var getIsMobile = function () { return window.innerWidth <= 575; };
    //* Initialize Services and Features to State with full database data object
    var _c = react_1.useState([]), feats = _c[0], setFeats = _c[1];
    var _d = react_1.useState([]), services = _d[0], setServices = _d[1];
    //* Initialize Services and Features Arrays to State
    var _e = react_1.useState([]), featuresArr = _e[0], setFeaturesArr = _e[1];
    var _f = react_1.useState([]), servicesArr = _f[0], setServicesArr = _f[1];
    var _g = react_1.useState(getIsMobile), isMobile = _g[0], setIsMobile = _g[1];
    react_1.useEffect(function () {
        var onResize = function () {
            setIsMobile(getIsMobile);
        };
        window.addEventListener('resize', onResize);
        return function () {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, businessesList, filtered, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/businesses/get-businesses')];
                    case 1:
                        res = _a.sent();
                        setIsLoading(true);
                        return [4 /*yield*/, res.json()];
                    case 2:
                        businessesList = _a.sent();
                        if (typeof city !== 'undefined') {
                            filtered = businessesList.filter(function (business) {
                                return business.address.city
                                    .toLowerCase()
                                    .includes(city.toLowerCase());
                            });
                            setList(filtered);
                        }
                        else {
                            setList(businessesList);
                        }
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    // console.log('Business List', list)
    //* Fetch Features and Services from the database
    react_1.useEffect(function () {
        var fetchFeaturesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseData, featsArr, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/features', {
                                method: 'GET'
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _a.sent();
                        setFeats(responseData);
                        featsArr = responseData.map(function (el) {
                            var featsName = el.name;
                            var featsId = el._id;
                            var featsIsChecked = el.isChecked;
                            return [featsName, featsId, featsIsChecked];
                        });
                        setFeaturesArr(featsArr);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var fetchServicesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseData, servicesArr_1, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('/api/services', {
                                method: 'GET'
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _a.sent();
                        setServices(responseData);
                        servicesArr_1 = responseData.map(function (el) {
                            var servicesName = el.name;
                            var servicesId = el._id;
                            var servicesIsChecked = el.isChecked;
                            return [servicesName, servicesId, servicesIsChecked];
                        });
                        setServicesArr(servicesArr_1);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchFeaturesData();
        fetchServicesData();
    }, []);
    // console.log(`servicesArr`, servicesArr)
    // console.log(`featuresArr`, featuresArr)
    //* Initialize State Arrays to Filter Business Features and Services
    var _h = react_1.useState([]), filteredResults = _h[0], setFilteredResults = _h[1];
    var _j = react_1.useState([]), filteredFeats = _j[0], setFilteredFeats = _j[1];
    var _k = react_1.useState([]), filteredServices = _k[0], setFilteredServices = _k[1];
    // console.log(`filteredResults`, filteredResults)
    //* Listen for the features' and services' checkbox changes and capture that data from the `FilterServicesAndFeatures` child component
    var onFeatChange = function (feature) {
        setFilteredFeats(feature);
    };
    var onServiceChange = function (service) {
        setFilteredServices(service);
    };
    //* Filter Business by *All* User Selected Features and Services
    var handleFilteredResults = function () {
        var tempSelectedFeatsServices = [];
        //* Filter out elements that are only selected as true/checked and push those true objects to tempSelectedFeatsServices
        tempSelectedFeatsServices = __spreadArrays(filteredFeats, filteredServices).filter(function (tempFeatOrService) { return tempFeatOrService.isChecked; });
        if (tempSelectedFeatsServices.length > 0) {
            //* Filter out Businesses that do not have the selected Features and Services
            var filteredBusinesses = list.filter(function (businessObject) {
                //* Return an array of business Iterate through the Features and Services of each business
                var businessFeatAndService = __spreadArrays(businessObject.features, businessObject.services).map(function (businessFeatOrService) { return businessFeatOrService._id; });
                //* Iterate through, `tempSelectedFeatsServices`, the Features && Services of each business
                return tempSelectedFeatsServices.every(function (tempFeatOrService) {
                    //* If the business' Features && Service has the selected filter Features && Service `_id`, return true
                    return businessFeatAndService.includes(tempFeatOrService._id);
                });
            });
            // console.log(`🔇 -> filteredBusinesses`, filteredBusinesses)
            setFilteredResults(filteredBusinesses);
        }
        if (tempSelectedFeatsServices.length === 0) {
            setFilteredResults(function () {
                var newFilteredResults = __spreadArrays(list);
                return newFilteredResults;
            });
        }
    };
    react_1.useEffect(function () {
        //* Set `filteredResults` Business List
        setFilteredResults(function () {
            var newFilteredResults = __spreadArrays(list);
            return newFilteredResults;
        });
    }, [list, city]);
    // console.log(list, city, 'list, city')
    return (React.createElement("div", { className: 'BusinessList-Container_image FeatureContainer_image ' },
        React.createElement("main", { className: 'BusinessList-Container FeatureContainer' }, isLoading ? (React.createElement(LoadSpinner_1.LoadSpinner, null)) : !list.length || city == 'undefined' ? (React.createElement("div", { className: 'BusinessList-Header_errorMessage' },
            React.createElement("h1", null, "No businesses found. Please try another city."))) : (React.createElement(React.Fragment, null,
            React.createElement("h1", { className: 'BusinessList-Header' },
                city,
                " Businesses"),
            isMobile ? (React.createElement("div", { className: 'BusinessList-modal' },
                React.createElement("section", { className: 'BusinessList-FiltersContainer modal' },
                    React.createElement(FilterServicesAndFeatures_1.FilterServicesAndFeatures, { isLoading: isLoading, list: list, filteredResults: filteredResults, setFilteredResults: setFilteredResults, featuresArr: featuresArr, setFeaturesArr: setFeaturesArr, servicesArr: servicesArr, setServicesArr: setServicesArr, onFeatChange: onFeatChange, onServiceChange: onServiceChange, 
                        // isChecked={isChecked}
                        handleFilteredResults: handleFilteredResults })))) : (React.createElement("section", { className: 'BusinessList-FiltersContainer' },
                React.createElement(FilterServicesAndFeatures_1.FilterServicesAndFeatures, { isLoading: isLoading, list: list, filteredResults: filteredResults, setFilteredResults: setFilteredResults, featuresArr: featuresArr, setFeaturesArr: setFeaturesArr, servicesArr: servicesArr, setServicesArr: setServicesArr, onFeatChange: onFeatChange, onServiceChange: onServiceChange, 
                    // isChecked={isChecked}
                    handleFilteredResults: handleFilteredResults }))),
            React.createElement("section", { className: 'BusinessList-CardContainer' }, filteredResults && filteredResults.length > 0 ? (filteredResults === null || filteredResults === void 0 ? void 0 : filteredResults.map(function (business) { return (
            // <div key={`${business._id}_` + business.name} className='BusinessList-Card'>
            React.createElement(Card_1.Card, { className: 'BusinessCard List', key: business._id },
                React.createElement(react_router_dom_1.Link, { to: {
                        pathname: "/businesses/" + business._id
                    } },
                    React.createElement(CardDetails_1.CardDetails, { businessName: business.businessName, description: business.description, image: business.image, address: business.address })),
                React.createElement(Star_1.StarList, { stars: business.stars, reviews: business.reviews }))); })) : (React.createElement(React.Fragment, null,
                React.createElement("h2", { className: 'BusinessList-Header_errorMessage_noResults' }, "No businesses were found with the chosen services and or features."),
                React.createElement("br", null),
                React.createElement("h2", { className: 'BusinessList-Header_errorMessage_noResults' }, "Please change your selection and filter again.")))))))));
};
