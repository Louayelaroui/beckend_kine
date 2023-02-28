const Injury = require("../models/injuries.model");
const Player = require("../models/players.model");

async function addComment(req, res, next) {
  try {
    // get the comment from the request body
    const { comment } = req.body; // get the specific injury that we want to add

    console.log(comment);

    const injuryId = req.params["injuryId"];

    // the comment to ..
    let injury = await Injury.findById(injuryId);

    // add the comment to the array of comments of the Injury
    injury.comment.push(comment);

    await injury.save();

    res.status(200).send("comment added successfully");
  } catch (err) {
    next(err);
  }
}

async function addPlayerInjury(req, res, next) {
  try {
    const { comment, datedebut, description, degree, name, urlimage } =
      req.body;

    const player = req.player;
    const verfInjury = new Injury({
      comment: comment,
      datedebut: datedebut,
      description: description,
      degree: degree,
      name: name,
      player: player._id,
      urlimage: urlimage,
    });

    player.injuries.push(verfInjury);

    const savedInjury = await verfInjury.save();

    player.save();

    res.status(200).json(savedInjury);
  } catch (err) {
    next(err);
  }
}

async function getAllInjuries(req, res, next) {
  try {
    const data = await Injury.find({});
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getPlayerInjuries(req, res, next) {
  try {
    const playerId = req.params["playerId"];

    const data = await Player.findById(playerId).populate(injuries);

    res.status(200).json(data.injuries);
  } catch (err) {
    next(err);
  }
}

async function getInjuryById(req, res, next) {
  try {
    const { injuryid } = req.body;
    const data = await Injury.findById(injuryid);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function deleteInjury(req, res, next) {
  try {
    const { deletedid } = req.body;

    const data = await Injury.findOneAndRemove({ _id: deletedid });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  deleteInjury,
  getInjuryById,
  getAllInjuries,
  addPlayerInjury,
  addComment,
  getPlayerInjuries,
};
