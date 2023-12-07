exports.nuroSpeed = async (array, ispNuron, testType) => {
  const data = array.filter((res) => {
    if (ispNuron) {
      if (
        res.testType === testType &&
        res.isp === "One Eight Technologies Private IN" &&
        (res.speed_status === "OK" ||
          res.streamStatus === "OK" ||
          res.stream_quality_status === "OK" ||
          res.browse_url_status === "OK")
      ) {
        return res;
      }
    } else {
      if (
        res.testType === testType &&
        res.isp !== "One Eight Technologies Private IN" &&
        (res.speed_status === "OK" ||
          res.streamStatus === "OK" ||
          res.stream_quality_status === "OK" ||
          res.browse_url_status === "OK")
      ) {
        return res;
      }
    }
  });
  return data;
};
