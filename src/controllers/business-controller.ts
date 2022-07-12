import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
let StatusCodes = require('http-status-codes')
const mongoose = require('mongoose')

import { Business } from '../models/business'
let Review = require('../models/review')
let User = require('../models/users')

export const showBusiness = async (req: Request, res: Response) => {
  const { id } = req.params
  const business = await Business.findById(id).populate('services')
  await business.populate('features')
  await business.populate('reviews')
  res.set('Access-Control-Allow-Origin', '')
  res.send(business)
}

export const addBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json('Invalid inputs passed, please check your data.')
  }

  const {
    businessName,
    description,
    image,
    address,
    email,
    features,
    services,
    stars,
    phone,
    ownerId,
  } = req.body

  const addedBusiness = new Business({
    businessName,
    description,
    email,
    image,
    address,
    features,
    services,
    stars,
    phone,
    ownerId,
  })

  try {
    await addedBusiness.save()
  } catch (err) {
    const error = res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json('Adding business failed, please try again.')
    return next(error)
  }

  res.status(StatusCodes.CREATED).json({ business: addedBusiness })
}

export const getAllBusinesses = async (req: Request, res: Response) => {
  try {
    const businessList = await Business.find()
      .populate('services')
      .populate('features')
      .populate('reviews')
    res.send(businessList)
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
}

export const getOwnersBusinesses = async (req: Request, res: Response) => {
  const id = req.query.id
  try {
    const businessList = await Business.find({ ownerId: id })
      .populate('services')
      .populate('features')
    res.send(businessList)
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
}

export const updateBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = { _id: req.params.id }

  const {
    businessName,
    description,
    email,
    image,
    address,
    features,
    services,
    reviews,
    phone,
  } = req.body

  const fieldsToUpdate = {
    businessName,
    description,
    email,
    image,
    address,
    features,
    services,
    reviews,
    phone,
  }

  let business

  try {
    business = await Business.findByIdAndUpdate(id, fieldsToUpdate)
    if (business) {
      // console.log('business', business)
      res.status(200).json({ business })
    } else {
      res.status(400).json({ error: 'Error in update user' })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Something went wrong in update user, try later!')
  }
  try {
    await business.save()
  } catch (err) {
    return next(err)
  }
}

export const deleteBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const businessId = { _id: req.params.id }
  let userListId = []
  let reviewListIds = []

  try {
    const business = await Business.findByIdAndDelete(businessId)
    if (!business) {
      return res.sendStatus(404).json({ message: 'Business not found' })
    }

    const reviews = await Review.find({ business: businessId })
    // console.log('reviews', reviews)
    for (let i = 0; i < reviews.length; i++) {
      const review = await Review.findByIdAndDelete({ _id: reviews[i]._id })
      if (i > 0) {
        let userAlreadyExist = userListId.indexOf(review.author)
        userAlreadyExist === -1 ? '' : userListId.push(review.author)
      } else {
        userListId.push(review.author)
      }
      reviewListIds.push(review._id)
    }

    while (reviewListIds.length > 0) {
      let _id = reviewListIds.pop()
      for (let i = 0; i < userListId.length; i++) {
        await User.findOneAndUpdate(
          {
            _id: userListId[i],
          },
          {
            $pull: {
              reviews: _id,
            },
          }
        )
      }
    }

    return res.send({
      message: business.businessName + ' was deleted successfully.',
    })
  } catch (err) {
    return res.sendStatus(400).json({ message: 'Error on delete business' })
  }
}
