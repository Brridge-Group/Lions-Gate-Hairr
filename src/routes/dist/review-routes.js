"use strict";
exports.__esModule = true;
var express_1 = require("express");
var reviewRouter = express_1["default"].Router({ mergeParams: true });
var reviewsController = require('../controllers/review-controller');
// Create Review
reviewRouter.post('/', reviewsController.createReview);
// Get Review
reviewRouter.get('/:id', reviewsController.getReview);
// Update Review
reviewRouter.patch('/:id', reviewsController.updateReview);
// Delete Review
reviewRouter["delete"]('/:id', reviewsController.deleteReview);
exports["default"] = reviewRouter;
