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
exports.EditBusiness = void 0;
// React Components
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_toastify_1 = require("react-toastify");
var BusinessImage_1 = require("../../UIElements/BusinessImage");
// Custom Imports
var regions_1 = require("../../constants/regions");
// 3rd Party Custom Imports
var axios_1 = require("axios");
require("../AddBusiness/AddBusiness.css");
require("../Auth/UserRegistration/UserRegistration.css");
exports.EditBusiness = function () {
    var history = react_router_dom_1.useHistory();
    var location = react_router_dom_1.useLocation();
    var business = location.state;
    // console.log('business', business)
    var _a = react_1.useState(null), image = _a[0], setImage = _a[1];
    var _b = react_1.useState([]), featuresArr = _b[0], setFeaturesArr = _b[1];
    var _c = react_1.useState([]), servicesArr = _c[0], setServicesArr = _c[1];
    var featuresArrTrue = business.features.map(function (bus) { return bus._id; });
    var _d = react_1.useState(__spreadArrays(featuresArrTrue)), featsSelection = _d[0], setFeatsSelection = _d[1];
    var onFeatCheck = function (featId) {
        if (featsSelection.includes(featId)) {
            setFeatsSelection(featsSelection.filter(function (v) { return v !== featId; }));
        }
        else {
            setFeatsSelection(__spreadArrays(featsSelection, [featId]));
        }
    };
    // console.log(featsSelection, 'featsSelection')
    var servicesArrTrue = business.services.map(function (bus) { return bus._id; });
    var _e = react_1.useState(__spreadArrays(servicesArrTrue)), servicesSelection = _e[0], setServicesSelection = _e[1];
    var onServicesCheck = function (serviceId) {
        if (servicesSelection.includes(serviceId)) {
            setServicesSelection(servicesSelection.filter(function (v) { return v !== serviceId; }));
        }
        else {
            setServicesSelection(__spreadArrays(servicesSelection, [serviceId]));
        }
    };
    // console.log(servicesSelection, 'servicesSelection')
    react_1.useEffect(function () {
        var featuresArrTrue = business.features.map(function (bus) { return bus._id; });
        var fetchFeaturesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseData, featsArr, i, j, err_1;
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
                        featsArr = responseData.map(function (el) {
                            var featsName = el.name;
                            var featsId = el._id;
                            var featsIsChecked = el.isChecked;
                            return [featsName, featsId, featsIsChecked];
                        });
                        for (i = 0; i < featsArr.length; i++) {
                            for (j = 0; j < featuresArrTrue.length; j++) {
                                if (featsArr[i][1] === featuresArrTrue[j]) {
                                    featsArr[i][2] = true;
                                }
                            }
                        }
                        setFeaturesArr(featsArr);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var servicesArrTrue = business.services.map(function (bus) { return bus._id; });
        var fetchServicesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseData, servicesArr_1, i, j, err_2;
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
                        servicesArr_1 = responseData.map(function (el) {
                            var servicesName = el.name;
                            var servicesId = el._id;
                            var servicesIsChecked = el.isChecked;
                            return [servicesName, servicesId, servicesIsChecked];
                        });
                        for (i = 0; i < servicesArr_1.length; i++) {
                            for (j = 0; j < servicesArrTrue.length; j++) {
                                if (servicesArr_1[i][1] === servicesArrTrue[j]) {
                                    servicesArr_1[i][2] = true;
                                }
                            }
                        }
                        setServicesArr(servicesArr_1);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchFeaturesData();
        fetchServicesData();
    }, []);
    var _f = react_1.useState({
        businessName: business.businessName,
        description: business.description,
        image: business.image,
        email: business.email,
        address: {
            address1: business.address1,
            address2: business.address2,
            postalCode: business.postalCode,
            city: business.cityTown,
            region: business.region,
            country: business.country
        },
        phone: business.phone
    }), formData = _f[0], setFormData = _f[1];
    var onImageChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var maxFileSize, file_1, base64;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!(e.target.files && e.target.files[0])) return [3 /*break*/, 5];
                    maxFileSize = 2097067 // 2 mb
                    ;
                    file_1 = e.target.files[0];
                    if (!file_1.type.match('image.*')) return [3 /*break*/, 4];
                    if (!(file_1.size > maxFileSize)) return [3 /*break*/, 1];
                    react_toastify_1.toast.error("The selected image file size, " + file_1.size + "kb, is too large. Please upload an image that is less than 2 mb.");
                    return [3 /*break*/, 3];
                case 1:
                    setImage(URL.createObjectURL(file_1));
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var _a;
                                resolve((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                            };
                            reader.readAsDataURL(file_1);
                        })];
                case 2:
                    base64 = (_b.sent());
                    setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = base64, _a)));
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    react_toastify_1.toast.error('Error: file is not a image. It should be png/jpeg file.');
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var onFormFirstChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var onFormChange = function (address) { return function (e) {
        var _a, _b;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[address] = __assign(__assign({}, formData[address]), (_b = {}, _b[e.target.name] = e.target.value, _b)), _a)));
    }; };
    var saveEditedBusiness = function () {
        var editedBusiness = __assign(__assign({}, formData), { features: featsSelection, services: servicesSelection });
        console.log('editedBusiness', editedBusiness);
        axios_1["default"]
            .patch("/api/businesses/" + business._id, editedBusiness)
            .then(function (response) {
            console.log(response.data);
            history.goBack();
        })["catch"](function (error) {
            console.log(error);
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        saveEditedBusiness();
    };
    return (react_1["default"].createElement("div", { className: 'FeatureContainer_image AddBusiness' },
        react_1["default"].createElement("div", { className: 'FeatureContainer' },
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: 'AddBusiness_inputGroup' },
                react_1["default"].createElement("div", { className: 'AddBusiness_scroll' },
                    react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body' },
                        react_1["default"].createElement(BusinessImage_1["default"], { pic: image, name: 'profile-picture', handleChange: onImageChange }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'businessName' }, "Business Name")),
                        react_1["default"].createElement("input", { name: 'businessName', type: 'text', value: formData.businessName, className: 'UserRegistration_input', onChange: onFormFirstChange, required: true }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'description' }, "Description")),
                        react_1["default"].createElement("textarea", { name: 'description', value: formData.description, className: 'UserRegistration_input', onChange: onFormFirstChange, required: true }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'email' }, "Email")),
                        react_1["default"].createElement("input", { name: 'email', type: 'email', value: formData.email, className: 'UserRegistration_input', onChange: onFormFirstChange, required: true }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'address1' }, "Address Line 1")),
                        react_1["default"].createElement("input", { name: 'address1', type: 'text', value: formData.address.address1, className: 'UserRegistration_input color', onChange: onFormChange('address'), 
                            // onChange={handleInputChanges('location')} // location object
                            required: true }),
                        react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body_columns' },
                            react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body_left' },
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'city' }, "City / Town")),
                                react_1["default"].createElement("input", { name: 'city', type: 'text', value: formData.address.city, className: 'UserRegistration_input color', onChange: onFormChange('address'), required: true }),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'region' }, "Province / State")),
                                react_1["default"].createElement("select", { className: 'UserRegistration_input color', onChange: onFormChange('address'), name: 'region', value: formData.address.region, id: 'region' }, regions_1.regions.map(function (region) { return (react_1["default"].createElement("option", { value: region.value }, region.label)); })),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'phone' }, "Phone Number")),
                                react_1["default"].createElement("input", { name: 'phone', type: 'text', value: formData.phone, className: 'UserRegistration_input color', onChange: onFormFirstChange, required: true })),
                            react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body_right' },
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'address2' }, "Address Line 2")),
                                react_1["default"].createElement("input", { name: 'address2', type: 'text', value: formData.address.address2, className: 'UserRegistration_input color', onChange: onFormChange('address') }),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: '' }, "Postal Code")),
                                react_1["default"].createElement("input", { name: 'postalCode', type: 'text', value: formData.address.postalCode, className: 'UserRegistration_input color', onChange: onFormChange('address'), required: true }),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'country' }, "Country:")),
                                react_1["default"].createElement("select", { className: 'UserRegistration_input color', onChange: onFormChange('address'), name: 'country', value: formData.address.country, id: 'country' },
                                    react_1["default"].createElement("option", { value: 'Canada' }, " Canada "),
                                    react_1["default"].createElement("option", { value: 'United States' }, " United States")))))),
                react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_sidebar' },
                    react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_filtersContainer' },
                        react_1["default"].createElement("h4", { className: 'sidebar-hed' },
                            react_1["default"].createElement("label", { htmlFor: 'features' }, "Features")),
                        react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_filtersContainer_formGroup' }, featuresArr === null || featuresArr === void 0 ? void 0 : featuresArr.map(function (feature, index) { return (react_1["default"].createElement("div", { key: feature + "_" + index },
                            react_1["default"].createElement("h5", { style: {
                                    display: 'flex',
                                    marginTop: '10px',
                                    marginBottom: '5px',
                                    alignItems: 'flex-start'
                                } },
                                react_1["default"].createElement("input", { type: 'checkbox', name: "feature-" + feature[0], id: feature[1], defaultChecked: feature[2], onChange: function () { return onFeatCheck(feature[1]); } }),
                                react_1["default"].createElement("label", { htmlFor: feature[1] }, feature[0])))); })),
                        react_1["default"].createElement("h4", { className: 'sidebar-hed' },
                            react_1["default"].createElement("label", { htmlFor: 'features' }, "Services")),
                        react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_filtersContainer_formGroup' }, servicesArr === null || servicesArr === void 0 ? void 0 : servicesArr.map(function (service, index) { return (react_1["default"].createElement("div", { key: service + "_" + index },
                            react_1["default"].createElement("h5", { style: {
                                    display: 'flex',
                                    marginTop: '10px',
                                    marginBottom: '5px',
                                    alignItems: 'flex-start'
                                } },
                                react_1["default"].createElement("input", { type: 'checkbox', name: "service-" + service[0], id: service[1], defaultChecked: service[2], onChange: function () { return onServicesCheck(service[1]); } }),
                                react_1["default"].createElement("label", { htmlFor: service[1] }, service[0])))); }))),
                    react_1["default"].createElement("button", { type: 'submit', className: 'btn--btn-primary', style: { paddingTop: '0px' } }, "submit"))))));
};
