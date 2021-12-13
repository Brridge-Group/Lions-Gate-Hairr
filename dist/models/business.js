"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regions_1 = require("../constants/regions");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const businessAddressSchema = new Schema({
    street: {
        type: String,
        required: true,
        max: 100,
    },
    postalCode: {
        type: String,
        required: true,
        max: 6,
    },
    city: {
        type: String,
        required: true,
        max: 100,
    },
    region: {
        type: String,
        required: true,
        enum: [...regions_1.provinces, ...regions_1.states],
    },
    country: {
        type: String,
        required: true,
        enum: ["Canada", "United States"],
    },
});
const businessSchema = new Schema({
    name: String,
    description: String,
    image: String,
    address: businessAddressSchema,
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: "Service",
        },
    ],
    stars: Number,
    phone: String,
});
const Business = mongoose_1.default.model("Business", businessSchema);
exports.default = Business;
