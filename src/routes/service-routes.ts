import express from "express";
const router = express.Router({mergeParams: true});

import { indexServices } from "../controllers/service-controller";

router.route("/")
  .get(indexServices)

export default router;