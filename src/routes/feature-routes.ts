import express from "express";
const router = express.Router({mergeParams: true});

import { indexFeatures } from "../controllers/feature-controller";

router.route("/")
  .get(indexFeatures)

export default router;