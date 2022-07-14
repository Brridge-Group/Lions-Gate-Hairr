"use strict";
exports.__esModule = true;
exports.Book = void 0;
var react_1 = require("react");
exports.Book = function (props) {
    var _a = react_1.useState(false), showPhoneNumber = _a[0], setShowPhoneNumber = _a[1];
    var phoneNumber = "(" + props.phone.slice(0, 3) + ") " + props.phone.slice(3, 6) + "-" + props.phone.slice(6);
    var phoneNumberButtonClickHandler = function () {
        setShowPhoneNumber(true);
    };
    var BookButton = (React.createElement("button", { onClick: phoneNumberButtonClickHandler, className: 'btn--btn-primary review book' }, "Book Now"));
    return (React.createElement(React.Fragment, null, showPhoneNumber ? (React.createElement("p", { className: 'phoneNumber' }, phoneNumber)) : (BookButton)));
};
