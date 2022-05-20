import mongoose from 'mongoose'
var uniqueValidator = require('mongoose-unique-validator')

import { provinces, states } from '../constants/regions'

const Schema = mongoose.Schema

const businessAddressSchema = new Schema({
  address1: {
    type: String,
    required: true,
    max: 100,
  },
  address2: {
    type: String,
    max: 100,
  },
  city: {
    type: String,
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
    enum: [...provinces, ...states],
  },
  country: {
    type: String,
    required: true,
    enum: ['Canada', 'United States'],
  },
})

const businessSchema = new Schema({
  businessName: { type: String, required: true },
  description: String,
  image: String,
  email: String,
  address: businessAddressSchema,
  features: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Feature',
    },
  ],
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  stars: Number,
  phone: String,
  ownerId: String,
}).plugin(uniqueValidator);


export const Business = mongoose.model("Business", businessSchema);

