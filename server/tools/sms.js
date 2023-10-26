const axios = require("axios");

const sendSMS = async (otp, mobile_no) => {
  try {
    const url = "https://enterprise.smsgupshup.com/GatewayAPI/rest";

    const params = {
      msg: `Dear Patron, Kindly click on this link to verify your mobile number ${otp}. Regards Team Nuron`,
      v: "1.1",
      userid: process.env.SMS_GUPSHUP_USERID,
      password: process.env.SMS_GUPSHUP_PASSWORD,
      send_to: mobile_no,
      msg_type: "text",
      method: "sendMessage",
    };

    const response = await axios.post(url, null, { params });

    if (response.status === 200) {
      return "SMS sent successfully";
    } else {
      return "Failed to send SMS";
    }
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
};

module.exports = sendSMS;
