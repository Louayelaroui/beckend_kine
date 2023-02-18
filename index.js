const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlayerRoute = require("./routes/Player");
const QuizRoute = require("./routes/Quiz");
const injuriesRoute = require("./routes/Injuries");
mongoose.set('strictQuery', false);
const url ='mongodb+srv://doadmin:1v4357Cnea8m29WS@kineapp-d597f5f8.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=kineapp';
mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connection Successfull!")})
  .catch((err) => {
    console.log("DB Connection failed: " + err);
  });

  const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/player", PlayerRoute);
app.use("/api/quiz", QuizRoute);
app.use("/api/injuries", injuriesRoute);

app.listen( PORT, () => {
    console.log(`Backend server is running at port ${PORT}` );
  });


