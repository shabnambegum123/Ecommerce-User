const jwt = require("jsonwebtoken");

let generateToken = async (Token) => {
  console.log("Token" , Token)
  const token =  await jwt.verify(Token, process.env.secretKey);
  return token
};

module.exports = {generateToken}

