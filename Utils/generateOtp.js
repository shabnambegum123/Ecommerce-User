

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  


 function generateOtpId(length = 24) {
    let hexString = '';
    const hexChars = '0123456789abcdef';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * hexChars.length);
        hexString += hexChars[randomIndex];
    }
    
    return hexString;
}



module.exports = {generateOtp,generateOtpId};
  