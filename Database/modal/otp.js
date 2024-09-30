const mongoose = require("mongoose");
const otpSchema = require("../schemas/otp");

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
