import { Request, Response, NextFunction } from 'express'
const mongoose = require('mongoose')
var createError = require('http')

const Item = require('../models/item')

const getItems = async (req: Request, res: Response, next: NextFunction) => {
  let items: []

  try {
    items = await Item.find()
    if (items.length > 0) {
      res.status(201).json(items)
    } else {
      res.json("Couldn't find items")
    }
  } catch (err) {
    const error = createError(500, "Couldn't retrieve items!" + err)
    return next(error)
  }
}

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const { name, description } = req.body

  const createdItem = new Item({
    name,
    description
  })

  try {
    await createdItem.save()
  } catch (err) {
    const error = createError(500, 'Creating item failed, please try again.')
    return next(error)
  }

  res.status(201).json({ item: createdItem })
}

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  const itemId = req.params.id

  console.log(req.body)
  const { name, description } = req.body

  let item
  try {
    item = await Item.findById(itemId)
  } catch (error) {
    return next(error)
  }

  item.name = name
  item.description = description

  try {
    const result = await item.save()
  } catch (err) {
    return next(err)
  }

  res.status(200).json({ item: item.toObject({ getters: true }) })
}

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  let item

  const itemId = req.params.id

  try {
    item = await Item.findById(itemId)
  } catch (err) {
    return next(err)
  }

  res.json({ item })
}

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  let item

  const itemId = req.params.id

  try {
    item = await Item.findById(itemId)
  } catch (err) {
    return next(err)
  }

  try {
    if (item) {
      await item.remove()
    }
  } catch (err) {
    return next(err)
  }

  res.json({ message: 'Delete successfully' })
}

exports.getItems = getItems
