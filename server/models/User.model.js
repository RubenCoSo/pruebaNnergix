const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const mesureSchema = new Schema(
  {
    Month: {
      type: String,
    },
    alpha: Number,
    "Mean vel110 (m/s)": Number,
    "Mean vel89 (m/s)": Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Mesure = model("Mesure", MesureSchema);

module.exports = Mesure;
