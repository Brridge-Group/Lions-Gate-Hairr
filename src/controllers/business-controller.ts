import { Request, Response, NextFunction } from "express";

import Business from "../models/business";

export const showBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  const business = await Business.findById(id).populate("services")
  await business.populate("features");
  res.set("Access-Control-Allow-Origin", "");
  res.send(business);
};
