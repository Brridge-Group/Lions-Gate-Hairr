const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const loginSchema = new Schema({
  name: {firstName: String,lastName: String},
  email: {type: String}
});


const citySchema = new Schema({
  cityList:[cityListSchema]
});

const filterSchema = new Schema({
  price:{ type: number,required: true},
  servicesList: [serviceListSchema],
  featureList: [featureListSchema]
  
});

const businessDetailSchema = new Schema({
  name: { type: String, required: true},
  description: { type: String }, 
});

const businessAddressSchema = new Schema({
  street:{type:String,required: true,max: 100},
  number:{type:Number,required: true,max: 100},
  postalCode:{type:String,required: true,max: 6},
  state:{type:String,required: true,max: 100},
  province:{type:String,required: true,max: 100}
  
});

const bookAppointmentSchema= new Schema({
  telephoneNnumber:{type:Number,required: true,max:10},
});

module.exports = mongoose.model("login", loginSchema);
module.exports = mongoose.model("citys", citySchema);
module.exports = mongoose.model("filters", filterSchema);
module.exports=mongoose.model("businessDetails",businessDetailSchema);
module.exports=mongoose.model("businessAddress",businessAddressSchema);
module.exports=mongoose.model("bookAppointment",bookAppointmentSchema);

