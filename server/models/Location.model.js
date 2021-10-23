const { Schema, model } = require("mongoose");

const locationSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    altitude: Number,
    created_by: String,
    lat: Number,
    lng: Number,
    monthly_mesures: [{ type: Schema.Types.ObjectId, ref: "Measure" }],
  },
  {
    timestamps: true,
  }
);

const Location = model("Location", locationSchema);

module.exports = Location;
