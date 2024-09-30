module.exports = {
  forgetPassword: {
    method: "POST",
    url: "http://localhost:5001/forget/password",
    headers: {
      contentType: "application/json",
    },
    data: {},
  },

  sendOtp: {
    method: "POST",
    url: "http://localhost:5001/send/OTP",
    headers: {
      contentType: "application/json",
    },
    data: {},
  },
};
