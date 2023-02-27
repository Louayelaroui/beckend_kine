const jwt = require("jsonwebtoken");
const { Types } = require("mongoose");
const { config } = require("../config/config");
const { KineUser } = require("../models/users.model");
const Player = require("../models/players.model");
const ExpressError = require("../utils/errorObject");

function isAuthLocalStorage(req, res, next) {
  try {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("../scratch");
    }

    const token = localStorage.getItem("token");

    const decoded = jwt.decode(token, config.JWT_SECRET);

    if (!decoded) {
      throw new ExpressError("Missing authorization in local storage", 401);
    }

    // store user
    req.user = decoded;

    // forward request to next handler
    next();
  } catch (err) {
    return res.redirect("/admin/signin");
  }
}

function isAuthHeaders(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new ExpressError("Missing authorization header");

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new ExpressError("Missing authorization header");
    }

    const decoded = jwt.decode(token, config.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

async function checkUserPlayerOwnership(req, res, next) {
  try {
    const playerId = req.params["playerId"];
    const user = await KineUser.findById(req.user.sub);

    if (!user.players.includes(Types.ObjectId(playerId))) {
      throw new ExpressError("Unauthorized Request", 401);
    }

    req.player = await Player.findById(playerId);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  isAuthLocalStorage,
  isAuthHeaders,
  checkUserPlayerOwnership,
};
