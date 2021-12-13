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
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let StatusCodes = require("http-status-codes");
let User = require("../models/user");
module.exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, confirmPassword, firstName, lastName, role } = req.body;
    try {
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            console.log(existingUser);
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send("User already exists! Try new email address.");
        }
        if (password !== confirmPassword)
            return res.status(StatusCodes.BAD_REQUEST).send("Password doesn't match");
        const hashedPassword = yield bcrypt.hash(password, 12);
        const result = yield User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            role,
        });
        const token = jwt.sign({ email: result.email, id: result._id }, "jwtSecret", { expiresIn: "1h" });
        console.log(`User registered:${result} and Token: ${token}`);
        res.status(200).json({ result, token });
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong.");
    }
});
