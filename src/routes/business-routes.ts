import express from 'express'
const router = express.Router({ mergeParams: true })

import { showBusiness, getCityByName } from '../controllers/business-controller'

router.route('/:id').get(showBusiness)

router.route('search/:cityName').get(getCityByName)

export default router
