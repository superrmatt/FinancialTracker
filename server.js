const express = require("express"),
 logger = require("morgan"),
 mongoose = require("mongoose"),
 compression = require("compression"),
 password = require ("./password");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:" + password + "ds113866.mlab.com:13866/heroku_wbclk5m3";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});