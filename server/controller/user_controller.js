const schema = require("../validation/schema");
const Leads = require("../../models/leads");
const crypto = require("../tools/crypto");
const otp = require("../tools/otp");
const sms = require("../tools/sms");

exports.login = (req, res, next) => {
  try {
    // if (req.cookies["NU-NLIC"]) {
    //   return res.status(201).redirect("/dashboard");
    // }

    res.render("login", { message: "" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    // Validate user input
    const { error, value } = schema.loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .render("login", { message: error.details[0].message });
    }

    // Check if the user exists in the database
    const result = await Leads.findOne({
      where: { phone_num: value.phone_num },
    });

    if (!result) {
      return res
        .status(400)
        .render("login", { message: "Invalid user / No user found" });
    }
    const otpdata = await otp.generateOtp();
    const data = {
      user: result.phone_num,
      user_id: result.lead_id,
      otp: otpdata,
    };
    const encryptedData = await crypto.encrypt(data);

    res.cookie("NU-NLIC", encryptedData, { maxAge: 150000 });

    // Send a success response
    await sms(otpdata, value.phone_num);

    res.render("otp", { message: "" });
  } catch (error) {
    next(error);
  }
};

exports.otpVerification = async (req, res, next) => {
  try {
    const { otpr } = req.body;
    const cookie = req.cookie;

    if (!cookie) {
      return res.status(400).render("otp", {
        message: "Invalid user / requested OTP from another device",
      });
    }

    const data = await crypto.decryption(cookie);

    if (data.otp !== otpr) {
      return res.status(400).render("otp", { message: "Incorrect OTP" });
    }

    const isOtpValid = await otp.verifyOtp(otpr);
    if (!isOtpValid) {
      return res.status(400).render("otp", { message: "Invalid OTP" });
    }
    const result = await Leads.findOne({
      where: { phone_num: data.user, lead_id: data.user_id },
    });
    if (!result) {
      res.status(404).json({ error: "User Not Found" });
    }
    const cookie_data = {
      user_id: result.phone_num,
    };
    const encryptdata = await crypto.encrypt(cookie_data);
    res.clearCookie("NU-NLIC");
    res.cookie("NU-NLIC", encryptdata);
    res.status(200).redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = (req, res, next) => {
  try {
    res.status(200).render("dashboard");
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("NU-NLIC");
    res.status(302).redirect("/");
  } catch {
    next(error);
  }
};
