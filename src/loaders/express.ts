import express, { Request, Response} from 'express'
import path from 'path'
import cors from "cors";

import itemsRoutes from '../routes/items-route'
import businessRoutes from "../routes/business-routes";
import serviceRoutes from "../routes/service-routes";
import featureRoutes from "../routes/feature-routes";

const expressLoader = async (app: express.Application)=>{
  app.use(express.json());

  // server static files from the React app
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.use("/api/items", itemsRoutes);

  app.use("/api/businesses", businessRoutes);

  app.use("/api/services", serviceRoutes);

  app.use("/api/features", featureRoutes);

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (req: Request, res: Response) => {
    console.log(__dirname);
    console.log(path.join(__dirname, "../../client/build/index.html"));
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

  app.enable("trust proxy");
  app.use(cors());

  // ...More middlewares

  return app;

};

export default expressLoader;