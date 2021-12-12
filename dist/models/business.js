"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const regions_1 = require("constants/regions");
const businessAddressSchema = new Schema({
    street: {
        type: String,
        required: true,
        max: 100,
    },
    number: {
        type: Number,
        required: true,
        max: 100,
    },
    postalCode: {
        type: String,
        required: true,
        max: 6,
    },
    region: {
        type: String,
        required: true,
        enum: [...regions_1.provinces, ...regions_1.states],
    },
});
const businessSchema = new Schema({
    name: String,
    description: String,
    image: String,
    address: businessAddressSchema,
    stars: Number,
    phone: String,
});
exports.Business = mongoose_1.default.model("Business", businessSchema);
// const businessDetailSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String },
// });
// const bookAppointmentSchema = new Schema({
//   telephoneNnumber: { type: Number, required: true, max: 10 },
// });
// module.exports = mongoose.model("login", loginSchema);
// module.exports = mongoose.model("citys", citySchema);
// module.exports = mongoose.model("filters", filterSchema);
// module.exports = mongoose.model("businessDetails", businessDetailSchema);
// module.exports = mongoose.model("businessAddress", businessAddressSchema);
// module.exports = mongoose.model("bookAppointment", bookAppointmentSchema);
// const loginSchema = new Schema({
//   name: {
//     firstName: String,
//     lastName: String,
//   },
//   email: {
//     type: String,
//   },
// });
// const citySchema = new Schema({
//   cityList: [cityListSchema],
// });
// const filterSchema = new Schema({
//   price: { type: number, required: true },
//   servicesList: [serviceListSchema],
//   featureList: [featureListSchema],
// });
