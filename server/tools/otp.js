const speakeasy = require("speakeasy");
const generateOtp = async () => {
  return speakeasy.totp({
    secret: process.env.OTP_SECRET,
    encoding: "base32",
    step: 30,
    window: 4,
    digits: 4,
  });
};

const verifyOtp = async (userOTP) => {
  return speakeasy.totp.verify({
    secret: process.env.OTP_SECRET,
    encoding: "base32",
    token: userOTP,
    step: 30,
    window: 4,
    digits: 4,
  });
};

module.exports = {
  generateOtp,
  verifyOtp,
};
