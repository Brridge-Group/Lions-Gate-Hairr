"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"]();
var userController = require('../controllers/user-controller');
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/get-profile', userController.getProfileById);
router.post('/:id', userController.updateUser);
//
router.patch('/:id', userController.changeUserRole);
exports["default"] = router;
