const bcrypt = require("bcrypt");

const generatePassword = async (params) => {
   console.log(params,909)
  const Password = await bcrypt.hash(params, 10);
  return Password;
};
module.exports = { generatePassword };
