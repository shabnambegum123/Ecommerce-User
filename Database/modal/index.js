const mongoose = require("mongoose");

const uri =
  "mongodb+srv://shabnambegum227:shabnam123@cluster0.vfakp.mongodb.net/Ecommerce";

const Profile = require("./profile");
const Otp = require("./otp");
const Address = require("./Address");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

  

module.exports = { mongoose, Profile, Otp };
