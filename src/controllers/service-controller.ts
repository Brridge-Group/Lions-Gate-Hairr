import { Request, Response, NextFunction } from "express";

import Service from "../models/service";

export const indexServices = async (req: Request, res: Response) => {
  const services = await Service.find({});
  res.set("Access-Control-Allow-Origin", "");
  res.send(services);
};
