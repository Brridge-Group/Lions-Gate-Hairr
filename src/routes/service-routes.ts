import express from 'express'
const servicesRouter = express.Router({ mergeParams: true })

import { indexServices, createService } from '../controllers/service-controller'

// Get All Services
servicesRouter.route('/').get(indexServices)

// Create Service
servicesRouter.post('/', createService)

export default servicesRouter
