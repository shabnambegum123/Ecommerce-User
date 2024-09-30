const express = require("express");
let app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const router = require("./Router/index");
app.use(router);
const dotenv = require("dotenv");
dotenv.config();

const { mongoose } = require("mongoose");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), `env`) });

const args = process.argv.slice(2)[0];

const config = require("./config/config")(args);

//console.log("args", dotenv.config({ path: path.join(process.cwd(), `.env`) }));

process.env.CONGIG_ARG = config;

const uri = process.env.mongoDb;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is looking for ${PORT}`);
});
