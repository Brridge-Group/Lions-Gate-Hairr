import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
let StatusCodes = require('http-status-codes')

import { Service } from '../models/service'

// Get All Services
export const indexServices = async (req: Request, res: Response) => {
  const services = await Service.find({})
  res.set('Access-Control-Allow-Origin', '')
  res.send(services)
}

// Create Service
export const createService = async (
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
  const newService = new Service({ name, description, isChecked })
  try {
    await newService.save()
  } catch (error) {
    console.log('error', error)
    return next(error)
  }
  res.status(201).json({ service: newService })
}
