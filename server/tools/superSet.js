const axios = require("axios");

async function getToken(s_id, dashboard_id) {
  try {
    // Step 1: Get the access token
    const loginData = {
      username: process.env.SUPER_SET_USERNAME,
      password: process.env.SUPER_SET_PASSWORD,
      provider: process.env.SUPER_SET_PROVIDER,
      refresh: true,
    };

    const loginResponse = await axios.post(
      "http://localhost:8088/api/v1/security/login",
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const accessToken = loginResponse.data.access_token;

    // Step 2: Get the guest token
    const userData = {
      user: {
        username: process.env.SUPER_SET_GUEST_USERNAME,
        first_name: process.env.SUPER_SET_GUEST_USER_FIRTS_NAME,
        last_name: process.env.SUPER_SET_GUEST_USER_LAST_NAME,
      },
      resources: [
        {
          type: "dashboard",
          id: dashboard_id,
        },
      ],
      rls: [
        {
          clause: `scheduling_name='${s_id}'`,
        },
      ],
    };

    const guestTokenResponse = await axios.post(
      "http://localhost:8088/api/v1/security/guest_token/",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const guestToken = guestTokenResponse.data.token;
    return guestToken;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = getToken;
