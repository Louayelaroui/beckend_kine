const router = require("express").Router();
const Injury = require("../models/Injuries");

router.get("/test", (req, res) => {
  res.send("injuries test is successfull");
});

router.post("/add-comment/:id", async (req, res) => {
  try {
    // get the specific injury that we want to add
    // the comment to ..
    let injury = await Injury.findById(req.params["id"]);

    // get the comment from the request body
    const { comment } = req.body;

    // add the comment to the array of comments of the Injury
    injury.comment.push(comment);

    res.status(200).send("comment added successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send("couldn't add the comment");
  }
});

router.post("/add", async (req, res) => {
  const { comment, datedebut, description, degree, name, player, urlimage } =
    req.body;
  const verfInjury = new Injury({
    comment: comment,
    datedebut: datedebut,
    description: description,
    degree: degree,
    name: name,
    player: player,
    urlimage: urlimage,
  });
  try {
    const savedInjury = await verfInjury.save();
    res.status(200).json(savedInjury);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/getall", async (req, res) => {
  try {
    const all = await Injury.find({});
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/getbypalyerid", async (req, res) => {
  const { playerid } = req.body;

  try {
    ten = await Injury.find({ player: playerid });

    res.status(200).json(ten);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.post("/getone", async (req, res) => {
  const { injuryid } = req.body;

  try {
    one = await Injury.find({ _id: injuryid });

    res.status(200).json(one[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.post("/delete", async (req, res) => {
  const { deletedid } = req.body;

  try {
    const resultat = await Injury.findOneAndRemove({ _id: req.body.deletedid });
    res.status(200).json(resultat);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
