import Router from "express";

const router = Router();

let userController = require("../controllers/user-controller");

// @route POST /api/user/register
// @desc Register User
// @access Public
router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.get('/get-profile', userController.getProfileById)

export default router;
