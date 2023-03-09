const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlayerRoute = require("./routes/Player");
const QuizRoute = require("./routes/Quiz");
const injuriesRoute = require("./routes/Injuries");
const pdfRoutes =require('./routes/Pdf')
mongoose.set('strictQuery', false);
const url ='mongodb://127.0.0.1:27017/back-end';
mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connection Successfull!")})
  .catch((err) => {
    console.log("DB Connection failed: " + err);
  });
app.use(express.json());
app.use("/api/player", PlayerRoute);
app.use("/api/quiz", QuizRoute);
app.use("/api/injuries", injuriesRoute);
app.use('/api/pdf',pdfRoutes);
app.listen( 5000, () => {
    console.log("Backend server is running at port", 5000 );
  });
