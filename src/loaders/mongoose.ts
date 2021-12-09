const mongoose = require("mongoose");
import config from "../config";



const mongooseLoader = async() =>{
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  return connection.connection.db;
}

export default mongooseLoader;