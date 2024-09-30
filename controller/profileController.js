const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");

const {
  CreateProfileService,
  updateProfileService,
  getProfileByIdService,
  loginProfileService,
  forgetPasswordService,
  resetPasswordService,
  changePasswordService,
  listProfileService,
  deleteProfileService,
  loginMobileNumberService
} = require("../service/profileService");

// admin related api's

const CreateProfile = async (req, res) => {
  const params = req.body;
  const result = await CreateProfileService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const updateProfile = async (req, res) => {
  const params = req.body;
  params.ProfileId = req.user.ProfileId;

  const result = await updateProfileService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const getProfileById = async (req, res) => {
  const params = req.user
  const result = await getProfileByIdService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const loginProfile = async (req, res) => {
  const params = req.body;
  const result = await loginProfileService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const forgetPassword = async (req, res) => {
  const params = req.body;

  const result = await forgetPasswordService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const changePassword = async (req, res) => {
 
  const params = req.body;
  params.token = req.headers.authorization
  
  const result = await changePasswordService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};


const resetPassword = async (req, res) => {
 
  const params = req.body;
  params.ProfileId = req.user.ProfileId
  const result = await resetPasswordService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};


const listProfile = async (req, res) => {
 
  const params = req.body;
  params.ProfileId = req.user.ProfileId
  const result = await listProfileService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const deleteProfile = async (req, res) => {
 
 let params =  req.user
  const result = await deleteProfileService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const  loginMobileNumber = async (req, res) => {
 
  let params =  req.body
   const result = await  loginMobileNumberService(params);
   if (!result.status) {
     return sendErrorResponse(
       req,
       res,
       result?.statusCode,
       result?.message,
       result?.data
     );
   }
   return sendSuccessResponse(
     req,
     res,
     result?.statusCode,
     result?.message,
     result?.data
   );
 };



module.exports = {
  CreateProfile,
  updateProfile,
  getProfileById,
  loginProfile,
  forgetPassword,
  resetPassword,
  changePassword,
  listProfile,
  deleteProfile,
  loginMobileNumber
};
