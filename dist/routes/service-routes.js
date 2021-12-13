"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const service_controller_1 = require("../controllers/service-controller");
router.route("/:id")
    .get(service_controller_1.indexServices);
exports.default = router;
