const Test = require("../../models/test");
const Result = require("../../models/result");
const axios = require("axios");
const writeFile = require("./writeFile");
async function nPerf_API(id) {
  const apiEndpoint = "https://ws.nperf.com/cloudV1/getResults";
  const requestBody = {
    customerId: "2249",
    customerKey: "baba166c-5262-4fa7-a4f6-e157a6fce5b6",
    exportId: "3520",
    idMin: id,
    // dateMin: start,
    // dateMax: end,
  };

  try {
    const response = await axios.post(apiEndpoint, requestBody);

    if (response.status === 200) {
      const data = response.data;
      const arrayOfData = data.Results;
      if (arrayOfData.length > 0) {
        const finalResults = [];

        for (const obj of arrayOfData) {
          const conversionFactor = 1 / Math.pow(10, 6);
          const result = await processTestData(obj, conversionFactor);
          finalResults.push(result);
        }
        const last_id = finalResults[finalResults.length - 1];

        await writeFile(last_id.testId);

        return finalResults;
      } else {
        console.log("No results found");
        return `Error: ${response.status}, ${response.data}`;
      }
    } else {
      console.log("No results found");
      return "No results found";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function processTestData(obj, conversionFactor) {
  const result = {
    scheduling_name: obj.SCHEDULING_NAME || "nuron",
    testId: obj.TEST_ID ? parseInt(obj.TEST_ID) : null,
    leadsLeadId: obj.SCENARIO_ID ? parseInt(obj.SCENARIO_ID) : null,
    streamPr: null,
    streamQualityPreloadingTime: null,
    speedUploadLoadedLatency: null,
    speedUploadLoadedJitter: null,
    speedUploadDuration: null,
    speedUploadPeak: null,
    speedUploadAvgExclFileSlowstart: null,
    speedLatencyAvg: null,
    speedLatencyJitter: null,
    browseUrlLoadingTime: null,
    speedDownloadLoadedLatency: null,
    speedDownloadLoadedJitter: null,
    speedDownloadDuration: null,
    speedDownloadAvgExclFileSlowstart: null,
    speedDownloadPacketLoss: null,

    speedUploadFilePeak: null,

    speedUploadAvgExclSlowstart: null,

    speedDownloadFilePeak: null,

    speedDownloadPeak: null,
    speedDownloadAvgExclSlowstart: null,
    testType: obj.TEST_TYPE,
    streamStatus: obj.STREAM_STATUS,
    startDateTimeUtc: obj.START_DATETIME_UTC,
    datetimeUtc: obj.DATETIME_UTC,
    browserUrl: obj.BROWSE_URL,
    isp: obj.ISP,
    //
    other_streamPr: null,
    other_streamQualityPreloadingTime: null,
    other_speedUploadLoadedLatency: null,
    other_speedUploadLoadedJitter: null,
    other_speedUploadDuration: null,
    other_speedUploadPeak: null,
    other_speedUploadAvgExclFileSlowstart: null,
    other_speedLatencyAvg: null,
    other_speedLatencyJitter: null,
    other_browseUrlLoadingTime: null,
    other_speedDownloadLoadedLatency: null,
    other_speedDownloadLoadedJitter: null,
    other_speedDownloadDuration: null,
    other_speedDownloadAvgExclFileSlowstart: null,
    other_speedDownloadPacketLoss: null,
    other_speedUploadFilePeak: null,
    other_speedUploadAvgExclSlowstart: null,
    other_speedDownloadFilePeak: null,
    other_speedDownloadPeak: null,
    other_browserUrl: obj.BROWSE_URL,
    other_speedDownloadAvgExclSlowstart: null,
    stream_quality_status: obj.STREAM_QUALITY_STATUS,
    speed_status: obj.SPEED_STATUS,
    browse_url_status: obj.BROWSE_URL_STATUS,
    dates: obj.START_DATETIME_UTC.split(" ")[0],
  };

  // result.dates = result.dates.split(" ")[0];
  if (result.isp === "One Eight Technologies Private IN") {
    if (obj.TEST_TYPE === "streaming" && obj.STREAM_STATUS === "OK") {
      result.streamPr = obj.STREAM_PR || null;
    }
    if (obj.TEST_TYPE === "streaming" && obj.STREAM_QUALITY_STATUS === "OK") {
      result.streamQualityPreloadingTime =
        obj.STREAM_QUALITY_PRELOADING_TIME || null;
    }
    if (obj.TEST_TYPE === "speedUploadFile" && obj.SPEED_STATUS === "OK") {
      result.speedUploadLoadedLatency = obj.SPEED_UPLOAD_LOADED_LATENCY || null;
      result.speedUploadLoadedJitter = obj.SPEED_UPLOAD_LOADED_JITTER || null;
      result.speedUploadDuration = obj.SPEED_UPLOAD_DURATION || null;
      result.speedUploadFilePeak = obj.SPEED_UPLOAD_PEAK
        ? parseInt(obj.SPEED_UPLOAD_PEAK) / conversionFactor
        : null;
      result.speedUploadAvgExclFileSlowstart =
        obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
    }
    if (obj.TEST_TYPE === "speedUpload" && obj.SPEED_STATUS === "OK") {
      result.speedUploadPeak = obj.SPEED_UPLOAD_PEAK
        ? parseInt(obj.SPEED_UPLOAD_PEAK) / conversionFactor
        : null;
      result.speedUploadAvgExclSlowstart = obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART
        ? parseInt(obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
        : null;
    }
    if (obj.TEST_TYPE === "speedLatency" && obj.SPEED_STATUS === "OK") {
      result.speedLatencyAvg = obj.SPEED_LATENCY_AVG || null;
      result.speedLatencyJitter = obj.SPEED_LATENCY_JITTER || null;
    }
    if (obj.TEST_TYPE === "browse" && obj.BROWSE_URL_STATUS === "Aborted") {
      result.browseUrlLoadingTime = obj.BROWSE_URL_LOADING_TIME || null;
    }
    if (obj.TEST_TYPE === "speedDownloadFile" && obj.SPEED_STATUS === "OK") {
      result.speedDownloadLoadedLatency =
        obj.SPEED_DOWNLOAD_LOADED_LATENCY || null;
      result.speedDownloadLoadedJitter =
        obj.SPEED_DOWNLOAD_LOADED_JITTER || null;
      result.speedDownloadDuration = obj.SPEED_DOWNLOAD_DURATION || null;
      result.speedDownloadFilePeak = obj.SPEED_DOWNLOAD_PEAK
        ? parseInt(obj.SPEED_DOWNLOAD_PEAK) / conversionFactor
        : null;
      result.speedDownloadAvgExclFileSlowstart =
        obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
      result.speedDownloadPacketLoss = obj.SPEED_DOWNLOAD_PACKETLOSS || null;
    }
    if (obj.TEST_TYPE === "speedDownload" && obj.SPEED_STATUS === "OK") {
      result.speedDownloadPeak = obj.SPEED_DOWNLOAD_PEAK
        ? parseInt(obj.SPEED_DOWNLOAD_PEAK) / conversionFactor
        : null;
      result.speedDownloadAvgExclSlowstart =
        obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
    }
  } else {
    if (obj.TEST_TYPE === "streaming" && obj.STREAM_STATUS === "OK") {
      result.other_streamPr = obj.STREAM_PR || null;
    }
    if (obj.TEST_TYPE === "streaming" && obj.STREAM_QUALITY_STATUS === "OK") {
      result.other_streamQualityPreloadingTime =
        obj.STREAM_QUALITY_PRELOADING_TIME || null;
    }
    if (obj.TEST_TYPE === "speedUploadFile" && obj.SPEED_STATUS === "OK") {
      result.other_speedUploadLoadedLatency =
        obj.SPEED_UPLOAD_LOADED_LATENCY || null;
      result.other_speedUploadLoadedJitter =
        obj.SPEED_UPLOAD_LOADED_JITTER || null;
      result.other_speedUploadDuration = obj.SPEED_UPLOAD_DURATION || null;
      result.other_speedUploadFilePeak = obj.SPEED_UPLOAD_PEAK
        ? parseInt(obj.SPEED_UPLOAD_PEAK) / conversionFactor
        : null;
      result.other_speedUploadAvgExclFileSlowstart =
        obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
    }
    if (obj.TEST_TYPE === "speedUpload" && obj.SPEED_STATUS === "OK") {
      result.other_speedUploadPeak = obj.SPEED_UPLOAD_PEAK
        ? parseInt(obj.SPEED_UPLOAD_PEAK) / conversionFactor
        : null;
      result.other_speedUploadAvgExclSlowstart =
        obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_UPLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
    }
    if (obj.TEST_TYPE === "speedLatency" && obj.SPEED_STATUS === "OK") {
      result.other_speedLatencyAvg = obj.SPEED_LATENCY_AVG || null;
      result.other_speedLatencyJitter = obj.SPEED_LATENCY_JITTER || null;
    }
    if (obj.TEST_TYPE === "browse" && obj.BROWSE_URL_STATUS === "Aborted") {
      result.other_browseUrlLoadingTime = obj.BROWSE_URL_LOADING_TIME || null;
    }
    if (obj.TEST_TYPE === "speedDownloadFile" && obj.SPEED_STATUS === "OK") {
      result.other_speedDownloadLoadedLatency =
        obj.SPEED_DOWNLOAD_LOADED_LATENCY || null;
      result.other_speedDownloadLoadedJitter =
        obj.SPEED_DOWNLOAD_LOADED_JITTER || null;
      result.other_speedDownloadDuration = obj.SPEED_DOWNLOAD_DURATION || null;
      result.other_speedDownloadFilePeak = obj.SPEED_DOWNLOAD_PEAK
        ? parseInt(obj.SPEED_DOWNLOAD_PEAK) / conversionFactor
        : null;
      result.other_speedDownloadAvgExclFileSlowstart =
        obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
      result.other_speedDownloadPacketLoss =
        obj.SPEED_DOWNLOAD_PACKETLOSS || null;
    }
    if (obj.TEST_TYPE === "speedDownload" && obj.SPEED_STATUS === "OK") {
      result.other_speedDownloadPeak = obj.SPEED_DOWNLOAD_PEAK
        ? parseInt(obj.SPEED_DOWNLOAD_PEAK) / conversionFactor
        : null;
      result.other_speedDownloadAvgExclSlowstart =
        obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART
          ? parseInt(obj.SPEED_DOWNLOAD_AVG_EXCL_SLOWSTART) / conversionFactor
          : null;
    }
  }

  const name = result.scheduling_name || "nuron";
  const [user, created] = await Test.findOrCreate({
    where: {
      scheduling_name: name,
    },
    defaults: {
      scheduling_name: name,
    },
  });

  const [users, creat] = await Result.findOrCreate({
    where: {
      testId: result.testId,
    },
    defaults: result,
  });
  return result;
}

module.exports = nPerf_API;
