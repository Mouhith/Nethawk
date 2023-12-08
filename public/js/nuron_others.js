// Initialize chartData directly from the server
const array = (data) => {
  const array = Object.entries(data).map(([date, value]) => ({
    [date]: [[date, value]],
  }));

  return JSON.stringify(array);
};

var chartData = data;
var other_chartData = other_data;
var cardFilter = false;
var speed = JSON.parse(speed);

const speedUploadLoadedJitter = speed.speedUploadLoadedJitter;
const speedUploadLoadedLatency = speed.speedUploadLoadedLatency;
const speedDownloadLoadedLatency = speed.speedDownloadLoadedLatency;
const speedDownloadLoadedJitter = speed.speedDownloadLoadedJitter;
const speedDownloadPacketLoss = speed.speedDownloadPacketLoss;

var other_speed = JSON.parse(other_speed);

const other_speedUploadLoadedJitter = other_speed.speedUploadLoadedJitter;
const other_speedUploadLoadedLatency = other_speed.speedUploadLoadedLatency;
const other_speedDownloadLoadedLatency = other_speed.speedDownloadLoadedLatency;
const other_speedDownloadLoadedJitter = other_speed.speedDownloadLoadedJitter;
const other_speedDownloadPacketLoss = other_speed.speedDownloadPacketLoss;
google.charts.load("current", {
  packages: ["corechart"],
});

google.charts.setOnLoadCallback(() => {
  const parsdate = JSON.parse(chartData);
  const lastValue = Object.keys(parsdate[parsdate.length - 1])[0];
  const other_parsdate = JSON.parse(other_chartData);
  const other_lastValue = Object.keys(
    other_parsdate[other_parsdate.length - 1]
  )[0];

  $("#nuron").val([lastValue]).trigger("change");
  $("#other").val([other_lastValue]).trigger("change");
});

async function drawChart(selector1, selector2) {
  await drawGraph(
    selector1,
    selector2,
    chartData,
    other_chartData,
    "chart_div",
    "Time to Download 80 Mb of File",
    "#bcacda"
  );
  await drawGraph(
    selector1,
    selector2,
    speedDownloadAvgExclFileSlowstart,
    other_speedDownloadAvgExclFileSlowstart,
    "avg",
    "Average Download speed (in Mb/s)",
    "#de97c3"
  );
  await drawGraph(
    selector1,
    selector2,
    chartspeedDownloadPacketLoss,
    other_chartspeedDownloadPacketLoss,
    "packetloss",
    "Peak Download Speed (in Mb/s)",
    "#452871"
  );
  // upload
  await drawGraph(
    selector1,
    selector2,
    speedUploadDuration,
    other_speedUploadDuration,
    "up80",
    "Time to Upload 80 Mb of File",
    "#e9c9de"
  );
  await drawGraph(
    selector1,
    selector2,
    speedUploadAvgExclFileSlowstart,
    other_speedUploadAvgExclFileSlowstart,
    "avgupload",
    "Average Upload speed (in Mb/s)",
    "#eae3f4"
  );
  await drawGraph(
    selector1,
    selector2,
    speedUploadFilePeak,
    other_speedUploadFilePeak,
    "peakupload",
    "Peak Upload Speed (in Mb/s)",
    "#c986b1"
  );

  //Streaming

  await drawGraph(
    selector1,
    selector2,
    streamPr,
    other_streamPr,
    "stream",
    "Stream Quality Score",
    "#856bb1"
  );
  await drawGraph(
    selector1,
    selector2,
    streamQualityPreloadingTime,
    other_streamQualityPreloadingTime,
    "loadtime",
    "Loading Time of Stream",
    "#d680b7"
  );
  await pidrawGraph(
    selector1,
    browserurl,

    "bw",
    "nuron Avg Loading Time for websites (in ms)"
  );
  await pidrawGraph(
    selector2,

    other_browserurl,
    "obw",
    `${isp} Avg Loading Time for websites (in ms)
    `
  );
}

async function drawGraph(
  selector1,
  selector2,
  data1,
  data2,
  elementId,
  title,
  clor
) {
  const value = await createGraph(
    selector1,
    selector2,
    data1,
    data2,
    title,
    clor
  );
  if (value) {
    drawAreaChart(elementId, value.data, value.options);
  }
}

///pi
async function pidrawGraph(selectedDate, data1, elementId, title) {
  const value = await piechart(selectedDate, data1, title);
  if (value) {
    pidrawAreaChart(elementId, value.data, value.options);
  }
}
function pidrawAreaChart(elementId, data, options) {
  var chart = new google.visualization.ColumnChart(
    document.getElementById(elementId)
  );
  chart.draw(data, options);
}
/////bar chart
async function barCgart(selectedDate, data, elementId, title) {
  const value = await bargraph(selectedDate, data, title);
  if (value) {
    barcagrtcreation(elementId, value.data, value.options);
  }
}
function barcagrtcreation(elementId, data, options) {
  var chart = new google.visualization.ColumnChart(
    document.getElementById(elementId)
  );
  chart.draw(data, options);
}
///
function drawAreaChart(elementId, data, options) {
  var chart = new google.visualization.AreaChart(
    document.getElementById(elementId)
  );
  chart.draw(data, options);
}

