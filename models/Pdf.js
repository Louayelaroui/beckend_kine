const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    
    pdfurl :{data:Buffer, contentType: String }, 
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);