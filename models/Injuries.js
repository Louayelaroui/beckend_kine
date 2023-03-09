const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, 
    ref: "Injury" },
  createdAt: { type: Date, default: Date.now },
});

const injurySchema = new mongoose.Schema(
  {
    player: {type: String, trim: true },
    name :{type : String,  required: true},
    degree :{type : String,  required: true},
    description :{type : String,  required: true},
    datedebut :{type : String,  required: true}, 
    comments: [commentSchema],
    urlimage:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Injury", injurySchema);
