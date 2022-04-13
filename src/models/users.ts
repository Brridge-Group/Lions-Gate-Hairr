import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'owner'],
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  imageProfile: { type: String, required: true}
})

module.exports = mongoose.model('User', userSchema);
