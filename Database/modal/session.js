const mongoose = require("mongoose");
const sessionSchema = require("../schemas/session");

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
