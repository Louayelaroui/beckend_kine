const router = require("express").Router();
const Pdf = require("../models/Pdf");
const Player = require("../models/Players");
const multer =require('multer');
router.get("/test",(req,res)=>{
    res.send("pdfs test is successfull");
});


router.post("/add", async (req, res) => {
  const { playerId, name, pdfUrl} = req.body;
  const player = await Player.findById(playerId);

  if (!player) {
    return res.status(400).json({ message: "Player not found" });
  }


  const newPdf = new Pdf({
    name: name,
    player: playerId,
    pdfUrl: pdfUrl,
  });

  try {
    await newPdf.save();
    res.status(200).json({ message: "Pdf uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 router.get("/getall", async (req, res) => {
    const { playerId } = req.query;
  
    try {
      const pdfs = await Pdf.find({ player: playerId }).populate("player");
      res.status(200).json(pdfs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post("/delete",async(req,res)=>{
    const {deletedid}=req.body;
   
    try {
      const resultat = await pdf.findOneAndRemove({_id: req.body.deletedid});
      res.status(200).json(resultat);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
module.exports=router;
