import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
let StatusCodes = require('http-status-codes')

import Business from '../models/business'

export const showBusiness = async (req: Request, res: Response) => {
  const { id } = req.params
  const business = await Business.findById(id).populate('services')
  await business.populate('features')
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
    name,
    description,
    image,
    address,
    features,
    services,
    stars,
    phone,
    ownerId
  } = req.body

  const addedBusiness = new Business({
    name,
    description,
    image,
    address,
    features,
    services,
    stars,
    phone,
    ownerId
  })

  try {
    await addedBusiness.save()
  } catch (err) {
    const error = res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json('Adding business faild, please try again.')
    return next(error)
  }

  res.status(StatusCodes.CREATED).json({ business: addedBusiness })
}

export const getAllBusinesses = async (req: Request, res: Response) => {
  try {
    const businessList = await Business.find()
      .populate('services')
      .populate('features')
    res.send(businessList)
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
}

export const getCityByName = async (req: Request, res: Response) => {
  const { cityName } = req.params
  let businesses = []
  try {
    businesses = await Business.find({ 'address.city': cityName }).sort({
      name: 1
    })
    res.set('Access-Control-Allow-Origin', '')
    res.send(businesses)
    console.log('Results of getCityByName: ', businesses)
  } catch (error) {
    return console.log(error)
  }
}
