const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  token: { type: String, required: true },
  ipAddress: { type: String, required: true },
  deviceId: { type: String, required: true },
  isLogin: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = sessionSchema;
