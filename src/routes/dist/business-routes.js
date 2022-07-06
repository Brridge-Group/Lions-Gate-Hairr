"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router({ mergeParams: true });
var business_controller_1 = require("../controllers/business-controller");
router.post('/add-business', business_controller_1.addBusiness);
router.get('/get-businesses', business_controller_1.getAllBusinesses);
router.patch('/:id', business_controller_1.updateBusiness);
router.route('/get-business-by-id/:id').get(business_controller_1.showBusiness);
router.route('/get-business-by-ownersId').get(business_controller_1.getOwnersBusinesses);
exports["default"] = router;
