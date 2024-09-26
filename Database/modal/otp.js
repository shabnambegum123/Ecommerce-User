const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: { type: String, required: true, expires: "1D" },
  createdAt: { type: Date, default: Date.now },
  otpId: { type: mongoose.Schema.Types.ObjectId, required: true },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp