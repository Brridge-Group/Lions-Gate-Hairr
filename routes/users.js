let express = require("express");
let router = express.Router();

let userController = require("../controllers/user");

// @route POST /api/user/register
// @desc Register User
// @access Public
router.post("/signup", userController.signup);

router.get("/getProfile", userController.getProfileById);

module.exports = router;
