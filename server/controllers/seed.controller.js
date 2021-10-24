const Location = require("../models/Location.model");
const Measure = require("../models/Measure.model");
const dataBackend = require("../data_backend.json");
const measuresData = require("../monthly_table_data.json");

module.exports.checkDB = async (req, res, next) => {
  try {
    const location = await Location.find();
    let modifiedLocation;
    if (location.length === 0) {
      Location.create(dataBackend)
        .then((newLocation) => {
          measuresData.forEach((measure) => {
            const extMeasure = { ...measure, location: newLocation._id };
            Measure.create(
              //   {
              //   month: measure[Month],
              //   alpha: measure.alpha,
              //   mean_vel110: measure["Mean vel110 (m/s)"],
              //   mean_vel89: measure["Mean vel89 (m/s)"],
              // }
              extMeasure
            ).then((newMeasure) => {
              Location.findByIdAndUpdate(
                newLocation._id,
                { $push: { monthly_measures: newMeasure._id } },
                { new: true }
              ).then((modLocation) => {
                modifiedLocation = modLocation;
                console.log(`newLocation`, modifiedLocation);
              });
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return res.status(200).json(modifiedLocation);
    }
    return res.status(200).json(location);
  } catch {
    return res.status(500).json(err);
  }
};
