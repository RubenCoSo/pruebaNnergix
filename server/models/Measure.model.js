const { Schema, model } = require("mongoose");

const measureSchema = new Schema(
  {
    Month: {
      type: String,
    },
    alpha: Number,
    "Mean vel110 (m/s)": Number,
    "Mean vel89 (m/s)": Number,
    location: [{ type: Schema.Types.ObjectId, ref: "Location" }],
  },
  {
    timestamps: true,
  }
);

const Measure = model("Measure", measureSchema);

module.exports = Measure;
