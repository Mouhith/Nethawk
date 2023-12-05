// Initialize chartData directly from the server
var chartData = data;

var speed = JSON.parse(speed);

const speedUploadLoadedJitter = speed.speedUploadLoadedJitter;
const speedUploadLoadedLatency = speed.speedUploadLoadedLatency;
const speedDownloadLoadedLatency = speed.speedDownloadLoadedLatency;
const speedDownloadLoadedJitter = speed.speedDownloadLoadedJitter;
const speedDownloadPacketLoss = speed.speedDownloadPacketLoss;

google.charts.load("current", {
  packages: ["corechart"],
});

google.charts.setOnLoadCallback(() => {
  const parsdate = JSON.parse(chartData);
  const lastValue = Object.keys(parsdate[parsdate.length - 1])[0];
  $("#dateDropdown").val([lastValue]).trigger("change");
});

async function drawChart(selectedDate) {
  await drawGraph(
    selectedDate,
    chartData,
    "chart_div",
    "Time to Download 80 Mb of File"
  );
  await drawGraph(
    selectedDate,
    speedDownloadAvgExclFileSlowstart,
    "avg",
    "Average Download speed (in Mb/s)"
  );
  await drawGraph(
    selectedDate,
    chartspeedDownloadPacketLoss,
    "packetloss",
    "Peak Download Speed (in Mb/s)"
  );
  // upload
  await drawGraph(
    selectedDate,
    speedUploadDuration,
    "up80",
    "Time to Upload 80 Mb of File"
  );
  await drawGraph(
    selectedDate,
    speedUploadAvgExclFileSlowstart,
    "avgupload",
    "Average Upload speed (in Mb/s)"
  );
  await drawGraph(
    selectedDate,
    speedUploadFilePeak,
    "peakupload",
    "Peak Upload Speed (in Mb/s)"
  );

  //Streaming

  await drawGraph(selectedDate, streamPr, "stream", "Stream Quality Score");
  await drawGraph(
    selectedDate,
    streamQualityPreloadingTime,
    "loadtime",
    "Loading Time of Stream"
  );
  await pidrawGraph(selectedDate, browserurl, "bw", "Loading Time of Stream");
}

async function drawGraph(selectedDate, data, elementId, title) {
  const value = await createGraph(selectedDate, data, title);
  if (value) {
    drawAreaChart(elementId, value.data, value.options);
  }
}

///pi
async function pidrawGraph(selectedDate, data, elementId, title) {
  const value = await piechart(selectedDate, data, title);
  if (value) {
    pidrawAreaChart(elementId, value.data, value.options);
  }
}
function pidrawAreaChart(elementId, data, options) {
  var chart = new google.visualization.PieChart(
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
  var selectedDates = $("#dateDropdown").val();

  const uj = document.getElementById("uj");
  const ul = document.getElementById("ul");
  const dj = document.getElementById("dj");
  const dl = document.getElementById("dl");
  const dp = document.getElementById("dp");

  if (selectedDates.length === 1) {
    updateElementText(uj, speedUploadLoadedJitter[selectedDates[0]].toFixed(2));
    updateElementText(
      ul,
      speedUploadLoadedLatency[selectedDates[0]].toFixed(2)
    );
    updateElementText(
      dj,
      speedDownloadLoadedJitter[selectedDates[0]].toFixed(2)
    );
    updateElementText(
      dl,
      speedDownloadLoadedLatency[selectedDates[0]].toFixed(2)
    );
    updateElementText(dp, speedDownloadPacketLoss[selectedDates[0]].toFixed(2));
  } else {
    getSpeeddata(speedUploadLoadedJitter);
    // Add other speed data types as needed
  }

  function getSpeeddata(type) {
    let total = 0;

    selectedDates.forEach((date) => {
      total += type[date] || 0;
    });
    console.log(total);
  }

  drawChart(selectedDates);
}

$(document).ready(function () {
  $(".js-example-basic-multiple").select2({
    maximumSelectionLength: 2,
  });
});

async function createGraph(selectedDate, chartData, title) {
  if (selectedDate.length === 1) {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Time");
    data.addColumn("number", "Value");

    // Add data to DataTable based on selected date
    JSON.parse(chartData).forEach((entry) => {
      var date = Object.keys(entry)[0];
      if (date === selectedDate[0]) {
        entry[date].forEach(([time, value]) => {
          data.addRow([time, value]);
        });
      }
    });

    var options = getChartOptions(title);
    return { data, options };
  } else if (selectedDate.length > 1) {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Time");
    data.addColumn("number", "Value 1");
    data.addColumn("number", "Value 2");

    let va = [];
    selectedDate.forEach((dat) => {
      JSON.parse(chartData).forEach((ent) => {
        const date = Object.keys(ent)[0];
        if (date === dat) {
          va.push(ent[date]);
        }
      });
    });

    var combinedData = combineData(...va);
    data.addRows(combinedData);

    var options = getChartOptions(title);
    return { data, options };
  }
}

function getChartOptions(title) {
  return {
    title: title,
    titleTextStyle: {
      color: "#000",
      fontSize: 16,
      bottom: 30,
    },
    colors: ["#e4118c", "#004411"],

    curveType: "function",
    hAxis: {
      format: "HH:mm",
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
    // series: {
    //   0: {
    //     color: "red",
    //   },
    // },
  };
}

function combineData(data1, data2) {
  var combinedData = [];
  var mergedTimes = new Set([
    ...data1.map((entry) => entry[0]),
    ...data2.map((entry) => entry[0]),
  ]);

  for (let time of mergedTimes) {
    var value1 = data1.find((entry) => entry[0] === time);
    var value2 = data2.find((entry) => entry[0] === time);

    combinedData.push([
      time,
      value1 ? value1[1] : null,
      value2 ? value2[1] : null,
    ]);
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
        console.log([[time, value]]);
        data.addRow([time, value]);
      });
    }
  });

  var options = getChartOptions(title);
  return { data, options };
}
