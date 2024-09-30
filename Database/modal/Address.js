
const mongoose = require("mongoose");
const AddressSchema = require("../schemas/Address");

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
