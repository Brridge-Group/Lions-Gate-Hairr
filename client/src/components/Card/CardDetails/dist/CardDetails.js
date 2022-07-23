"use strict";
exports.__esModule = true;
exports.CardDetails = void 0;
//* Custom Styles
require("./CardDetails.css");
exports.CardDetails = function (business) {
    var _a, _b, _c, _d, _e;
    return (React.createElement("section", { className: 'CardDetails-Container' },
        React.createElement("figure", { className: 'CardDetails-ImageContainer' },
            React.createElement("img", { src: business.image, className: 'CardDetails-Image', alt: 'Hair salon.' })),
        React.createElement("div", { className: 'CardDetails-InfoContainer' },
            React.createElement("h2", null, business.businessName),
            React.createElement("h3", null, business === null || business === void 0 ? void 0 : business.description),
            React.createElement("p", null, (_a = business.address) === null || _a === void 0 ? void 0 :
                _a.address1,
                React.createElement("br", null), (_b = business.address) === null || _b === void 0 ? void 0 :
                _b.address2, (_c = business.address) === null || _c === void 0 ? void 0 :
                _c.city,
                ", ", (_d = business.address) === null || _d === void 0 ? void 0 :
                _d.region,
                React.createElement("br", null), (_e = business.address) === null || _e === void 0 ? void 0 :
                _e.postalCode))));
};
