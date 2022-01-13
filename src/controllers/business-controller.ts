import { Request, Response, NextFunction } from 'express'

import Business from '../models/business'

export const showBusiness = async (req: Request, res: Response) => {
  const { id } = req.params
  const business = await Business.findById(id).populate('services')
  await business.populate('features')
  res.set('Access-Control-Allow-Origin', '')
  res.send(business)
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
