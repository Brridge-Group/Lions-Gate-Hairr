import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { provinces, states } from "../constants/regions";

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
    enum: [...provinces, ...states],
  },
  country: {
    type: String,
    required: true,
    enum: ["Canada", "United States"]
  }
});

const businessSchema = new Schema({
  name: String,
  description: String,
  image: String,
  address: businessAddressSchema,
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service"
    }
  ],
  stars: Number,
  phone: String,
});

const Business = mongoose.model("Business", businessSchema);

export default Business;

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