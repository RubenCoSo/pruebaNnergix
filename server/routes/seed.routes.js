const express = require("express");
const router = express.Router();
const { checkDB } = require("../controllers/seed.controller");

router.get("/checkDb", checkDB);

module.exports = router;
