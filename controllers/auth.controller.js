const { User, KineUser } = require("../models/users.model");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const ExpressError = require("../utils/errorObject");

async function signIn(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await KineUser.findOne({ username });
    if (!user) {
      throw new ExpressError("User not found", 404);
    }

    if (!(password == user.password)) {
      throw new ExpressError("User Credentials are Wrong", 401);
    }

    const payload = {
      sub: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.JWT_SECRET);

    res.status(200).json({
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const user = await KineUser.findById(req.user.sub);
    user.token = "";

    user.save();
    res.status(200).send("logged out successfully");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signIn,
  logout,
};
