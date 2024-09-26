const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  
  
  const {
    CreateProfileService,
    updateProfileService,
    getProfileByIdService,
    loginProfileService
  } = require("../service/service");
  
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
    )                                                                                                                                                                                                                                                                                
  };

  const updateProfile = async (req, res) => {
   
    const params = req.body;
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

  const  getProfileById = async (req, res) => {
    const params = req.body;
    const result = await  getProfileByIdService(params);
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


  const  loginProfile = async (req, res) => {
    const params = req.body;
    const result = await  loginProfileService(params);
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
    loginProfile
  };
  