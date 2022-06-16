import { Request, Response, NextFunction } from 'express'
let StatusCodes = require('http-status-codes')

let Review = require('../models/review')
import { Business } from '../models/business'
let User = require('../models/users')

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  const { comment, rating, business, author } = req.body

  const newReview = new Review({
    comment,
    rating,
    business,
    author,
  })

  try {
    await newReview.save()
  } catch (error) {
    return next(error)
  }
  let businessFind = await Business.findById(business)
  console.log('businessFind', businessFind)
  businessFind.reviews.push(newReview)
  await businessFind.save()

  let authorFind = await User.findById(author)
  console.log('authorFind', authorFind)
  authorFind.reviews.push(newReview)
  await authorFind.save()

  console.log('review', newReview)
  res.status(201).json({ review: newReview })
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
  console.log('in get review', req.params.id)

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
  let review

  const reviewId = req.params.id

  try {
    review = await Review.findById(reviewId)
  } catch (err) {
    return next(err)
  }

  try {
    if (review) {
      await review.remove()
    }
  } catch (err) {
    return next(err)
  }

  res.json({ message: 'Delete successfully' })
}

exports.createReview = createReview
exports.updateReview = updateReview
exports.getReview = getReview
exports.deleteReview = deleteReview
