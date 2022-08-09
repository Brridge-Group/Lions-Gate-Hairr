"use strict";
exports.__esModule = true;
exports.Card = void 0;
require("./Card.css");
exports.Card = function (props) {
    console.log('in card, props', props);
    return React.createElement("div", { className: "card " + props.className }, props.children);
};
