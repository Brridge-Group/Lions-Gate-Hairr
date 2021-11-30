let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let StatusCodes = require("http-status-codes");

let User = require("../models/user");

module.exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, role } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(existingUser);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("User already exists! Try new email address.");
    }

    if (password !== confirmPassword)
      return res.status(StatusCodes.BAD_REQUEST).send("Password doesn't match");
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      role,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      "jwtSecret",
      { expiresIn: "1h" }
    );
    console.log(`User registered:${result} and Token: ${token}`);
    res.status(200).json({ result, token });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong.");
  }
};
