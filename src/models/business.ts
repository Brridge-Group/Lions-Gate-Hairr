import { provinces, states } from "../constants/regions";

import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    enum: ["Canada", "United States"],
  },
});

const businessSchema = new Schema({
  name: String,
  description: String,
  image: String,
  address: businessAddressSchema,
  features: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feature",
    },
  ],
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  stars: Number,
  phone: String,
});

const Business = mongoose.model("Business", businessSchema);

export default Business;
