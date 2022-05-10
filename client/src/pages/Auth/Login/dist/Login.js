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
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var actionTypes_1 = require("../../../constants/actionTypes");
var api = require("../../../api/index");
require("./Login.css");
var initialState = {
    email: '',
    password: ''
};
var Login = function () {
    var _a = react_1.useState(initialState), formData = _a[0], setFormData = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var _b = react_1.useState(''), errorMsg = _b[0], setErrorMsg = _b[1];
    var login = function (formData, history, errorM) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api.signIn(formData)];
                case 1:
                    data = (_a.sent()).data;
                    dispatch({ type: actionTypes_1.LOGIN, data: data });
                    history.push('/');
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    errorM = err_1.response.data;
                    console.log(errorM);
                    setErrorMsg(errorM);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }; };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            dispatch(login(formData, history));
            return [2 /*return*/];
        });
    }); };
    var handleChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    return (React.createElement("div", { className: ' FeatureContainer_image Login' },
        React.createElement("div", { className: 'FeatureContainer' },
            React.createElement("div", { className: 'Login_inputGroup' },
                React.createElement("form", { onSubmit: handleSubmit, className: 'Login_form' },
                    React.createElement("h5", null,
                        React.createElement("label", null, "Email")),
                    React.createElement("input", { name: 'email', onChange: handleChange, type: 'email', className: 'Login_input', autoFocus: true }),
                    React.createElement("h5", null,
                        React.createElement("label", null, "Password")),
                    React.createElement("input", { name: 'password', type: 'Password', onChange: handleChange, className: 'Login_input' }),
                    React.createElement("br", null),
                    errorMsg && React.createElement("p", { style: { color: 'grey' } },
                        " ",
                        errorMsg,
                        " "),
                    React.createElement("button", { type: 'submit', className: 'Login btn--btn-primary' }, "Sign In"),
                    React.createElement("p", { style: { fontWeight: '300' } },
                        "Don't have an account?",
                        ' ',
                        React.createElement(react_router_dom_1.NavLink, { to: 'user-signup', style: { fontWeight: '500', color: 'black' } },
                            "Click Here",
                            ' '),
                        "to Sign Up"))))));
};
exports["default"] = Login;