function updateChart() {
  var selector1 = $("#nuron").val();
  var selector2 = $("#other").val();

  const uj = document.getElementById("uj");
  const ul = document.getElementById("ul");
  const dj = document.getElementById("dj");
  const dl = document.getElementById("dl");
  const dp = document.getElementById("dp");
  const ouj = document.getElementById("ouj");
  const oul = document.getElementById("oul");
  const odj = document.getElementById("odj");
  const odl = document.getElementById("odl");
  const odp = document.getElementById("odp");
  updateElementText(
    ouj,
    other_speedUploadLoadedJitter[selector2]
      ? other_speedUploadLoadedJitter[selector2].toFixed(2)
      : "NuN"
  );
  updateElementText(
    oul,
    other_speedUploadLoadedLatency[selector2]
      ? other_speedUploadLoadedLatency[selector2].toFixed(2)
      : "NuN"
  );
  updateElementText(
    odj,
    other_speedDownloadLoadedJitter[selector2]
      ? other_speedDownloadLoadedJitter[selector2].toFixed(2)
      : "NuN"
  );
  updateElementText(
    odl,
    other_speedDownloadLoadedLatency[selector2]
      ? other_speedDownloadLoadedLatency[selector2].toFixed(2)
      : "NuN"
  );
  updateElementText(
    odp,
    other_speedDownloadPacketLoss[selector2]
      ? other_speedDownloadPacketLoss[selector2].toFixed(2)
      : "NuN"
  );
  updateElementText(
    uj,
    speedUploadLoadedJitter[selector1]
      ? speedUploadLoadedJitter[selector1].toFixed(2)
      : "NuN"
  );
  updateElementText(
    ul,
    speedUploadLoadedLatency[selector1]
      ? speedUploadLoadedLatency[selector1].toFixed(2)
      : "NuN"
  );
  updateElementText(
    dj,
    speedDownloadLoadedJitter[selector1]
      ? speedDownloadLoadedJitter[selector1].toFixed(2)
      : "NuN"
  );
  updateElementText(
    dl,
    speedDownloadLoadedLatency[selector1]
      ? speedDownloadLoadedLatency[selector1].toFixed(2)
      : "NuN"
  );
  updateElementText(
    dp,
    speedDownloadPacketLoss[selector1]
      ? speedDownloadPacketLoss[selector1].toFixed(2)
      : "NuN"
  );

  drawChart(selector1, selector2);
}

$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
});

async function createGraph(selector1, selector2, data1, data2, title, clor) {
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn("string", "Time");

  dataTable.addColumn("number", "nuron");
  dataTable.addColumn("number", `${isp}`);
  var va = [];

  JSON.parse(data1).forEach((ent) => {
    const currentDate = Object.keys(ent)[0];
    if (currentDate === selector1) {
      va.push(ent[currentDate]);
    }
  });

  JSON.parse(data2).forEach((ent) => {
    const currentDate = Object.keys(ent)[0];
    if (currentDate === selector2) {
      va.push(ent[currentDate]);
    }
  });

  var combinedData = combineData(selector1, selector2, ...va);

  dataTable.addRows(combinedData);

  var options = getChartOptions(title, clor);
  return { data: dataTable, options };
}

function getChartOptions(title, clor) {
  return {
    title: title,
    titleTextStyle: {
      color: "#000",
      fontSize: 16,
      bottom: 30,
    },
    colors: ["#e4118c", "#004411", "#571d43"],

    curveType: "function",
    hAxis: {
      gridlines: {
        count: 0,
      },
    },
    width: 390,
    height: 200,

    legend: {
      position: "none",
    },
    backgroundColor: { fill: "#fff" },

    vAxis: {
      minValue: 0,
      gridlines: {
        count: 0,
      },
      title: "Time in (ms)",
    },

    animation: {
      startup: true,
      duration: 1000,
      easing: "inAndOut",
    },
    series: {
      0: {
        color: clor,
      },
      1: {
        color: "blue",
      },
    },
  };
}

function combineData(select1, select2, ...dataArrays) {
  const date = [select1, select2];
  var combinedData = [];
  var mergedTimes = new Set();

  // Iterate through all passed arguments (data arrays)
  for (var i = 0; i < dataArrays.length; i++) {
    var data = dataArrays[i];

    if (data) {
      // Add unique times to the mergedTimes set
      mergedTimes = new Set([...mergedTimes, ...data.map((entry) => entry[0])]);
    }
  }

  // Create combinedData array using mergedTimes
  for (let time of mergedTimes) {
    var values = [];

    // Iterate through all passed arguments (data arrays) and get the value for the current time
    for (var i = 0; i < dataArrays.length; i++) {
      var data = dataArrays[i];
      var value = data ? data.find((entry) => entry[0] === time) : null;
      values.push(value ? value[1] : null);
    }

    // Check that each entry has the correct number of values
    combinedData.push([time, ...values]);
  }
  if (date.length > 1) {
    combinedData.forEach((entry) => {
      while (entry.length < date.length + 1) {
        entry.push(null);
      }
    });
  }
  return combinedData;
}
function updateElementText(element, text) {
  if (element) {
    element.textContent = text || "NuN";
  }
}
////////////////////////////

async function piechart(selectedDate, chartData, title) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "url");
  data.addColumn("number", "Value");

  // Add data to DataTable based on selected date
  JSON.parse(chartData).forEach((entry) => {
    var date = Object.keys(entry)[0];
    if (date === selectedDate[0]) {
      entry[date].forEach(([time, value]) => {
        data.addRow([time, 29]);
      });
    }
  });

  data.addColumn({ type: "string", role: "style" });

  // Define colors array based on the URLs
  var colors = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#FFFF33",
    "#33FFFF",
    "#FF33FF",
  ];

  // Add style information to each row
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    data.setValue(i, 2, colors[i % colors.length]);
  }
  var colors = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#FFFF33",
    "#33FFFF",
    "#FF33FF",
  ];
  const options = {
    title: title,
    titleTextStyle: {
      color: "#000",
      fontSize: 16,
      bottom: 30,
    },
    // pieHole: 0.5,
    pieSliceTextStyle: {
      color: "black",
    },
    // is3D: false,
    width: 390,

    legend: {
      position: "none",
    },
  };

  return { data, options };
}
