const Test = require("../../models/test");
const Result = require("../../models/result");
const axios = require("axios");
const nPerf_API = async () => {
  const apiEndpoint = "https://ws.nperf.com/cloudV1/getResults";
  const requestBody = {
    customerId: "2249",
    customerKey: "baba166c-5262-4fa7-a4f6-e157a6fce5b6",
    exportId: "3520",
    dateMin: "2023-09-25 00:00:00",
    dateMax: "2023-09-26 00:00:00",
  };

  let finalResults = [];

  axios
    .post(apiEndpoint, requestBody)
    .then(async (response) => {
      if (response.status === 200) {
        const data = response.data;
        const arrayOfData = data.Results;
        if (arrayOfData.length > 0) {
          for (const obj of arrayOfData) {
            const conversionFactor = 1 / Math.pow(10, 6);
            const result = await processTestData(obj, conversionFactor);

            finalResults.push(result);
          }

          return "All data processed and stored in finalResults array.";
        } else {
          return `Error: ${response.status}, ${response.data}`;
        }
      } else {
        return "No result's found";
      }
    })
    .catch((error) => {
      return error;
    });

  // Function to process and return data for a single object
  async function processTestData(obj, conversionFactor) {
    const result = {
      SCHEDULING_NAME: obj.SCHEDULING_NAME || "null",
      TEST_TYPE: obj.TEST_TYPE || "null",
      TEST_ID: obj.TEST_ID ? parseInt(obj.TEST_ID) : "null",
      SCENARIO_NAME: obj.SCENARIO_NAME ? obj.SCENARIO_NAME : "null",
      STREAM_PR: obj.STREAM_PR || "null",
      STREAM_QUALITY_PRELOADING_TIME:
        obj.STREAM_QUALITY_PRELOADING_TIME * conversionFactor || "null",
      SPEED_UPLOAD_PEAK: obj.SPEED_UPLOAD_PEAK
        ? parseInt(obj.SPEED_UPLOAD_PEAK) * conversionFactor
        : "null",
      SPEED_UPLOAD_AVG_EXCL_SLOWSTART: obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART
        ? parseInt(obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART) * conversionFactor
        : "null",
      SPEED_UPLOAD_LOADED_LATENCY: obj.SPEED_UPLOAD_LOADED_LATENCY || "null",
      SPEED_UPLOAD_LOADED_JITTER: obj.SPEED_UPLOAD_LOADED_JITTER || "null",
      SPEED_UPLOAD_DURATION: obj.SPEED_UPLOAD_DURATION || "null",
      SPEED_UPLOAD_PEAK: obj.SPEED_UPLOAD_PEAK
        ? parseInt(obj.SPEED_UPLOAD_PEAK) * conversionFactor
        : "null",
      SPEED_UPLOAD_AVG_EXCL_SLOWSTART: obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART
        ? parseInt(obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART) * conversionFactor
        : "null",
      SPEED_LATENCY_AVG: obj.SPEED_LATENCY_AVG || "null",
      SPEED_LATENCY_JITTER: obj.SPEED_LATENCY_JITTER || "null",
      BROWSE_URL_LOADING_TIME: obj.BROWSE_URL_LOADING_TIME || "null",
      SPEED_DOWNLOAD_LOADED_LATENCY:
        obj.SPEED_DOWNLOAD_LOADED_LATENCY || "null",
      SPEED_DOWNLOAD_LOADED_JITTER: obj.SPEED_DOWNLOAD_LOADED_JITTER || "null",
      SPEED_DOWNLOAD_DURATION: obj.SPEED_DOWNLOAD_DURATION || "null",
      SPEED_DOWNLOAD_PEAK: obj.SPEED_DOWNLOAD_PEAK
        ? parseInt(obj.SPEED_DOWNLOAD_PEAK) * conversionFactor
        : "null",
      SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART: obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART
        ? parseInt(obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART) * conversionFactor
        : "null",
      SPEED_DOWNLOAD_PACKETLOSS: obj.SPEED_DOWNLOAD_PACKETLOSS || "null",
    };
    const name = result.SCHEDULING_NAME || "t1";
    const [user, created] = await Test.findOrCreate({
      where: {
        SCHEDULING_NAME: name,
      },
      defaults: {
        SCHEDULING_NAME: name,
      },
    });
    result["TestId"] = user.id;
    await Result.create(result);
    return "inserted";
  }
};

module.exports = nPerf_API;
