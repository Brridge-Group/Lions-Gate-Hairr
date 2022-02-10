import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
let StatusCodes = require('http-status-codes')

import Feature from '../models/feature'

// Get All Features
export const indexFeatures = async (req: Request, res: Response) => {
  const features = await Feature.find({})
  res.set('Access-Control-Allow-Origin', '')
  res.send(features)
}

// Create New Feature
export const createFeature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json(`Invalid inputs passed, please check your data.`)
  }
  const { name, description, isChecked } = req.body
  const newFeature = new Feature({ name, description, isChecked })
  try {
    await newFeature.save()
  } catch (error) {
    console.log('error', error)
    return next(error)
  }
  res.status(201).json({ feature: newFeature })
}
