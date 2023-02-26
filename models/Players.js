const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    position: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    number: { type: String, required: true },
    Urlimage: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);
