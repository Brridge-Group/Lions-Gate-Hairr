"use strict";
exports.__esModule = true;
exports.TestChildren = void 0;
var react_1 = require("react");
exports.TestChildren = function (props) {
    console.log(props, 'props');
    return react_1["default"].createElement("div", null, props.children);
};
