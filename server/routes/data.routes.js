const express = require("express");
const {
  getAllLocations,
  getAllMeasures,
  putMeasure,
} = require("../controllers/data.controllers");
const router = express.Router();

router.get("/allLocations", getAllLocations);

router.get("/allMeasures/:locationName", getAllMeasures);

router.put("/measureUpdate", putMeasure);

module.exports = router;
