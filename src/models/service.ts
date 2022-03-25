import mongoose from 'mongoose'
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  isChecked: { type: Boolean, default: false }
})

export const Service = mongoose.model('Service', serviceSchema);