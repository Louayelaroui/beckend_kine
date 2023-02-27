const mongoose = require("mongoose");

const injurySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    degree: { type: String, required: true },
    description: { type: String, required: true },
    datedebut: { type: String, required: true },
    player: { type: mongoose.Types.ObjectId, ref: "Player" },
    comment: [{ type: String }],
    urlimage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Injury", injurySchema);
