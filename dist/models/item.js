"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
});
module.exports = mongoose.model("Item", itemSchema);
