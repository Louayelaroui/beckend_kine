const { Schema, default: mongoose, model } = require("mongoose");
const Player = require("./players.model");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "kine"],
    required: true,
    default: "kine",
  },
  token: { type: String },
});

const kineUserShema = new Schema({
  players: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const User = model("User", userSchema);
const KineUser = User.discriminator("KineUser", kineUserShema);

module.exports = { User, KineUser };
