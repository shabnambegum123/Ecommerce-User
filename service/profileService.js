const { Profile, Otp } = require("../Database/modal");
const { statusCodes } = require("../response/httpStatusCode");
const { statusMessage } = require("../response/httpStatusMessage");
const { generatePassword } = require("../Helpers/bcrypt");
const { messages } = require("../response/customMessages");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { forgetPassword, sendOtp } = require("../apiService/internalService");
const { generateOtp, generateOtpId } = require("../Utils/generateOtp");

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

    let result = await Profile.create(passData);

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
      params.Password = await generatePassword(params.password);
    }

    const result = await Profile.findOneAndUpdate(
      { ProfileId: params.ProfileId },
      { $set: params },
      { new: true }
    );
    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.updateProfile,
        data: [],
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

const loginProfileService = async (params) => {
  try {
    if (params.EmailId && params.password) {
      let EmailId = params.EmailId;
      let password = params.password;
      var token = await Profile.findOne({ EmailId: EmailId });
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
    } else if (params.otp) {
      const token = await Otp.findOne({ otp: params.otp });
      if (token) {
        var check = await Profile.findOne({ ProfileId: token.profileId });
        if (check) {
          let value = {
            EmailId: check.EmailId,
            Name: check.Name,
            profileId: check.ProfileId,
            role: check.role,
            _id: check._id,
          };
          let generateToken = jwt.sign(value, process.env.secretKey, {
            expiresIn: process.env.expiresIn,
          });
          token.generateToken = generateToken;
          return {
            status: true,
            statusCode: statusCodes?.HTTP_OK,
            message: messages?.loginSuccessful,
            data: { ...check.toObject(), generateToken },
          };
        }
      } else {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_BAD_REQUEST,
          message: messages?.invalidOtp,
          data: [],
        };
      }
    }
  } catch (error) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: error.message,
    };
  }
};

const forgetPasswordService = async (params) => {
  try {
    let EmailId = params.EmailId;
    var result = await Profile.findOne({ EmailId: EmailId });

    if (result) {
      let value = {
        EmailId: result.EmailId,
        Name: result.Name,
        ProfileId: result.ProfileId,
        role: result.role,
      };
      let generatetoken = jwt.sign(value, process.env.secretKey, {
        expiresIn: process.env.expiresIn,
      });
      result.generatetoken = generatetoken;

      let mailObject = {
        token: generatetoken,
        emailId: result.EmailId,
        Name: result.Name,
        type: "forgetPassword",
      };
      const axios = await forgetPassword(mailObject);
    }
    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.TokenSent,
        data: [],
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

const resetPasswordService = async (params) => {
  let ProfileId = params.ProfileId;
  let newPassword = params.newPassword;
  let conformPassword = params.conformPassword;
  let oldPassword = params.oldPassword;
  if (newPassword == conformPassword) {
    var checkPassword = await Profile.findOne({ ProfileId: ProfileId });
    let comparepass = await bcrypt.compare(oldPassword, checkPassword.password);
    if (comparepass) {
      newPassword = await generatePassword(newPassword);
      var updatePassword = await Profile.findOneAndUpdate(
        { ProfileId: params.ProfileId },
        { $set: { password: await generatePassword(params.newPassword) } },
        { new: true }
      );
      if (updatePassword) {
        return {
          status: true,
          statusCode: statusCodes?.HTTP_OK,
          message: messages?.updatePassword,
          data: [],
        };
      }
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: messages?.IncorrectOldPassword,
        data: [],
      };
    }
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: messages?.InCorrectConformPassword,
      data: [],
    };
  }
};

const changePasswordService = async (params) => {
  try {
    let token = params.token;
    let password = await generatePassword(params.password);

    const verify = await jwt.verify(token, process.env.secretKey);

    const result = await Profile.findOneAndUpdate(
      { ProfileId: verify.ProfileId },
      { $set: { password: password } },
      { new: true }
    );
    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.updateProfile,
        data: [],
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

const listProfileService = async (params) => {
  try {
    let token = params.token;
    let password = await generatePassword(params.password);

    const verify = await jwt.verify(token, process.env.secretKey);

    const result = await Profile.findOneAndUpdate(
      { ProfileId: verify.ProfileId },
      { $set: { password: password } },
      { new: true }
    );
    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.updateProfile,
        data: [],
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

const deleteProfileService = async (params) => {
  try {
    let ProfileId = params.ProfileId;
    const result = await Profile.findOneAndUpdate(
      { ProfileId: ProfileId },
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.deleteProfile,
        data: [],
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

const getProfileByIdService = async (params) => {
  try {
    const fieldsToReturn = "Name EmailId mobileNumber role password cartId";
    let ProfileId = params.ProfileId;
    var result = await Profile.findOne({
      ProfileId: ProfileId,
      isDeleted: false,
    }).select(fieldsToReturn);
    if (result) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.listedProfile,
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

const loginMobileNumberService = async (params) => {
  try {
    let mobileNumber = params.mobileNumber;
    var result = await Profile.find({ mobileNumber: mobileNumber });
    var otp = await generateOtp();

    let createOtp = {
      otp: otp,
      profileId: result[0].ProfileId,
      otpId: generateOtpId(),
    };

    let create = await Otp.create(createOtp);
    let mailObject = {
      mobileNumber: result[0].mobileNumber,
      type: "sendOtp",
      otp: otp,
      send: params.send,
    };

    const axios = await sendOtp(mailObject);
    if (axios) {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.listedProfile,
        data: axios,
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

module.exports = {
  CreateProfileService,
  updateProfileService,
  getProfileByIdService,
  loginProfileService,
  forgetPasswordService,
  resetPasswordService,
  changePasswordService,
  listProfileService,
  deleteProfileService,
  loginMobileNumberService,
};
