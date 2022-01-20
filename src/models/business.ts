import mongoose from "mongoose";
var uniqueValidator = require('mongoose-unique-validator');

import { provinces, states } from "../constants/regions";

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
  ownerId: String,
});

businessSchema.plugin(uniqueValidator);

const Business = mongoose.model("Business", businessSchema);

export default Business;
