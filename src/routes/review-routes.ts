// const express = require('express')
// import Router from 'express'
import express from 'express'

// const router = Router()
const reviewRouter = express.Router({ mergeParams: true })

let reviewsController = require('../controllers/review-controller')

// const reviewRouter = express.Router()

// Create Review
reviewRouter.post('/', reviewsController.createReview)

// Get Review
reviewRouter.get('/:id', reviewsController.getReview)

// Update Review
reviewRouter.patch('/:id', reviewsController.updateReview)

// Delete Review
reviewRouter.delete('/:id', reviewsController.deleteReview)

export default reviewRouter
