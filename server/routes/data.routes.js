const express = require("express");
const {
  getAllLocations,
  getAllMeasures,
} = require("../controllers/data.controllers");
const router = express.Router();

router.get("/allLocations", getAllLocations);

router.get("/allMeasures/:locationName", getAllMeasures);

module.exports = router;
