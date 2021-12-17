import expressLoader from './express'
import mongooseLoader from './mongoose'

const indexLoader = async (expressApp: any) => {
  const mongoConnection = await mongooseLoader();
  console.log("MongoDB Initialized")

  await expressLoader(expressApp);
  console.log("Express Initialized");

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}

export default indexLoader;