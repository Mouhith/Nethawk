// Initialize chartData directly from the server
const array = (data) => {
  const array = Object.entries(data).map(([date, value]) => ({
    [date]: [[date, value]],
  }));

  return JSON.stringify(array);
};

var chartData = data;
var cardFilter = false;
var speed = JSON.parse(speed);

const speedUploadLoadedJitter = speed.speedUploadLoadedJitter;
const speedUploadLoadedLatency = speed.speedUploadLoadedLatency;
const speedDownloadLoadedLatency = speed.speedDownloadLoadedLatency;
const speedDownloadLoadedJitter = speed.speedDownloadLoadedJitter;
const speedDownloadPacketLoss = speed.speedDownloadPacketLoss;
const cardsContainer = document.querySelector(".cards-container");
google.charts.load("current", {
  packages: ["corechart"],
});

google.charts.setOnLoadCallback(() => {
  const parsdate = JSON.parse(chartData);
  const lastValue = Object.keys(parsdate[parsdate.length - 1])[0];
  $("#dateDropdown").val([lastValue]).trigger("change");
  $("#dateDropdown1").val([lastValue]).trigger("change");
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
  ///cards
  if (selectedDate.length > 1) {
    await barCgart(
      selectedDate,
      array(speedUploadLoadedJitter),
      "uj",
      "Upload Jitter (in ms)"
    );
    await barCgart(
      selectedDate,
      array(speedUploadLoadedLatency),
      "ul",
      "Upload Latency (in ms)"
    );
    await barCgart(
      selectedDate,
      array(speedDownloadLoadedLatency),
      "dl",
      "Download Latency (in ms)"
    );
    await barCgart(
      selectedDate,
      array(speedDownloadLoadedJitter),
      "dj",
      "Download Jitter (in ms)"
    );
    await barCgart(
      selectedDate,
      array(speedDownloadPacketLoss),
      "dp",
      "Packet Loss %"
    );
  }
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
  let selectedDates;
  var selector1 = $("#dateDropdown").val();
  var selector2 = $("#dateDropdown1").val();
  if (selector1) {
    selectedDates = selector1;
  } else if (selector2) {
    selectedDates = selector2;
  }

  if (selectedDates.length === 1) {
    cardsContainer.innerHTML = ` <div class="card" id="Upload_jitter">
    <h4>Upload Jitter <span>(in ms)</span></h4>
    <h1 id="uj"></h1>
  </div>
  <div class="card" id="uplode_latency">
    <h4>Upload Latency <span>(in ms)</span></h4>
    <h1 id="ul"></h1>
  </div>
  <div class="card" id="download_itter">
    <h4>Download Jitter <span>(in ms)</span></h4>
    <h1 id="dj"></h1>
  </div>
  <div class="card" id="download_latency">
    <h4>Download Latency <span>(in ms)</span></h4>
    <h1 id="dl" class="dll"></h1>
  </div>
  <div class="card" id="packet_loss">
    <h4>Packet Loss %</h4>
    <h1 id="dp"></h1>
  </div>`;
    const uj = document.getElementById("uj");
    const ul = document.getElementById("ul");
    const dj = document.getElementById("dj");
    const dl = document.getElementById("dl");
    const dp = document.getElementById("dp");
    updateElementText(
      uj,
      speedUploadLoadedJitter[selectedDates[0]]
        ? speedUploadLoadedJitter[selectedDates[0]].toFixed(2)
        : "NuN"
    );
    updateElementText(
      ul,
      speedUploadLoadedLatency[selectedDates[0]]
        ? speedUploadLoadedLatency[selectedDates[0]].toFixed(2)
        : "NuN"
    );
    updateElementText(
      dj,
      speedDownloadLoadedJitter[selectedDates[0]]
        ? speedDownloadLoadedJitter[selectedDates[0]].toFixed(2)
        : "NuN"
    );
    updateElementText(
      dl,
      speedDownloadLoadedLatency[selectedDates[0]]
        ? speedDownloadLoadedLatency[selectedDates[0]].toFixed(2)
        : "NuN"
    );
    updateElementText(
      dp,
      speedDownloadPacketLoss[selectedDates[0]]
        ? speedDownloadPacketLoss[selectedDates[0]].toFixed(2)
        : "NuN"
    );
  } else {
    cardFilter = true;
    cardsContainer.innerHTML = `
    <div class="div22">
    <div class="chart-divv" id="chart11">
       <div id="uj"></div>
    </div>
    <div class="chart-divv" id="chart12">
       <div id="ul"></div>
    </div>
    <div class="chart-divv" id="chart13">
       <div id="dj"></div>
    </div>
    <div class="chart-divv" id="chart14">
       <div id="dl"></div>
    </div>  
    <div class="chart-divv" id="chart15">
       <div id="dp"></div>
    </div>
    </div>`;
    // Add other speed data types as needed
  }

  drawChart(selectedDates);
}

$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
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
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn("string", "Time");

    selectedDate.forEach((date) => {
      dataTable.addColumn("number", date);
    });

    var va = [];

    selectedDate.forEach((dat) => {
      JSON.parse(chartData).forEach((ent) => {
        const currentDate = Object.keys(ent)[0];
        if (currentDate === dat) {
          va.push(ent[currentDate]);
        }
      });
    });

    var combinedData = combineData(selectedDate, ...va);
    dataTable.addRows(combinedData);

    var options = getChartOptions(title);
    return { data: dataTable, options };
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
    colors: ["#e4118c", "#004411", "#571d43"],

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
    series: {
      0: {
        color: "red",
      },
      1: {
        color: "blue",
      },
    },
  };
}

function combineData(date, ...dataArrays) {
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

    combinedData.push([time, ...values]);
  }

  // If date array has a length greater than 1, fill in null values
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
    title: "Avg Loading Time for websites (in ms)",
    // pieHole: 0.5,
    pieSliceTextStyle: {
      color: "black",
    },
    // is3D: false,
    width: 390,

    legend: {
      title: "URLs",
    },
    titleTextStyle: {
      color: "#000",
      fontSize: 16,
    },
  };

  return { data, options };
}

async function bargraph(selectedDate, chartData, title) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "url");
  data.addColumn("number", "Value");

  // Add data to DataTable based on selected date
  JSON.parse(chartData).forEach((entry) => {
    var date = Object.keys(entry)[0];
    selectedDate.forEach((selectdate) => {
      if (date === selectdate) {
        entry[date].forEach(([time, value]) => {
          console.log(entry[date]);
          data.addRow([time || date, value || 0]);
        });
      }
    });
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
    // pieHole: 0.5,
    pieSliceTextStyle: {
      color: "black",
    },
    // is3D: false,
    width: 210,

    legend: {
      position: "none",
    },
  };

  return { data, options };
}
