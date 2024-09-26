const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  DoorNo: { type: String, required: true },
  Floor: { type: String, required: true },
  Area: { type: String, required: true },
  streetName: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: Number, required: true },
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
