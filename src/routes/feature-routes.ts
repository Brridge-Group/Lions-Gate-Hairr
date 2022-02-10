import express from 'express'
const featureRouter = express.Router({ mergeParams: true })

import { indexFeatures, createFeature } from '../controllers/feature-controller'

// Get All Features
featureRouter.route('/').get(indexFeatures)

// Create Feature
featureRouter.post('/', createFeature)

export default featureRouter
