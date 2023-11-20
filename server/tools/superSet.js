const axios = require("axios");

async function getToken() {
  try {
    // Step 1: Get the access token
    const loginData = {
      username: "admin",
      password: "admin",
      provider: "db",
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
        username: "test",
        first_name: "test",
        last_name: "test",
      },
      resources: [
        {
          type: "dashboard",
          id: "6bf0ea4c-ec1a-4e23-b946-22f927ef8e6e",
        },
      ],
      rls: [
        {
          clause: "scheduling_name='test1'",
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
