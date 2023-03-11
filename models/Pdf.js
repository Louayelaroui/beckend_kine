const mongoose = require("mongoose");

// const pdfSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   postedBy: { type: mongoose.Schema.Types.ObjectId, 
//     ref: "Player" },
//   pdfUrl: { Type: String },
//   createdAt: { type: Date, default: Date.now },
// }, { timestamps: true });

const pdfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    pdfUrl: { Type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);
