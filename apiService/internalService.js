let { InternalAPIs } = require("../config/index");
let { Rest } = require("../restCalls/index");

const forgetPassword = async (data) => {
  try {
    let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.forgetPassword));

    urlPayload.data = {
      data: data,
    };

    let response = await Rest.callApi(urlPayload);

    return response.data;
  } catch (err) {
    console.log(">>>>>>", err);
    throw new Error(err);
  }
};

const sendOtp = async (data) => {
  try {
    let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.sendOtp));

    urlPayload.data = {
      data: data,
    };

    let response = await Rest.callApi(urlPayload);

    return response.data;
  } catch (err) {
    console.log(">>>>>>", err);
    throw new Error(err);
  }
};

module.exports = { forgetPassword ,sendOtp};
