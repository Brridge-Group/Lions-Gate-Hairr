import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: {
    type: String,
    enum: ['user', 'owner'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  imageProfile: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
})

module.exports = mongoose.model('User', userSchema)
