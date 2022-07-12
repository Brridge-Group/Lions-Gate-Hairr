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
exports.deleteBusiness = exports.updateBusiness = exports.getOwnersBusinesses = exports.getAllBusinesses = exports.addBusiness = exports.showBusiness = void 0;
var express_validator_1 = require("express-validator");
var StatusCodes = require('http-status-codes');
var mongoose = require('mongoose');
var business_1 = require("../models/business");
var Review = require('../models/review');
var User = require('../models/users');
exports.showBusiness = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, business;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, business_1.Business.findById(id).populate('services')];
            case 1:
                business = _a.sent();
                return [4 /*yield*/, business.populate('features')];
            case 2:
                _a.sent();
                return [4 /*yield*/, business.populate('reviews')];
            case 3:
                _a.sent();
                res.set('Access-Control-Allow-Origin', '');
                res.send(business);
                return [2 /*return*/];
        }
    });
}); };
exports.addBusiness = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, businessName, description, image, address, email, features, services, stars, phone, ownerId, addedBusiness, err_1, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res
                            .status(StatusCodes.UNPROCESSABLE_ENTITY)
                            .json('Invalid inputs passed, please check your data.')];
                }
                _a = req.body, businessName = _a.businessName, description = _a.description, image = _a.image, address = _a.address, email = _a.email, features = _a.features, services = _a.services, stars = _a.stars, phone = _a.phone, ownerId = _a.ownerId;
                addedBusiness = new business_1.Business({
                    businessName: businessName,
                    description: description,
                    email: email,
                    image: image,
                    address: address,
                    features: features,
                    services: services,
                    stars: stars,
                    phone: phone,
                    ownerId: ownerId
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, addedBusiness.save()];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                error = res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json('Adding business failed, please try again.');
                return [2 /*return*/, next(error)];
            case 4:
                res.status(StatusCodes.CREATED).json({ business: addedBusiness });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllBusinesses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var businessList, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, business_1.Business.find()
                        .populate('services')
                        .populate('features')
                        .populate('reviews')];
            case 1:
                businessList = _a.sent();
                res.send(businessList);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOwnersBusinesses = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, businessList, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, business_1.Business.find({ ownerId: id })
                        .populate('services')
                        .populate('features')];
            case 2:
                businessList = _a.sent();
                res.send(businessList);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err_3.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBusiness = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, businessName, description, email, image, address, features, services, reviews, phone, fieldsToUpdate, business, error_1, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = { _id: req.params.id };
                _a = req.body, businessName = _a.businessName, description = _a.description, email = _a.email, image = _a.image, address = _a.address, features = _a.features, services = _a.services, reviews = _a.reviews, phone = _a.phone;
                fieldsToUpdate = {
                    businessName: businessName,
                    description: description,
                    email: email,
                    image: image,
                    address: address,
                    features: features,
                    services: services,
                    reviews: reviews,
                    phone: phone
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, business_1.Business.findByIdAndUpdate(id, fieldsToUpdate)];
            case 2:
                business = _b.sent();
                if (business) {
                    console.log('business', business);
                    res.status(200).json({ business: business });
                }
                else {
                    res.status(400).json({ error: 'Error in update user' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res
                        .status(StatusCodes.BAD_REQUEST)
                        .send('Something went wrong in update user, try later!')];
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, business.save()];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                err_4 = _b.sent();
                return [2 /*return*/, next(err_4)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteBusiness = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var businessId, userListId, reviewListIds, business, reviews, i, review, userAlreadyExist, _id, i, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                businessId = { _id: req.params.id };
                userListId = [];
                reviewListIds = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, , 14]);
                return [4 /*yield*/, business_1.Business.findByIdAndDelete(businessId)];
            case 2:
                business = _a.sent();
                if (!business) {
                    return [2 /*return*/, res.sendStatus(404).json({ message: 'Business not found' })];
                }
                return [4 /*yield*/, Review.find({ business: businessId })
                    // console.log('reviews', reviews)
                ];
            case 3:
                reviews = _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < reviews.length)) return [3 /*break*/, 7];
                return [4 /*yield*/, Review.findByIdAndDelete({ _id: reviews[i]._id })];
            case 5:
                review = _a.sent();
                if (i > 0) {
                    userAlreadyExist = userListId.indexOf(review.author);
                    userAlreadyExist === -1 ? '' : userListId.push(review.author);
                }
                else {
                    userListId.push(review.author);
                }
                reviewListIds.push(review._id);
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7:
                if (!(reviewListIds.length > 0)) return [3 /*break*/, 12];
                _id = reviewListIds.pop();
                i = 0;
                _a.label = 8;
            case 8:
                if (!(i < userListId.length)) return [3 /*break*/, 11];
                return [4 /*yield*/, User.findOneAndUpdate({
                        _id: userListId[i]
                    }, {
                        $pull: {
                            reviews: _id
                        }
                    })];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                i++;
                return [3 /*break*/, 8];
            case 11: return [3 /*break*/, 7];
            case 12: return [2 /*return*/, res.send({
                    message: business.businessName + ' was deleted successfully.'
                })];
            case 13:
                err_5 = _a.sent();
                return [2 /*return*/, res.sendStatus(400).json({ message: 'Error on delete business' })];
            case 14: return [2 /*return*/];
        }
    });
}); };
