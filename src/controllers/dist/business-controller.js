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
exports.updateBusiness = exports.getOwnersBusinesses = exports.getAllBusinesses = exports.addBusiness = exports.showBusiness = void 0;
var express_validator_1 = require("express-validator");
var StatusCodes = require('http-status-codes');
var business_1 = require("../models/business");
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
exports.updateBusiness = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, businessName, description, image, address1, address2, city, postalCode, region, country, email, features, services, phone, fieldsToUpdate;
    return __generator(this, function (_b) {
        id = { _id: req.params.id };
        console.log('in updatebusiness backend, id', id);
        _a = req.body, businessName = _a.businessName, description = _a.description, image = _a.image, address1 = _a.address1, address2 = _a.address2, city = _a.city, postalCode = _a.postalCode, region = _a.region, country = _a.country, email = _a.email, features = _a.features, services = _a.services, phone = _a.phone;
        fieldsToUpdate = {
            businessName: businessName,
            description: description,
            image: image,
            address1: address1,
            address2: address2,
            city: city,
            postalCode: postalCode,
            region: region,
            country: country,
            email: email,
            features: features,
            services: services,
            phone: phone
        };
        console.log('in updatebusiness backend, fieldsToUpdate', fieldsToUpdate);
        return [2 /*return*/];
    });
}); };
