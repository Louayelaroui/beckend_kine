const { findById } = require("../models/players.model");
const Player = require("../models/players.model");
const { KineUser } = require("../models/users.model");
const ExpressError = require("../utils/errorObject");

async function addPlayer(req, res, next) {
  try {
    const {
      firstname,
      lastname,
      email,
      date,
      category,
      position,
      height,
      weight,
      number,
      Urlimage,
    } = req.body;

    const user = await KineUser.findById(req.user.sub);
    console.log(user);

    const verfPlayer = new Player({
      firstname: firstname,
      lastname: lastname,
      email: email,
      date: date,
      category: category,
      position: position,
      height: height,
      weight: weight,
      number: number,
      Urlimage: Urlimage,
    });
    user.players.push(verfPlayer._id);
    const savedPlayer = await verfPlayer.save();
    user.save();
    res.status(200).json(savedPlayer);
  } catch (err) {
    next(err);
  }
}

async function updatePlayer(req, res, next) {
  try {
    const {
      firstname,
      lastname,
      email,
      date,
      category,
      position,
      height,
      weight,
      number,
      Urlimage,
    } = req.body;
    const id = req.params["id"];
    const data = await Player.updateOne(
      { _id: id },
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        date: date,
        category: category,
        position: position,
        height: height,
        weight: weight,
        number: number,
        Urlimage: Urlimage,
      }
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getPlayerById(req, res, next) {
  try {
    const id = req.params["id"];
    const data = await Player.findById(id);

    res.status(200).json(id);
  } catch (err) {
    next(err);
  }
}

async function getPlayersByCategory(req, res, next) {
  try {
    const category = req.params["category"];
    const data = await Player.find(category);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getAllPlayers(req, res, next) {
  try {
    const user = await KineUser.findById(req.user.sub).populate("players");

    if (!user) {
      throw new ExpressError("Bad request headers", 401);
    }

    res.status(200).json(user.players);
  } catch (err) {
    next(err);
  }
}

async function deletePlayer(req, res, next) {
  try {
    const id = req.params["id"];
    const data = await Player.findOneAndRemove({ _id: id });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function categoryPlayerPass(req, res, next) {
  try {
    res.status(200).json([
      { category: "U21", pass: "passU21" },
      { category: "U20", pass: "passU20" },
      { category: "U19", pass: "passU19" },
      { category: "U18", pass: "passU18" },
    ]);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerById,
  getAllPlayers,
  categoryPlayerPass,
  getPlayersByCategory,
  getPlayerById,
};
