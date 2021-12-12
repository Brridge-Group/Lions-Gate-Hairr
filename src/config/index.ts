import dotenv = require('dotenv')

//config() will read your .env file, parse the contents, assign it to process.env.env
dotenv.config();

const config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/hairr",
}

export default config