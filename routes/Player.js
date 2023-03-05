const router = require("express").Router();
const Player = require("../models/Players");

router.get("/test",(req,res)=>{
    res.send("player test is successfull");
});
router.post("/add",async(req,res)=>{
    const {firstname,lastname, email, date,category,position,height,weight,number,Urlimage} = req.body;
    const verfPlayer = new Player ({
      firstname:firstname ,
      lastname: lastname,
      email:email,
      date:date,
      category:category,
      position: position,
      height: height,
      weight:weight,
      number:number,
      Urlimage:Urlimage
      });
    try {
      const savedPlayer = await verfPlayer.save();
      res.status(200).json(savedPlayer);
    } catch (error) {
      res.status(500).json(error.message)
    }
  });
router.post("/update",async(req,res)=>{
    try {
    const {firstname,lastname, email, date,category,position,height,weight,number,Urlimage} = req.body;
      const resulta= await Player.updateOne({_id : req.body._id}, {
      firstname:firstname ,
      lastname: lastname,
      email:email,
      date:date,
      category:category,
      position: position,
      height: height,
      weight:weight,
      number:number,
      Urlimage:Urlimage
      });
      res.status(200).json(resulta);
    } catch (error) {
      res.status(500).json(error.message);
    }
   
  
  });
router.post("/getone",async(req,res)=>{
    const {playerid}=req.body;
    
  try {
    
         one = await Player.find({_id:playerid});
         
         res.status(200).json(one[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
  });
  router.post("/getplayersbycategory",async(req,res)=>{
    const {category}=req.body;
    
  try {
    
         one = await Player.find({category:req.body.category});
         
         res.status(200).json(one);
  } catch (error) {
    res.status(500).json(error.message);
  }
  });
router.get("/getall",async(req,res)=>{
    try {
      const all =await Player.find({});
      res.status(200).json(
        all
      );
    } catch (error) {
      res.status(500).json(error);
    }
    
  
  });
router.post("/delete",async(req,res)=>{
    const {deletedid}=req.body;
    console.log(deletedid);
    try {
      const resultat = await Player.findOneAndRemove({_id: req.body.deletedid});
      res.status(200).json(resultat);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  router.get("/categorypass",async(req,res)=>{
    
    try {
     
      res.status(200).json(
        [{"category":"U21","pass":"passU21"},{"category":"U20","pass":"passU20"},{"category":"U19","pass":"passU19"},{"category":"U18","pass":"passU18"}]
      );
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
module.exports=router;