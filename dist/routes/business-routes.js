"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router({ mergeParams: true });
const business_controller_1 = require("../controllers/business-controller");
console.log("Business routes reached!");
router.route("/:id")
    .get(business_controller_1.showBusiness);
exports.default = router;
