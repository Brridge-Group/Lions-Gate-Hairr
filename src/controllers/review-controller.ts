import { Request, Response, NextFunction } from 'express'
const mongoose = require('mongoose')
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes'

let Review = require('../models/review')
import { Business } from '../models/business'
let User = require('../models/users')

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comment, rating, business, author, image, name } = req.body
  let profile

  const newReview = new Review({
    comment,
    rating,
    business,
    author,
    image,
    name,
  })

  try {
    await newReview.save()
  } catch (error) {
    return next(error)
  }
  let businessFind = await Business.findById(business)
  businessFind.reviews.push(newReview)
  await businessFind.save()

  let authorFind = await User.findById(author)
  authorFind.reviews.push(newReview)
  await authorFind.save()
  profile = await User.findById(author)

  res.status(201).json({ review: newReview, result: profile })
}

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewId = req.params.id

  console.log(req.body)
  const { comment, rating } = req.body

  let review
  try {
    review = await Review.findById(reviewId)
  } catch (err) {
    return next(err)
  }

  review.comment = comment
  review.rating = rating

  try {
    await review.save()
  } catch (err) {
    return next(err)
  }

  res.status(200).json({ review: review.toObject({ getters: true }) })
}

const getReview = async (req: Request, res: Response, next: NextFunction) => {
  let review

  const reviewId = req.params.id

  try {
    review = await Review.findById(reviewId)
      .populate('business')
      .populate('author')
  } catch (err) {
    return next(err)
  }

  res.json({ review })
}

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reviewId = req.params.id
  const authorId = req.body.profileId
  let review
  let profile

  try {
    review = await Review.findById(reviewId)
      .populate('business')
      .populate('author')
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Something went wrong, error to find a review with this ID.',
    })
  }

  if (!review) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Could not find review for this ID' })
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    review.remove({ session: sess })
    review.author.reviews.pull(reviewId)
    await review.author.save({ session: sess })
    review.business.reviews.pull(reviewId)
    await review.business.save({ session: sess })
    await sess.commitTransaction()
    //get the profile again
    profile = await User.findById(authorId)
    res.status(StatusCodes.OK).json({ result: profile })
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Could not delete.' })
  }
}

exports.createReview = createReview
exports.updateReview = updateReview
exports.getReview = getReview
exports.deleteReview = deleteReview
