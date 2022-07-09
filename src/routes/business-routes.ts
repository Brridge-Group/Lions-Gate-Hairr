import express from 'express'
const router = express.Router({ mergeParams: true })

import {
  showBusiness,
  addBusiness,
  getAllBusinesses,
  getOwnersBusinesses,
  updateBusiness,
  deleteBusiness,
} from '../controllers/business-controller'

router.post('/add-business', addBusiness)

router.get('/get-businesses', getAllBusinesses)

router.patch('/:id', updateBusiness)

router.delete('/:id', deleteBusiness)

router.route('/get-business-by-id/:id').get(showBusiness)

router.route('/get-business-by-ownersId').get(getOwnersBusinesses)

export default router
