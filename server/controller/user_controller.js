const schema = require("../validation/schema");
const Leads = require("../../models/leads");
const crypto = require("../tools/crypto");
const otp = require("../tools/otp");
const sms = require("../tools/sms");
exports.login = async (req, res) => {
  try {
    // Validate user input
    const { error, value } = schema.loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user exists in the database
    const result = await Leads.findOne({
      where: { phone_num: value.phone_num },
    });

    if (!result) {
      return res.status(404).json({ error: "Invalid user / No user found" });
    }
    const otpdata = await otp.generateOtp();
    const data = {
      user: result.phone_num,
      user_id: result.lead_id,
      otp: otpdata,
    };
    const encryptedData = await crypto.encrypt(data);

    res.cookie("nu_tp", encryptedData, { maxAge: 150000 });

    // Send a success response
    await sms(otpdata, value.phone_num);
    res.status(200).json({ message: "Cookie has been set." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.otpVerification = async (req, res) => {
  try {
    const { otpr } = req.body;
    const cookie = req.cookies["nu_tp"];

    if (!cookie) {
      return res.status(400).json({ error: "Missing or expired OTP cookie" });
    }

    const data = await crypto.decryption(cookie);

    if (data.otp !== otpr) {
      return res.status(400).json({ error: "Incorrect OTP" });
    }

    const isOtpValid = await otp.verifyOtp(otpr);
    if (!isOtpValid) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    res.clearCookie("nu_tp");
    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
