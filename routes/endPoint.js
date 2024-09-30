const routes = {
  v1: {
    user: {
      CreateProfile: "/v1/create/profile",
      loginProfile: "/v1/login/profile",
      updateProfile: "/v1/update/profile",
      forgetPassword :"/v1/forget/password",
       resetPassword:"/v1/reset/password",
       changePassword:"/v1/change/password",
       deleteProfile:"/v1/delete/profile",
       getById :"/v1/getBy/Id",
      loginMobileNumber:"/v1/login/number"
    },
  },
};

module.exports = { routes }
