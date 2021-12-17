import { Request, Response, NextFunction } from "express";

import Feature from "../models/feature";

export const indexFeatures = async (req: Request, res: Response) => {
  const features = await Feature.find({});
  res.set("Access-Control-Allow-Origin", "");
  res.send(features);
};
