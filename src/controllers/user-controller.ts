import { NextFunction, Request, Response } from "express";
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let StatusCodes = require("http-status-codes");

let User = require("../models/users");

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(StatusCodes.NOT_FOUND).send("User doesn't exists!");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid password!");
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "jwtSecret",
      { expiresIn: "12h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong.");
  }
}

export const signup = async(req: Request, res: Response) => {
  const { email, password, confirmPassword, firstName, lastName, role, imageProfile } =
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
    imageProfile
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
}

export const getProfileById = async(req: Request, res: Response) => {
  const profileId = req.query.id;

  let profile;
  try {
    profile = await User.findById(profileId, "-password");
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Something went wrong, try later!");
  }

  if (!profile) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("Couldn't find profile for the provided id");
  }

  const result = profile.toObject({ getters: true });
  res.locals.profile = result;
  res.status(StatusCodes.OK).json(result);
}