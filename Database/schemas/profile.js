const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  EmailId: { type: String, required: true, unique: true },
  ProfileId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  mobileNumber: { type: Number, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    default:null
  },
});

module.exports = profileSchema;

