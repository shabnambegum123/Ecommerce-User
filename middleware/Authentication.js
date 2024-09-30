const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Profile = require("../Database/modal/profile");
const { statusCodes } = require("../response/httpStatusCode");
const { messages } = require("../response/customMessages");
const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers["Authorization"] ||
      req.headers["x-access-token"] ||
      req.headers["authorization"];
    
    if (!token) {
      return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
        status: statusCodes.HTTP_UNAUTHORIZED,
        message: messages?.tokenEmpty,
        data: [],
      });
    }

    const decoded = jwt.verify(
      token.replace("Bearer", ""),
      process.env.secretKey
    );

    if (decoded.profileId) {
      console.log("qwefq", decoded.profileId);
      var userData = await Profile.findOne({
        ProfileId: decoded.profileId,
        isDeleted: false,
      });
    }
    if (userData) {
      if (!userData.isActive) {
        return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
          status: statusCodes.HTTP_UNAUTHORIZED,
          message: messages.userInactive,
          data: [],
        });
      }
      req.user = userData;
      next();
    } else {
      return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
        status: statusCodes.HTTP_UNAUTHORIZED,
        message: messages.tokenInvalid,
        data: [],
      });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
      status: statusCodes.HTTP_UNAUTHORIZED,
      message: messages.tokenInvalid,
      data: [],
    });
  }
};
const verifyRole =
  (roles = []) =>
  async (req, res, next) => {
    try {
      const token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["Authorization"];

      if (!token) {
        return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
          status: statusCodes.HTTP_UNAUTHORIZED,
          message: messages?.tokenEmpty,
          data: [],
        });
      }

      const decodedToken = jwt.verify(token, process.env.secretKey);

      if (roles.includes(decodedToken.role)) {
        return next();
      } else {
        return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
          status: statusCodes.HTTP_UNAUTHORIZED,
          message: messages.tokenInvalid,
          data: [],
        });
      }
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(statusCodes.HTTP_UNAUTHORIZED).json({
        status: statusCodes.HTTP_UNAUTHORIZED,
        message: messages.tokenInvalid,
        data: [],
      });
    }
  };

module.exports = { verifyRole, verifyToken };
