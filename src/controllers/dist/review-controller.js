"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose = require('mongoose');
var http_status_codes_1 = require("http-status-codes");
var Review = require('../models/review');
var business_1 = require("../models/business");
var User = require('../models/users');
var createReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, comment, rating, business, author, image, name, profile, newReview, error_1, businessFind, authorFind;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, comment = _a.comment, rating = _a.rating, business = _a.business, author = _a.author, image = _a.image, name = _a.name;
                newReview = new Review({
                    comment: comment,
                    rating: rating,
                    business: business,
                    author: author,
                    image: image,
                    name: name
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newReview.save()];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, next(error_1)];
            case 4: return [4 /*yield*/, business_1.Business.findById(business)];
            case 5:
                businessFind = _b.sent();
                businessFind.reviews.push(newReview);
                return [4 /*yield*/, businessFind.save()];
            case 6:
                _b.sent();
                return [4 /*yield*/, User.findById(author)];
            case 7:
                authorFind = _b.sent();
                authorFind.reviews.push(newReview);
                return [4 /*yield*/, authorFind.save()];
            case 8:
                _b.sent();
                return [4 /*yield*/, User.findById(author)];
            case 9:
                profile = _b.sent();
                res.status(201).json({ review: newReview, result: profile });
                return [2 /*return*/];
        }
    });
}); };
var updateReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, _a, comment, rating, review, err_1, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reviewId = req.params.id;
                _a = req.body, comment = _a.comment, rating = _a.rating;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Review.findById(reviewId)];
            case 2:
                review = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)];
            case 4:
                review.comment = comment;
                review.rating = rating;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, review.save()];
            case 6:
                _b.sent();
                return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                return [2 /*return*/, next(err_2)];
            case 8:
                res.status(200).json({ review: review.toObject({ getters: true }) });
                return [2 /*return*/];
        }
    });
}); };
var getReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var review, reviewId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reviewId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Review.findById(reviewId)
                        .populate('business')
                        .populate('author')];
            case 2:
                review = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 4:
                res.json({ review: review });
                return [2 /*return*/];
        }
    });
}); };
var deleteReview = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, authorId, review, profile, err_4, sess, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reviewId = req.params.id;
                authorId = req.body.profileId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Review.findById(reviewId)
                        .populate('business')
                        .populate('author')];
            case 2:
                review = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: 'Something went wrong, error to find a review with this ID.'
                });
                return [3 /*break*/, 4];
            case 4:
                if (!review) {
                    res
                        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                        .json({ message: 'Could not find review for this ID' });
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 11, , 12]);
                return [4 /*yield*/, mongoose.startSession()];
            case 6:
                sess = _a.sent();
                sess.startTransaction();
                review.remove({ session: sess });
                review.author.reviews.pull(reviewId);
                return [4 /*yield*/, review.author.save({ session: sess })];
            case 7:
                _a.sent();
                review.business.reviews.pull(reviewId);
                return [4 /*yield*/, review.business.save({ session: sess })];
            case 8:
                _a.sent();
                return [4 /*yield*/, sess.commitTransaction()
                    //get the profile again
                ];
            case 9:
                _a.sent();
                return [4 /*yield*/, User.findById(authorId)];
            case 10:
                //get the profile again
                profile = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({ result: profile });
                return [3 /*break*/, 12];
            case 11:
                error_2 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Could not delete.' });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.getReview = getReview;
exports.deleteReview = deleteReview;
