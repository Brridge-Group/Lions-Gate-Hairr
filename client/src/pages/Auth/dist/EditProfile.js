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
exports.EditProfile = void 0;
var react_1 = require("react");
var UserImage_1 = require("../../UIElements/UserImage");
var VisibilityRounded_1 = require("@material-ui/icons/VisibilityRounded");
var VisibilityOffRounded_1 = require("@material-ui/icons/VisibilityOffRounded");
var Input_1 = require("@material-ui/core/Input");
var InputAdornment_1 = require("@material-ui/core/InputAdornment");
var IconButton_1 = require("@material-ui/core/IconButton");
var react_toastify_1 = require("react-toastify");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var actionTypes_1 = require("../../constants/actionTypes");
var api = require("../../api/index");
require("./UserRegistration.css");
require("../Profile/Profile.css");
require("react-toastify/dist/ReactToastify.css");
require('dotenv').config();
react_toastify_1.toast.configure();
exports.EditProfile = function () {
    var _a = react_1.useState({
        imageProfile: 'https://imgur.com/LDpwLVZ.jpg'
    }), userData = _a[0], setUserData = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var _b = react_1.useState(''), errorMsg = _b[0], setErrorMsg = _b[1];
    var _c = react_1.useState(''), firstName = _c[0], setFirstName = _c[1];
    var _d = react_1.useState(''), lastName = _d[0], setLastName = _d[1];
    var _e = react_1.useState(''), email = _e[0], setEmail = _e[1];
    var _f = react_1.useState(''), password = _f[0], setPassword = _f[1];
    var _g = react_1.useState(''), confirmPassword = _g[0], setConfirmPassword = _g[1];
    var _h = react_1.useState(false), showPassword = _h[0], setShowPassword = _h[1];
    var _j = react_1.useState(null), image = _j[0], setImage = _j[1];
    var _k = react_1.useState(''), isRole = _k[0], setIsRole = _k[1];
    react_1.useEffect(function () {
        var _a;
        var user = JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false');
        console.log(user);
        setFirstName(user.result.name.split(' ')[0]);
        setLastName(user.result.name.split(' ')[1]);
        setEmail(user.result.email);
        setImage(user.result.imageProfile);
        setIsRole(user.result.role);
    }, []);
    var updateUser = function (formData, history, errorM) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.updateUser(userData)];
                case 1:
                    data = (_a.sent()).data;
                    dispatch({ type: actionTypes_1.UPDATE, data: data });
                    history.push('/users');
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    errorM = err_1.response.data;
                    setErrorMsg(errorM);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }; };
    var toggleShow = function () {
        setShowPassword(!showPassword);
    };
    var handleMouseDownPassword = function (event) {
        event.preventDefault();
    };
    var onImageChange = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!event.target.files[0]) return [3 /*break*/, 4];
                    if (!event.target.files[0].type.match('image')) return [3 /*break*/, 2];
                    setImage(URL.createObjectURL(event.target.files[0]));
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var _a;
                                resolve((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                            };
                            reader.readAsDataURL(event.target.files[0]);
                        })];
                case 1:
                    base64 = (_a.sent());
                    setUserData(__assign(__assign({}, userData), { imageProfile: base64 }));
                    return [3 /*break*/, 3];
                case 2:
                    react_toastify_1.toast('Image type error, it should be png/jpeg.');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    react_toastify_1.toast('Unknown.');
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) {
        e.preventDefault();
        var name = { name: firstName + ' ' + lastName, email: email };
        var merge = __assign(__assign({}, name), userData);
        console.log('merge', merge);
        setUserData(merge);
        console.log('in handle submit, userData', userData);
        dispatch(updateUser(userData, history));
    };
    var handleChange = function (e) {
        var _a;
        setUserData(__assign(__assign({}, userData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'FeatureContainer_image User' },
            React.createElement("div", { className: 'FeatureContainer' },
                React.createElement("div", { className: 'UserRegistration_inputGroup' },
                    React.createElement("form", { className: 'UserRegistration_form', onSubmit: handleSubmit },
                        React.createElement(UserImage_1["default"], { pic: image, name: 'Sergio', handleChange: onImageChange }),
                        React.createElement("h5", null,
                            React.createElement("label", null, "First Name")),
                        React.createElement("input", { name: 'firstName', value: firstName, onChange: function (e) { return setFirstName(e.target.value); }, autoFocus: true, className: 'UserRegistration_input' }),
                        React.createElement("h5", null,
                            React.createElement("label", null, "Last Name")),
                        React.createElement("input", { name: 'lastName', value: lastName, onChange: function (e) { return setLastName(e.target.value); }, className: 'UserRegistration_input' }),
                        React.createElement("h5", null,
                            React.createElement("label", null, "Email")),
                        React.createElement("input", { name: 'email', onChange: function (e) { return setEmail(e.target.value); }, value: email, className: 'UserRegistration_input' }),
                        React.createElement("h5", null,
                            React.createElement("label", null, "New Password")),
                        React.createElement(Input_1["default"], { name: 'password', type: showPassword ? 'text' : 'password', onChange: function (e) { return setPassword(e.target.value); }, className: 'UserRegistration_input', endAdornment: React.createElement(InputAdornment_1["default"], { position: 'end' },
                                React.createElement(IconButton_1["default"], { onClick: toggleShow, onMouseDown: handleMouseDownPassword }, showPassword ? (React.createElement(VisibilityRounded_1["default"], null)) : (React.createElement(VisibilityOffRounded_1["default"], null)))) }),
                        React.createElement("h5", null,
                            React.createElement("label", null, "Confirm Password")),
                        React.createElement(Input_1["default"], { name: 'confirmPassword', className: 'UserRegistration_input', type: showPassword ? 'text' : 'password', onChange: function (e) { return setConfirmPassword(e.target.value); } }),
                        React.createElement("div", { className: 'UserRegistration_radioButtons' },
                            React.createElement("h5", { className: 'UserRegistration_radio' },
                                React.createElement("input", { type: 'radio', name: 'role', value: 'user', checked: isRole === 'user', onChange: function (e) { return setIsRole(e.target.value); } }),
                                "User"),
                            React.createElement("h5", { className: 'UserRegistration_radio' },
                                React.createElement("input", { type: 'radio', name: 'role', value: 'owner', onChange: function (e) { return setIsRole(e.target.value); }, checked: isRole === 'owner' }),
                                "Owner")),
                        React.createElement("button", { type: 'submit', className: 'UserRegistration_submit' },
                            React.createElement("h6", { className: 'btn--btn-primary' }, "Update Profile")),
                        React.createElement("br", null),
                        errorMsg && React.createElement("p", { style: { color: 'grey' } },
                            " ",
                            errorMsg,
                            " ")))))));
};
