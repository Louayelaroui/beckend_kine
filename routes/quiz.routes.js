const router = require("express").Router();
const Quiz = require("../models/quiz.model");

router.get("/test", (req, res) => {
  res.send("quiz test is successfull");
});
router.post("/add", async (req, res) => {
  const { Quality, Stress, Fatigue, player } = req.body;
  const verfQuiz = new Quiz({
    Quality: Quality,
    Stress: Stress,
    Fatigue: Fatigue,
    player: player,
  });
  try {
    const savedquiz = await verfQuiz.save();
    res.status(200).json(savedquiz);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.post("/getten", async (req, res) => {
  try {
    ten = await Quiz.find({}).limit(10);

    res.status(200).json(ten);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.post("/getplayerten", async (req, res) => {
  const { playerid } = req.body;

  try {
    ten = await Quiz.find({ player: playerid }).limit(10);

    res.status(200).json(ten);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
