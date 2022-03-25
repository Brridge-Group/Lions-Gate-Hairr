import dotenv = require('dotenv')

//config() will read your .env file, parse the contents, assign it to process.env.env
dotenv.config();

interface Config {
  port: string;
  databaseURL: string;
}

export const config: Config = {
  port: process.env.PORT || "",
  databaseURL: process.env.MONGODB_URI || process.env.LOCAL_DB_URL || "",
}