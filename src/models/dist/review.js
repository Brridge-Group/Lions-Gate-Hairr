"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var reviewSchema = new Schema({
    comment: { type: String },
    rating: { type: Number, required: true },
    createDate: { type: Date, "default": Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    name: { type: String },
    image: { type: String }
});
module.exports = mongoose_1["default"].model('Review', reviewSchema);
