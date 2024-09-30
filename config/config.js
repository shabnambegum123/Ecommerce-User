module.exports = function (env) {
    const DEV_CONSTANTS = {
          database: "mongodb+srv://shabnambegum227:shabnam123@cluster0.vfakp.mongodb.net/Ecommerce",
          PORT:5000
    };
  
    const LOCAL_CONSTANTS = {
      database: "mongodb+srv://shabnambegum227:shabnam123@cluster0.vfakp.mongodb.net/Ecommerce",
      PORT:5000
    };
  
    const STAGE_CONSTANTS = {
      database: "mongodb+srv://shabnambegum227:shabnam123@cluster0.vfakp.mongodb.net/Ecommerce",
      PORT:5000
    };
  
    const PREPROD_CONSTANTS = {
      database: "mongodb+srv://shabnambegum227:shabnam123@cluster0.vfakp.mongodb.net/Ecommerce",
      PORT:5000
    };
  
    let envType;
  
    switch (env) {
      case "DEV":
        envType = DEV_CONSTANTS;
        break;
  
      case "LOCAL":
        envType = LOCAL_CONSTANTS;
        break;
  
      case "STAGE":
        envType = STAGE_CONSTANTS;
        break;
  
      case "PREPROD":
        envType = PREPROD_CONSTANTS;
        break;
  
      default:
        envType = { NA: "NA" };
        break;
    }
  
    return envType;
  };
  