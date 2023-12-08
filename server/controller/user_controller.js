const schema = require("../validation/schema");
const Leads = require("../../models/leads");
const crypto = require("../tools/crypto");
const otp = require("../tools/otp");
const sms = require("../tools/sms");
const getToken = require("../tools/superSet");
const Results = require("../../models/result");
const chatData = require("../tools/chatDataFilter");
const val = require("../tools/chartOperations");
exports.login = (req, res, next) => {
  try {
    if (req.cookies["NU-NLIC"]) {
      return res.status(201).redirect("/dashboard/nuron");
    }

    res.render("login", { message: "" });
  } catch (error) {
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

    res.cookie("NU-VAL", encryptedData, { maxAge: 150000 });

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
    const cookiee = req.cookies["NU-VAL"];

    if (!cookiee) {
      return res.status(200).redirect("/");
    }
    const cookie = cookiee;

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
      S_id: result.organisation_name,
    };

    const encryptdata = await crypto.encrypt(cookie_data);
    res.clearCookie("NU-VAL");
    res.cookie("NU-NLIC", encryptdata);
    res.status(200).redirect("/dashboard/nuron");
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const linkURL = false;
    const dashboard_id = process.env.SUPER_SET_NURON_DASHBOARD_ID;
    const data = await crypto.decryption(req.cookie);
    const token = await getToken(data.S_id, linkURL, dashboard_id);
    ///

    const dat = await Results.findAll({
      attributes: ["dates"],

      where: {
        scheduling_name: data.S_id,
      },
    });
    const array = dat.map((result) => result.dataValues.dates);
    const newset = new Set(array);
    if (newset.size > 1) {
      linkURL = true;
    }
    res
      .status(200)
      .render("dashboard", { token: token, linkURL, name: "Nuron" });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("NU-NLIC");
    res.status(302).redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getDashboard_others = async (req, res, next) => {
  try {
    const result = await Results.findAll({
      where: { scheduling_name: "nuron" },
    });
    const {
      data,
      speed,
      speedDownloadAvgExclFileSlowstart,
      chartspeedDownloadPacketLoss,
      speedUploadDuration,
      speedUploadAvgExclFileSlowstart,
      speedUploadFilePeak,
      streamPr,
      streamQualityPreloadingTime,
      browserurl,
      filteredISP,
    } = await otherISPchartData(result);
    res.render("others", {
      data,
      speed,
      speedDownloadAvgExclFileSlowstart,
      chartspeedDownloadPacketLoss,
      speedUploadDuration,
      speedUploadAvgExclFileSlowstart,
      speedUploadFilePeak,
      streamPr,
      streamQualityPreloadingTime,
      browserurl,
      nuron: false,
      other: true,
      nuron_other: false,
      isp: filteredISP[filteredISP.length - 1],
    });
  } catch (error) {
    next(error);
  }
};

exports.getnuron_others = async (req, res, next) => {
  try {
    const result = await Results.findAll({
      where: { scheduling_name: "nuron" },
    });
    const [nuron, otherisp] = await Promise.all([
      nuronchartData(result),
      otherISPchartData(result),
    ]);

    res.status(200).render("nuron_others", {
      data: nuron.data,
      speed: nuron.speed,
      speedDownloadAvgExclFileSlowstart:
        nuron.speedDownloadAvgExclFileSlowstart,
      chartspeedDownloadPacketLoss: nuron.chartspeedDownloadPacketLoss,
      speedUploadDuration: nuron.speedUploadDuration,
      speedUploadAvgExclFileSlowstart: nuron.speedUploadAvgExclFileSlowstart,
      speedUploadFilePeak: nuron.speedUploadFilePeak,
      browserurl: nuron.browserurl,
      streamPr: nuron.streamPr,
      streamQualityPreloadingTime: nuron.streamQualityPreloadingTime,
      other_data: otherisp.data,
      other_speed: otherisp.speed,
      other_speedDownloadAvgExclFileSlowstart:
        otherisp.speedDownloadAvgExclFileSlowstart,
      other_chartspeedDownloadPacketLoss: otherisp.chartspeedDownloadPacketLoss,
      other_speedUploadDuration: otherisp.speedUploadDuration,
      other_speedUploadAvgExclFileSlowstart:
        otherisp.speedUploadAvgExclFileSlowstart,
      other_speedUploadFilePeak: otherisp.speedUploadFilePeak,
      other_streamPr: otherisp.streamPr,
      other_streamQualityPreloadingTime: otherisp.streamQualityPreloadingTime,
      other_browserurl: otherisp.browserurl,
      nuron: false,
      other: false,
      nuron_other: true,
      isp: nuron.filteredISP[nuron.filteredISP.length - 1],
    });
  } catch (error) {
    next(error);
  }
};

exports.getDashboard_nuron = async (req, res, next) => {
  try {
    const result = await Results.findAll({
      where: { scheduling_name: "Mth" },
    });
    const {
      data,
      speed,
      speedDownloadAvgExclFileSlowstart,
      chartspeedDownloadPacketLoss,
      speedUploadDuration,
      speedUploadAvgExclFileSlowstart,
      speedUploadFilePeak,
      streamPr,
      streamQualityPreloadingTime,
      browserurl,
      filteredISP,
    } = await nuronchartData(result);

    res.status(200).render("nuron", {
      data,
      speed,
      speedDownloadAvgExclFileSlowstart,
      chartspeedDownloadPacketLoss,
      speedUploadDuration,
      speedUploadAvgExclFileSlowstart,
      speedUploadFilePeak,
      streamPr,
      streamQualityPreloadingTime,
      browserurl,
      nuron: true,
      other: false,
      nuron_other: false,
      isp: filteredISP[filteredISP.length - 1],
    });
  } catch (error) {
    next(error);
  }
};

async function nuronchartData(result) {
  const mapedValues = result.map((result) => result.dataValues);
  const isp = result.map((result) => result.dataValues.isp);
  const uisp = new Set(isp);
  const filteredISP = Array.from(uisp).filter((entry) => {
    if (entry !== "One Eight Technologies Private IN") {
      return entry;
    }
  });

  const upload = await chatData.nuroSpeed(mapedValues, true, "speedUploadFile");
  const download = await chatData.nuroSpeed(
    mapedValues,
    true,
    "speedDownloadFile"
  );
  const stream = await chatData.nuroSpeed(mapedValues, true, "streaming");
  const streamquality = await chatData.nuroSpeed(
    mapedValues,
    true,
    "streaming"
  );
  const browser = await chatData.nuroSpeed(mapedValues, true, "browse");
  const data = await val.group(
    download,
    "startDateTimeUtc",
    "speedDownloadDuration"
  );
  const speedDownloadAvgExclFileSlowstart = await val.group(
    download,
    "startDateTimeUtc",
    "speedDownloadAvgExclFileSlowstart"
  );

  const chartspeedDownloadPacketLoss = await val.group(
    download,
    "startDateTimeUtc",
    "speedDownloadPacketLoss"
  );

  const speedUploadDuration = await val.group(
    download,
    "startDateTimeUtc",
    "speedUploadDuration"
  );
  const speedUploadAvgExclFileSlowstart = await val.group(
    download,
    "startDateTimeUtc",
    "speedUploadAvgExclFileSlowstart"
  );

  const speedUploadFilePeak = await val.group(
    download,
    "startDateTimeUtc",
    "speedUploadFilePeak"
  );

  const streamPr = await val.group(stream, "startDateTimeUtc", "streamPr");

  const browserurl = await val.brouseGroup(
    browser,
    "browserUrl",
    "browseUrlLoadingTime"
  );

  const streamQualityPreloadingTime = await val.group(
    streamquality,
    "startDateTimeUtc",
    "streamQualityPreloadingTime"
  );

  const [
    speedUploadLoadedJitter,
    speedUploadLoadedLatency,
    speedDownloadLoadedLatency,
    speedDownloadLoadedJitter,
    speedDownloadPacketLoss,
  ] = await Promise.all([
    val.average(upload, "startDateTimeUtc", "speedUploadLoadedJitter"),
    val.average(upload, "startDateTimeUtc", "speedUploadLoadedLatency"),
    val.average(download, "startDateTimeUtc", "speedDownloadLoadedLatency"),
    val.average(download, "startDateTimeUtc", "speedDownloadLoadedJitter"),
    val.average(download, "startDateTimeUtc", "speedDownloadPacketLoss"),
  ]);
  const speed = {
    speedUploadLoadedJitter,
    speedUploadLoadedLatency,
    speedDownloadLoadedLatency,
    speedDownloadLoadedJitter,
    speedDownloadPacketLoss,
  };

  return {
    data,
    speed,
    speedDownloadAvgExclFileSlowstart,
    chartspeedDownloadPacketLoss,
    speedUploadDuration,
    speedUploadAvgExclFileSlowstart,
    speedUploadFilePeak,
    streamPr,
    streamQualityPreloadingTime,
    browserurl,
    filteredISP,
  };
}

async function otherISPchartData(result) {
  const mapedValues = result.map((result) => result.dataValues);
  const isp = result.map((result) => result.dataValues.isp);
  const uisp = new Set(isp);
  const filteredISP = Array.from(uisp).filter((entry) => {
    if (entry !== "One Eight Technologies Private IN") {
      return entry;
    }
  });

  const upload = await chatData.nuroSpeed(
    mapedValues,
    false,
    "speedUploadFile"
  );

  const download = await chatData.nuroSpeed(
    mapedValues,
    false,
    "speedDownloadFile"
  );
  const stream = await chatData.nuroSpeed(mapedValues, false, "streaming");
  const streamquality = await chatData.nuroSpeed(
    mapedValues,
    false,
    "streaming"
  );
  const browser = await chatData.nuroSpeed(mapedValues, false, "browse");
  const data = await val.group(
    download,
    "startDateTimeUtc",
    "other_speedDownloadDuration"
  );
  const speedDownloadAvgExclFileSlowstart = await val.group(
    download,
    "startDateTimeUtc",
    "other_speedDownloadAvgExclFileSlowstart"
  );

  const chartspeedDownloadPacketLoss = await val.group(
    download,
    "startDateTimeUtc",
    "other_speedDownloadPacketLoss"
  );

  const speedUploadDuration = await val.group(
    download,
    "startDateTimeUtc",
    "other_speedUploadDuration"
  );
  const speedUploadAvgExclFileSlowstart = await val.group(
    download,
    "startDateTimeUtc",
    "other_speedUploadAvgExclFileSlowstart"
  );

  const speedUploadFilePeak = await val.group(
    download,
    "startDateTimeUtc",
    "other_speedUploadFilePeak"
  );

  const streamPr = await val.group(
    stream,
    "startDateTimeUtc",
    "other_streamPr"
  );

  const browserurl = await val.brouseGroup(
    browser,
    "other_browserUrl",
    "other_browseUrlLoadingTime"
  );

  const streamQualityPreloadingTime = await val.group(
    streamquality,
    "startDateTimeUtc",
    "other_streamQualityPreloadingTime"
  );

  const [
    speedUploadLoadedJitter,
    speedUploadLoadedLatency,
    speedDownloadLoadedLatency,
    speedDownloadLoadedJitter,
    speedDownloadPacketLoss,
  ] = await Promise.all([
    val.average(upload, "startDateTimeUtc", "other_speedUploadLoadedJitter"),
    val.average(upload, "startDateTimeUtc", "other_speedUploadLoadedLatency"),
    val.average(
      download,
      "startDateTimeUtc",
      "other_speedDownloadLoadedLatency"
    ),
    val.average(
      download,
      "startDateTimeUtc",
      "other_speedDownloadLoadedJitter"
    ),
    val.average(download, "startDateTimeUtc", "other_speedDownloadPacketLoss"),
  ]);
  const speed = {
    speedUploadLoadedJitter,
    speedUploadLoadedLatency,
    speedDownloadLoadedLatency,
    speedDownloadLoadedJitter,
    speedDownloadPacketLoss,
  };
  return {
    data,
    speed,
    speedDownloadAvgExclFileSlowstart,
    chartspeedDownloadPacketLoss,
    speedUploadDuration,
    speedUploadAvgExclFileSlowstart,
    speedUploadFilePeak,
    streamPr,
    streamQualityPreloadingTime,
    browserurl,
    filteredISP,
  };
}
