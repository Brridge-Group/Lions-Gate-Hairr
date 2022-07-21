"use strict";
exports.__esModule = true;
exports.MenuButton = void 0;
require("./MenuButton.css");
exports.MenuButton = function (_a) {
    var isOpen = _a.isOpen;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'menu-button' },
            React.createElement("div", { className: 'line topLine' }),
            React.createElement("div", { className: 'line middleLine' }),
            React.createElement("div", { className: 'line bottomLine' })),
        React.createElement("style", null, "\n        .topLine {\n          transform: " + (isOpen ? 'rotate(45deg)' : 'rotate(0)') + ";\n        }\n        .middleLine {\n          transform: " + (isOpen ? 'translateX(100)' : 'translateX(0)') + ";\n          opacity: " + (isOpen ? 0 : 1) + ";\n        }\n        .bottomLine {\n          transform: " + (isOpen ? 'rotate(-45deg)' : 'rotate(0)') + ";\n        }\n      ")));
};
