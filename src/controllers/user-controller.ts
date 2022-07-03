import { NextFunction, Request, Response } from 'express'
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let StatusCodes = require('http-status-codes')

let User = require('../models/users')

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(StatusCodes.NOT_FOUND).send("User doesn't exists!")

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res.status(StatusCodes.BAD_REQUEST).send('Invalid password!')
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'jwtSecret',
      { expiresIn: '12h' }
    )
    res.status(200).json({ result: existingUser, token })
  } catch (err) {
    console.log('Error on SignIn function on line 29: ', err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.')
  }
}

export const signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    role,
    imageProfile,
  } = req.body
  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send('User already exists! Try new email address.')
    }

    if (password !== confirmPassword)
      return res.status(StatusCodes.BAD_REQUEST).send("Password doesn't match")
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      role,
      imageProfile,
    })

    const token = jwt.sign(
      { email: result.email, id: result._id },
      'jwtSecret',
      { expiresIn: '1h' }
    )
    console.log(`User registered:${result} and Token: ${token}`)
    res.status(200).json({ result, token })
  } catch (err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.')
  }
}

export const getProfileById = async (req: Request, res: Response) => {
  const profileId = req.query.id

  let profile
  try {
    profile = await User.findById(profileId, '-password')
    await profile.populate('reviews')
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Something went wrong, try later!')
  }

  if (!profile) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send("Couldn't find profile for the provided id")
  }

  const result = profile.toObject({ getters: true })
  res.locals.profile = result
  res.status(StatusCodes.OK).json(result)
}

export const updateUser = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id }

  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    role,
    imageProfile,
  } = req.body
  try {
    if (password) {
      //password is not empty
      if (password !== confirmPassword)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send("Password doesn't match")

      const hashedPassword = await bcrypt.hash(password, 12)
      const fieldsToUpdate = {
        name: `${firstName} ${lastName}`,
        email: email,
        password: hashedPassword,
        role: role,
        imageProfile: imageProfile,
      }
      let result = await User.findOneAndUpdate(filter, fieldsToUpdate, {
        new: true,
      })
      if (result) {
        const token = jwt.sign(
          { email: result.email, id: result._id },
          'jwtSecret',
          {
            expiresIn: '1h',
          }
        )
        res.status(200).json({ result, token })
      } else {
        res.status(400).json({ error: 'Error in update user' })
      }
    } else {
      const fieldsToUpdate = {
        name: `${firstName} ${lastName}`,
        email: email,
        role: role,
        imageProfile: imageProfile,
      }
      let result = await User.findOneAndUpdate(filter, fieldsToUpdate, {
        new: true,
      })
      if (result) {
        const token = jwt.sign(
          { email: result.email, id: result._id },
          'jwtSecret',
          {
            expiresIn: '1h',
          }
        )
        res.status(200).json({ result, token })
      } else {
        res.status(400).json({ error: 'Error in update user' })
      }
    }
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Something went wrong in update user, try later!')
  }
}

export const changeUserRole = async (req: Request, res: Response) => {
  const id = { _id: req.params.id }

  const { role } = req.body
  try {
    const fieldsToUpdate = {
      role: role,
    }
    // console.log('filter, req.body, fieldsToUpdate', id, req.body)
    let result = await User.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    })
    if (result) {
      res.status(200).json({ result })
      // console.log('result', result)
    } else {
      res.status(400).json({ error: 'Error in update user' })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Something went wrong in update user, try later!')
  }
}
