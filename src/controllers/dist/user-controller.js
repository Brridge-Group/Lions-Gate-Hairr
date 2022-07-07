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
exports.changeUserRole = exports.updateUser = exports.getProfileById = exports.signup = exports.signin = void 0;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var StatusCodes = require('http-status-codes');
var User = require('../models/users');
exports.signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, isPasswordCorrect, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser)
                    return [2 /*return*/, res.status(StatusCodes.NOT_FOUND).send("User doesn't exists!")];
                return [4 /*yield*/, bcrypt.compare(password, existingUser.password)];
            case 3:
                isPasswordCorrect = _b.sent();
                if (!isPasswordCorrect)
                    return [2 /*return*/, res.status(StatusCodes.BAD_REQUEST).send('Invalid password!')];
                token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'jwtSecret', { expiresIn: '12h' });
                res.status(200).json({ result: existingUser, token: token });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.log('Error on SignIn function on line 29: ', err_1);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, confirmPassword, firstName, lastName, role, imageProfile, existingUser, hashedPassword, result, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, role = _a.role, imageProfile = _a.imageProfile;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res
                            .status(StatusCodes.BAD_REQUEST)
                            .send('User already exists! Try new email address.')];
                }
                if (password !== confirmPassword)
                    return [2 /*return*/, res.status(StatusCodes.BAD_REQUEST).send("Password doesn't match")];
                return [4 /*yield*/, bcrypt.hash(password, 12)];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, User.create({
                        email: email,
                        password: hashedPassword,
                        name: firstName + " " + lastName,
                        role: role,
                        imageProfile: imageProfile
                    })];
            case 4:
                result = _b.sent();
                token = jwt.sign({ email: result.email, id: result._id }, 'jwtSecret', { expiresIn: '1h' });
                console.log("User registered:" + result + " and Token: " + token);
                res.status(200).json({ result: result, token: token });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _b.sent();
                console.log(err_2);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getProfileById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profileId, profile, err_3, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profileId = req.query.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findById(profileId, '-password')];
            case 2:
                profile = _a.sent();
                return [4 /*yield*/, profile.populate('reviews')];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                return [2 /*return*/, res
                        .status(StatusCodes.BAD_REQUEST)
                        .send('Something went wrong, try later!')];
            case 5:
                if (!profile) {
                    return [2 /*return*/, res
                            .status(StatusCodes.NOT_FOUND)
                            .send("Couldn't find profile for the provided id")];
                }
                result = profile.toObject({ getters: true });
                res.locals.profile = result;
                res.status(StatusCodes.OK).json(result);
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, _a, email, password, confirmPassword, firstName, lastName, role, imageProfile, hashedPassword, fieldsToUpdate, result, token, fieldsToUpdate, result, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                filter = { _id: req.params.id };
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, role = _a.role, imageProfile = _a.imageProfile;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                if (!password) return [3 /*break*/, 4];
                //password is not empty
                if (password !== confirmPassword)
                    return [2 /*return*/, res
                            .status(StatusCodes.BAD_REQUEST)
                            .send("Password doesn't match")];
                return [4 /*yield*/, bcrypt.hash(password, 12)];
            case 2:
                hashedPassword = _b.sent();
                fieldsToUpdate = {
                    name: firstName + " " + lastName,
                    email: email,
                    password: hashedPassword,
                    role: role,
                    imageProfile: imageProfile
                };
                return [4 /*yield*/, User.findOneAndUpdate(filter, fieldsToUpdate, {
                        "new": true
                    })];
            case 3:
                result = _b.sent();
                if (result) {
                    token = jwt.sign({ email: result.email, id: result._id }, 'jwtSecret', {
                        expiresIn: '1h'
                    });
                    res.status(200).json({ result: result, token: token });
                }
                else {
                    res.status(400).json({ error: 'Error in update user' });
                }
                return [3 /*break*/, 6];
            case 4:
                fieldsToUpdate = {
                    name: firstName + " " + lastName,
                    email: email,
                    role: role,
                    imageProfile: imageProfile
                };
                return [4 /*yield*/, User.findOneAndUpdate(filter, fieldsToUpdate, {
                        "new": true
                    })];
            case 5:
                result = _b.sent();
                if (result) {
                    token = jwt.sign({ email: result.email, id: result._id }, 'jwtSecret', {
                        expiresIn: '1h'
                    });
                    res.status(200).json({ result: result, token: token });
                }
                else {
                    res.status(400).json({ error: 'Error in update user' });
                }
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res
                        .status(StatusCodes.BAD_REQUEST)
                        .send('Something went wrong in update user, try later!')];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.changeUserRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, role, fieldsToUpdate, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = { _id: req.params.id };
                role = req.body.role;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                fieldsToUpdate = {
                    role: role
                };
                return [4 /*yield*/, User.findByIdAndUpdate(id, fieldsToUpdate, {
                        "new": true
                    })];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(200).json({ result: result });
                    // console.log('result', result)
                }
                else {
                    res.status(400).json({ error: 'Error in update user' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res
                        .status(StatusCodes.BAD_REQUEST)
                        .send('Something went wrong in update user, try later!')];
            case 4: return [2 /*return*/];
        }
    });
}); };
