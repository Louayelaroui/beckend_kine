const router = require("express").Router();
const pdf = require("../models/Pdf");
const multer =require('multer');
router.get("/test",(req,res)=>{
    res.send("pdfs test is successfull");
});
const Storage = multer.diskStorage({
  destination :'upload',
  filename:(req,file,cd)=>{
    cd(null,file.originalname);
  },
});
const upload =multer({
  storage:Storage
}).single('testimage')

router.post("/add",async(req,res)=>{
    // const {pdfurl} = req.body;
    // const verfpdf = new pdf ({
    //     pdfurl:pdfurl
    //   });
    upload(req,res,(err)=>{
      if(err){
        console.log(err)
      }else{
        const verfpdf = new pdf({
          pdfurl:{
            data:req.file.filename,
            contentType:'application/pdf'
          }
        })
        verfpdf.save().then(()=>res.send('successfully uploaded')).catch((err)=>console.log(err))
        
      }
    })



    // try {
    //   const savedpdf = await verfpdf.save();
    //   res.status(200).json(savedpdf);
    // } catch (error) {
    //   res.status(500).json(error.message)
    // }
  });
router.get("/getall",async(req,res)=>{
    try {
      const all =await pdf.find({});
      res.status(200).json(
         all
      );
    } catch (error) {
      res.status(500).json(error);
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