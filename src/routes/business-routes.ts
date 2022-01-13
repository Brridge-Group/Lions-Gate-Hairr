import express from 'express'
const router = express.Router({ mergeParams: true })

import {
  showBusiness,
  addBusiness,
  getAllBusinesses,
  getCityByName
} from "../controllers/business-controller";


router.post("/add-business", addBusiness);

router.get("/get-businesses", getAllBusinesses);

router.route("/get-business-by-id/:id").get(showBusiness);

router.route('search/:cityName').get(getCityByName)

export default router;
