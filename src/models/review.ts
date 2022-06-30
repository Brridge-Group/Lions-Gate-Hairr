import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  comment: { type: String },
  rating: { type: Number, required: true },
  createDate: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  name: { type: String },
  image: { type: String },
})

module.exports = mongoose.model('Review', reviewSchema)
