"use strict";
exports.__esModule = true;
exports.About = void 0;
require("./About.css");
exports.About = function (props) {
    return (React.createElement("div", { className: 'About' },
        React.createElement("div", { className: 'About-left' },
            React.createElement("img", { src: props.image, className: 'About-pic', alt: 'Hair salon.' })),
        React.createElement("div", { className: 'About-right' },
            React.createElement("h2", null, props.name),
            React.createElement("h3", null, props.description),
            React.createElement("p", null,
                props.address.address1,
                React.createElement("br", null),
                props.address.city,
                ", ",
                props.address.region,
                React.createElement("br", null),
                props.address.postalCode))));
};
