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
exports.Navbar = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var react_router_dom_2 = require("react-router-dom");
var jwt_decode_1 = require("jwt-decode");
var axios_1 = require("axios");
exports.Navbar = function () {
    var _a;
    var location = react_router_dom_1.useLocation();
    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false')), user = _b[0], setUser = _b[1];
    var _c = react_1.useState(), role = _c[0], setRole = _c[1];
    react_1.useEffect(function () {
        var _a;
        var token = user === null || user === void 0 ? void 0 : user.token;
        if (token) {
            var decodedToken = jwt_decode_1["default"](token);
            var isTokenExpired = decodedToken.exp * 1000 < new Date().getTime();
            // if (isTokenExpired) logout()
        }
        setUser(JSON.parse((_a = localStorage.getItem('profile')) !== null && _a !== void 0 ? _a : 'false'));
    }, [location]);
    var logout = function () {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser('false');
    };
    if (user) {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]
                            .get('http://localhost:5000/api/users' +
                            ("/get-profile/?id=" + user.result._id))
                            .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // setName(res.data.name)
                                setRole(res.data.role);
                                return [2 /*return*/];
                            });
                        }); })["catch"](function (error) { })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return (React.createElement("nav", { className: 'Navbar' },
        React.createElement("h4", { className: 'Navbar_logo' }, "LOGO"),
        React.createElement("ul", { className: 'NavbarList' },
            React.createElement("h4", null,
                React.createElement("li", { className: 'NavbarList_link' },
                    React.createElement(react_router_dom_2.NavLink, { to: '/', exact: true, activeStyle: { fontWeight: '400' } }, "Home")),
                !user ? (React.createElement(React.Fragment, null,
                    React.createElement("li", { className: 'NavbarList_link' },
                        React.createElement(react_router_dom_2.NavLink, { to: '/user-signup', activeStyle: { fontWeight: '400' } }, "Sign Up")),
                    React.createElement("li", { className: 'NavbarList_link' },
                        React.createElement(react_router_dom_2.NavLink, { to: '/user-signin', activeStyle: { fontWeight: '400' } }, "Sign In")))) : (React.createElement(React.Fragment, null,
                    React.createElement("li", { className: 'NavbarList_link' },
                        React.createElement(react_router_dom_2.NavLink, { to: '/profile', activeStyle: { fontWeight: '400' } }, "Profile")),
                    React.createElement("li", { className: 'NavbarList_link ' },
                        React.createElement(react_router_dom_2.NavLink, { to: '/', onClick: logout }, "Log Out"))))))));
};
