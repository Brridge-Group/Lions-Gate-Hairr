import mongoose from 'mongoose'
const Schema = mongoose.Schema

const featureSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  isChecked: { type: Boolean, default: false }
})

export const Feature = mongoose.model('Feature', featureSchema)
