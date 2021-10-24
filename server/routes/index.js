const router = require("express").Router();
const seedRouter = require("./seed.routes");
const dataRouter = require("./data.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/seed", seedRouter);

router.use("/data", dataRouter);

module.exports = router;
