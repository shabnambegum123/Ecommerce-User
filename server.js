const express = require("express");
let app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const router = require("./Router/index");
app.use(router);
const dotenv = require("dotenv");
dotenv.config();




require("./Database/modal/index");

let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is looking for ${PORT}`);
})

