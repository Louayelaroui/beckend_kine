const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    player: { type: String, trim: true },
    Quality: { type: Number, required: true },
    Stress: { type: Number, required: true },
    Fatigue: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
