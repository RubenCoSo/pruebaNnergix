const Location = require("../models/Location.model");
const Measure = require("../models/Measure.model");

module.exports.getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();

    let locationNames = locations.map((location) => location.name);

    return res.status(200).json(locationNames);
  } catch {
    return res.status(500).json(err);
  }
};

module.exports.getAllMeasures = async (req, res, next) => {
  try {
    const { locationName } = req.params;
    // return console.log(locationName);
    const location = await Location.find({ name: locationName }).populate(
      "monthly_measures"
    );
    return res.status(200).json(location[0].monthly_measures);
  } catch {
    return res.status(500);
  }
};

module.exports.putMeasure = async (req, res, next) => {
  try {
    const { measureId, yearMonth, meanVel110, meanVel89, alpha } = req.body;

    const modMeasure = await Measure.findByIdAndUpdate(
      measureId,
      {
        Month: yearMonth,
        alpha,
        "Mean vel110 (m/s)": meanVel110,
        "Mean vel89 (m/s)": meanVel89,
      },
      { new: true }
    );
    console.log(modMeasure);
    return res.status(200).json(modMeasure);
  } catch {
    return res.status(500);
  }
};
