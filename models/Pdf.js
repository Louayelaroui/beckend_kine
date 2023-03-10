const mongoose = require("mongoose");

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
    pdfUrl: [{ data: Buffer, contentType: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);
