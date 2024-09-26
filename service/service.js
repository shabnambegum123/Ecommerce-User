const profile = require("../Database/modal/profile");
const { statusCodes } = require("../response/httpStatusCode");
const { statusMessage } = require("../response/httpStatusMessage");
const { generatePassword } = require("../Helpers/bcrypt");
const { messages } = require("../response/customMessages");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const CreateProfileService = async (params) => {
  try {
    let passData = {
      Name: params.Name,
      EmailId: params.EmailId,
      password: params.password,
      mobileNumber: params.mobileNumber,
      role: params.role,
      ProfileId: params.ProfileId,
      cartId: params.cartId,
    };

    passData.password = await generatePassword(params.password);

    let result = await profile.create(passData);

    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.createProfile,
        data: result,
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: messages?.Error,
        data: [],
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

const updateProfileService = async (params) => {
  try {
    if (params.password) {
      params.password = await generatePassword(params.password);
    }
    var result = await profile.update(params, {
      where: { profileId: params.profileId },
      returning: true,
    });

    if (updataData) {
      return {
        statusCode: 200,
        status: true,
        message: "updated",
        data: updataData,
      };
    } else {
      return {
        statusCode: 400,
        status: false,
        message: "not updated",
        data: {},
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      status: false,
      message: "error",
      data: {},
    };
  }
};

const loginProfileService = async (params) => {
  try {
    let EmailId = params.EmailId;
    let password = params.password;
    var token = await profile.findOne({ EmailId: EmailId });

    if (token) {
      let value = {
        EmailId: token.EmailId,
        Name: token.Name,
        profileId: token.ProfileId,
        role: token.role,
        _id: token._id,
      };
      let comparepass = await bcrypt.compare(password, token.password);
      if (comparepass) {
        let generateToken = jwt.sign(value, process.env.secretKey, {
          expiresIn: process.env.expiresIn,
        });
        token.generateToken = generateToken;
        return {
          status: true,
          statusCode: statusCodes?.HTTP_OK,
          message: messages?.loginSuccessful,
          data: { ...token.toObject(), generateToken },
        };
      } else {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_BAD_REQUEST,
          message: messages?.InvalidPassword,
          data: [],
        };
      }
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: messages?.userNotExist,
        data: [],
      };
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

module.exports = {
  CreateProfileService,
  updateProfileService,
  // getProfileByIdService,
  loginProfileService,
};
