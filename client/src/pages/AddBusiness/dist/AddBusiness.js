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
// React Components
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_toastify_1 = require("react-toastify");
var BusinessImage_1 = require("../../UIElements/BusinessImage");
// Custom Imports
var regions_1 = require("../../constants/regions");
// 3rd Party Custom Imports
var axios_1 = require("axios");
require("./AddBusiness.css");
require("../Auth/UserRegistration/UserRegistration.css");
// Custom Styles
exports.AddBusiness = function () {
    var _a;
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(null), image = _c[0], setImage = _c[1];
    // Initialize  Services and Features to state
    var _d = react_1.useState([]), feats = _d[0], setFeats = _d[1]; // Features full object
    var _e = react_1.useState([]), services = _e[0], setServices = _e[1]; // Services full object
    var _f = react_1.useState([]), featuresArr = _f[0], setFeaturesArr = _f[1];
    var _g = react_1.useState([]), servicesArr = _g[0], setServicesArr = _g[1];
    // Initialize state objects for form checkboxes
    var _h = react_1.useState(false), isChecked = _h[0], setIsChecked = _h[1];
    var _j = react_1.useState([]), isFeatsChecked = _j[0], setIsFeatsChecked = _j[1];
    var _k = react_1.useState([]), isServicesChecked = _k[0], setIsServicesChecked = _k[1];
    // Fetch Services and Features from Database API Endpoint
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
    var _l = react_1.useState({
        businessName: '',
        description: '',
        email: '',
        address1: '',
        address2: '',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        cityTown: '',
        postalCode: '',
        phone: ''
    }), formData = _l[0], setFormData = _l[1];
    var _m = react_1.useState('AB'), region = _m[0], setRegion = _m[1];
    var _o = react_1.useState('Canada'), country = _o[0], setCountry = _o[1];
    var history = react_router_dom_1.useHistory();
    var ownerId = JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false').result
        ._id;
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
    var onFormChange = function (e) {
        var _a, _b, _c, _d;
        var value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        // Evaluate to determine if checkbox is checked and if is it a service or feature
        if (e.target.type === 'checkbox') {
            setIsChecked(__assign(__assign({}, isChecked), (_a = {}, _a[e.target.name] = value, _a)));
            if (e.target.name.includes('service')) {
                setIsServicesChecked(__assign(__assign({}, isServicesChecked), (_b = {}, _b[e.target.id] = value, _b)));
            }
            if (e.target.name.includes('feature')) {
                setIsFeatsChecked(__assign(__assign({}, isFeatsChecked), (_c = {}, _c[e.target.id] = value, _c)));
            }
        }
        console.log(value);
        setFormData(__assign(__assign({}, formData), (_d = {}, _d[e.target.name] = e.target.value, _d)));
    };
    // Save to the businesses collection database all features and services set to true.
    var savedFormFeats = Object.entries(isFeatsChecked)
        .map(function (key) {
        if (key[1] === true) {
            return [key[0]];
        }
    })
        .filter(function (el) {
        if (el !== undefined) {
        }
        return el;
    });
    var savedFormServices = Object.entries(isServicesChecked)
        .map(function (key) {
        if (key[1] === true) {
            return [key[0]];
        }
    })
        .filter(function (el) {
        if (el !== undefined) {
        }
        return el;
    });
    var handleRegion = function (e) {
        setRegion(e.target.value);
    };
    var handleCountry = function (e) {
        setCountry(e.target.value);
    };
    // Initialize business profile form state object
    var data = {
        businessName: formData.businessName,
        description: formData.description,
        image: formData.image === ' '
            ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
            : formData.image,
        email: formData.email,
        address: {
            address1: formData.address1,
            address2: formData.address2,
            postalCode: formData.postalCode,
            city: formData.cityTown,
            region: region,
            country: country
        },
        stars: 0,
        phone: formData.phone,
        ownerId: ownerId
    };
    var saveNewBusiness = function () {
        // Add FeaturesArray and ServicesArray to data business form state object
        var newBusiness = __assign(__assign({}, data), { features: savedFormFeats, services: savedFormServices });
        axios_1["default"]
            .post('http://localhost:5000/api/businesses/add-business', newBusiness)
            .then(function (response) {
            console.log(response.data);
            history.push('/');
        })["catch"](function (error) {
            console.log(error);
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        saveNewBusiness();
    };
    return (react_1["default"].createElement("div", { className: 'FeatureContainer_image AddBusiness' },
        react_1["default"].createElement("div", { className: 'FeatureContainer' },
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: 'AddBusiness_inputGroup' },
                react_1["default"].createElement("div", { className: 'AddBusiness_scroll' },
                    react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body' },
                        react_1["default"].createElement(BusinessImage_1["default"], { pic: image, name: 'profile-picture', handleChange: onImageChange }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'businessName' }, "Business Name")),
                        react_1["default"].createElement("input", { name: 'businessName', type: 'text', value: formData.businessName, className: 'UserRegistration_input', onChange: onFormChange, required: true }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'description' }, "Description")),
                        react_1["default"].createElement("textarea", { name: 'description', value: formData.description, className: 'UserRegistration_input', onChange: onFormChange, required: true }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'email' }, "Email")),
                        react_1["default"].createElement("input", { name: 'email', type: 'email', value: formData.email, className: 'UserRegistration_input', onChange: onFormChange, required: true }),
                        react_1["default"].createElement("h5", null,
                            react_1["default"].createElement("label", { htmlFor: 'address1' }, "Address Line 1")),
                        react_1["default"].createElement("input", { name: 'address1', type: 'text', value: formData.address1, className: 'UserRegistration_input color', onChange: onFormChange, required: true }),
                        react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body_columns' },
                            react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body_left' },
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'cityTown' }, "City / Town")),
                                react_1["default"].createElement("input", { name: 'cityTown', type: 'text', value: formData.cityTown, className: 'UserRegistration_input color', onChange: onFormChange, required: true }),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'region' }, "Province / State")),
                                react_1["default"].createElement("select", { className: 'UserRegistration_input color', onChange: handleRegion, name: 'region', id: 'region' }, regions_1.regions.map(function (region) { return (react_1["default"].createElement("option", { value: region.value }, region.label)); })),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'phone' }, "Phone Number")),
                                react_1["default"].createElement("input", { name: 'phone', type: 'text', value: formData.phone, className: 'UserRegistration_input color', onChange: onFormChange, required: true })),
                            react_1["default"].createElement("div", { className: 'AddBusiness-FormCard_body_right' },
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'address2' }, "Address Line 2")),
                                react_1["default"].createElement("input", { name: 'address2', type: 'text', value: formData.address2, className: 'UserRegistration_input color', onChange: onFormChange }),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: '' }, "Postal Code")),
                                react_1["default"].createElement("input", { name: 'postalCode', type: 'text', value: formData.postalCode, className: 'UserRegistration_input color', onChange: onFormChange, required: true }),
                                react_1["default"].createElement("h5", null,
                                    react_1["default"].createElement("label", { htmlFor: 'country' }, "Country:")),
                                react_1["default"].createElement("select", { className: 'UserRegistration_input color', onChange: handleCountry, name: 'country', id: 'country' },
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
                                react_1["default"].createElement("input", { type: 'checkbox', name: "feature-" + feature[0], id: feature[1], defaultChecked: feature[2], onChange: onFormChange }),
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
                                react_1["default"].createElement("input", { type: 'checkbox', name: "service-" + service[0], id: service[1], defaultChecked: service[2], onChange: onFormChange }),
                                react_1["default"].createElement("label", { htmlFor: service[1] }, service[0])))); }))),
                    react_1["default"].createElement("button", { type: 'submit', className: 'btn--btn-primary', style: { paddingTop: '0px' } }, "submit"))))));
};
