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
exports.__esModule = true;
exports.AddBusiness = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
var axios_1 = require("axios");
var regions_1 = require("../constants/regions");
exports.AddBusiness = function () {
    var _a;
    // Initialize  Services and Features to state
    var _b = react_1.useState([]), feats = _b[0], setFeats = _b[1]; // Features full object
    var _c = react_1.useState([]), services = _c[0], setServices = _c[1]; // Services full object
    var _d = react_1.useState([]), featuresArr = _d[0], setFeaturesArr = _d[1];
    var _e = react_1.useState([]), servicesArr = _e[0], setServicesArr = _e[1];
    // Initialize state objects for form checkboxes
    var _f = react_1.useState(false), isChecked = _f[0], setIsChecked = _f[1];
    var _g = react_1.useState([]), isFeatsChecked = _g[0], setIsFeatsChecked = _g[1];
    var _h = react_1.useState([]), isServicesChecked = _h[0], setIsServicesChecked = _h[1];
    var _j = react_1.useState(true), loading = _j[0], setLoading = _j[1];
    react_1.useEffect(function () {
        var fetchFeaturesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseData, featsArr, err_1;
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
                        err_1 = _a.sent();
                        console.log(err_1);
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var fetchServicesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseData, servicesArr_1, err_2;
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
                        err_2 = _a.sent();
                        console.log(err_2);
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchFeaturesData();
        fetchServicesData();
    }, []);
    // console.log(servicesArr)
    // console.log(featuresArr)
    var _k = react_1.useState({
        name: '',
        description: '',
        image: '',
        street: '',
        postalCode: '',
        city: '',
        phone: ''
    }), formData = _k[0], setFormData = _k[1];
    var _l = react_1.useState('AB'), region = _l[0], setRegion = _l[1];
    var _m = react_1.useState('Canada'), country = _m[0], setCountry = _m[1];
    var history = react_router_dom_2.useHistory();
    var ownerId = JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false').result
        ._id;
    var handleChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleRegion = function (e) {
        setRegion(e.target.value);
    };
    var handleCountry = function (e) {
        setCountry(e.target.value);
    };
    var onFormChange = function (event) {
        var value = event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value;
    };
    var handleSubmit = function (e) {
        e.preventDefault();
    };
    var data = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        address: {
            street: formData.street,
            postalCode: formData.postalCode,
            city: formData.city,
            region: region,
            country: country
        },
        stars: 5,
        phone: formData.phone,
        ownerId: ownerId
    };
    axios_1["default"]
        .post('http://localhost:5000/api/businesses/add-business', data)
        .then(function (response) {
        // console.log(response.data)
        history.push('/');
    })["catch"](function (error) {
        console.log(error);
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: 'content-wrapper' },
            react_1["default"].createElement("div", { className: 'card w-50 mx-auto' },
                react_1["default"].createElement("div", { className: 'card-header' },
                    react_1["default"].createElement("h3", { className: 'card-title' }, "Add New Business")),
                react_1["default"].createElement("div", { className: 'card-body' },
                    react_1["default"].createElement("form", { onSubmit: handleSubmit },
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Name:"),
                            react_1["default"].createElement("input", { name: 'name', type: 'text', value: formData.name, className: 'form-control', placeholder: 'Enter business name', onChange: handleChange, required: true })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Description:"),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("textarea", { name: 'description', value: formData.description, className: 'form-control', placeholder: 'Enter business description', onChange: handleChange, required: true })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Phone:"),
                            react_1["default"].createElement("input", { name: 'phone', type: 'text', value: formData.phone, className: 'form-control', placeholder: 'Enter phone number', onChange: handleChange, required: true })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Image:"),
                            react_1["default"].createElement("input", { name: 'image', type: 'text', value: formData.image, className: 'form-control', placeholder: 'Enter image url', onChange: handleChange, required: true })),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement("h4", null, "Address"),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Street:"),
                            react_1["default"].createElement("input", { name: 'street', type: 'text', value: formData.street, className: 'form-control', placeholder: 'Enter street address', onChange: handleChange, required: true })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Postal Code:"),
                            react_1["default"].createElement("input", { name: 'postalCode', type: 'text', value: formData.postalCode, className: 'form-control', placeholder: 'Enter postal code', onChange: handleChange, required: true })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "City:"),
                            react_1["default"].createElement("input", { name: 'city', type: 'text', value: formData.city, className: 'form-control', placeholder: 'Enter city', onChange: handleChange, required: true })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Province / State:"),
                            react_1["default"].createElement("select", { className: 'custom-select rounded-0', onChange: handleRegion }, regions_1.regions.map(function (region) { return (react_1["default"].createElement("option", { value: region.value }, region.label)); }))),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", null, "Country:"),
                            react_1["default"].createElement("select", { className: 'custom-select rounded-0', onChange: handleCountry },
                                react_1["default"].createElement("option", { value: 'Canada' }, " Canada "),
                                react_1["default"].createElement("option", { value: 'United States' }, " United States"))),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", { htmlFor: 'features' }, "Features"), featuresArr === null || featuresArr === void 0 ? void 0 :
                            featuresArr.map(function (feature, index) { return (react_1["default"].createElement("div", { className: 'form-check', style: { textTransform: 'capitalize' }, key: feature + "_" + index },
                                react_1["default"].createElement("input", { className: 'form-check-input', type: 'checkbox', name: "feature-" + feature[0], id: feature[1], defaultChecked: feature[2], onChange: onFormChange }),
                                react_1["default"].createElement("label", { className: 'form-check-label', htmlFor: feature[1] }, feature[0]))); })),
                        react_1["default"].createElement("div", { className: 'form-group' },
                            react_1["default"].createElement("label", { htmlFor: 'services' }, "Services"), servicesArr === null || servicesArr === void 0 ? void 0 :
                            servicesArr.map(function (service, index) { return (react_1["default"].createElement("div", { className: 'form-check', style: { textTransform: 'capitalize' }, key: service + "_" + index },
                                react_1["default"].createElement("input", { className: 'form-check-input', type: 'checkbox', name: "service-" + service[0], id: service[1], defaultChecked: service[2], onChange: onFormChange }),
                                react_1["default"].createElement("label", { className: 'form-check-label', htmlFor: service[1] }, service[0]))); })),
                        react_1["default"].createElement("div", { className: 'card-footer' },
                            react_1["default"].createElement("button", { type: 'submit', className: 'btn btn-primary' }, "Add"),
                            ' ',
                            react_1["default"].createElement(react_router_dom_1.Link, { to: '/', className: 'btn btn-secondary' }, "Cancel"))))))));
};
