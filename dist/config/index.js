"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
//config() will read your .env file, parse the contents, assign it to process.env.env
dotenv.config();
const config = {
    port: process.env.PORT,
    databaseURL: process.env.MONGODB_URI || process.env.LOCAL_DB_URL,
};
exports.default = config;
