"use strict";
exports.__esModule = true;
exports.BusinessReviews = void 0;
var Star_1 = require("../../UIElements/Star");
require("./BusinessReviews.css");
exports.BusinessReviews = function (props) {
    var reviews = props.reviews;
    return (React.createElement("div", { className: 'BusinessReviews_container' },
        React.createElement("ul", { className: 'BusinessReviews_scroll' }, reviews.map(function (r) { return (React.createElement("li", { key: r._id, className: 'Business_reviews author' },
            React.createElement("div", { className: 'Business_column-left ' },
                React.createElement("div", { className: 'img-wrapper' },
                    React.createElement("img", { src: r.image, className: 'person-circle' }))),
            React.createElement("div", { className: 'Business_column-right ' },
                r.name === undefined ? 'person name' : r.name,
                React.createElement("h6", { className: 'person-city' }, "do we want city, state"),
                React.createElement(Star_1.StarSmall, { stars: r.rating }),
                React.createElement("h6", null, r.comment)))); }))));
};
