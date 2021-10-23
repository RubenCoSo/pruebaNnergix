const { Schema, model } = require("mongoose");

const mesureSchema = new Schema(
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

const Mesure = model("Mesure", MesureSchema);

module.exports = Mesure;
