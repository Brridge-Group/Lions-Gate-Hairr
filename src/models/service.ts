import mongoose from "mongoose";
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
