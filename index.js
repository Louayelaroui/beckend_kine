const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PlayerRoute = require("./routes/Player");
const QuizRoute = require("./routes/Quiz");
const AuthRoute = require("./routes/auth.routes");
const injuriesRoute = require("./routes/Injuries");
const { config } = require("./config/config");
const bodyParser = require("body-parser");

// set up the view engine to be ejs
app.set("view engine", "ejs");

// DataBase connection
mongoose.set("strictQuery", false);
/* const url ='mongodb+srv://doadmin:1v4357Cnea8m29WS@kineapp-d597f5f8.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=kineapp'; */
const url = config.MONGO_URI;
mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connection Successfull!");
  })
  .catch((err) => {
    console.log("DB Connection failed: " + err);
  });

const PORT = config.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use("/auth", AuthRoute);
app.use("/api/player", PlayerRoute);
app.use("/api/quiz", QuizRoute);
app.use("/api/injuries", injuriesRoute);

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});
