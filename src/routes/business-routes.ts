import express from "express";
const router = express.Router({mergeParams: true});

import { showBusiness, addBusiness } from "../controllers/business-controller";

router.route("/:id")
  .get(showBusiness)

router.post("/add-business", addBusiness);

export default router;