const express = require("express");
const router = express.Router({mergeParams: true});

import { showBusiness } from "../controllers/business-controller";

router.route("/:id")
  .get(showBusiness)

export default router;