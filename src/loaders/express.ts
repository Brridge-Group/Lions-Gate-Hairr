import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
var bodyParser = require('body-parser')

import itemsRoutes from '../routes/items-route'
import businessRoutes from '../routes/business-routes'
import serviceRoutes from '../routes/service-routes'
import featureRoutes from '../routes/feature-routes'
import userRoutes from '../routes/user-routes'
import reviewRoutes from '../routes/review-routes'

const expressLoader = async (app: express.Application) => {
  app.use(express.json({ limit: '50mb' }))
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
  })

  // server static files from the React app
  app.use(express.static(path.join(__dirname, '../../client/build')))

  app.use('/api/items', itemsRoutes)

  app.use('/api/services', serviceRoutes)

  app.use('/api/features', featureRoutes)

  app.use('/api/businesses', businessRoutes)

  app.use('/api/users', userRoutes)
  app.use('/api/reviews', reviewRoutes)

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req: Request, res: Response) => {
    console.log(__dirname)
    console.log(path.join(__dirname, '../../client/build/index.html'))
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
  })

  app.enable('trust proxy')
  app.use(cors())

  // ...More middlewares

  return app
}

export default expressLoader
