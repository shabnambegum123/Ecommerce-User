const bcrypt = require("bcrypt");

const generatePassword = async (params) => {
   
  const Password = await bcrypt.hash(params, 10);
  return Password;
};

module.exports = { generatePassword };