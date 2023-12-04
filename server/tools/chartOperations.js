const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

exports.average = async (array, filter, name) => {
  const val = array.reduce((prev, current) => {
    const datetime = new Date(current[filter]);
    const formattedDate = formatDate(datetime);

    if (!prev[formattedDate]) {
      prev[formattedDate] = { sum: Number(current[name]), count: 1 };
    }
    prev[formattedDate].sum += Number(current[name]);
    prev[formattedDate].count += 1;

    return prev;
  }, {});

  Object.keys(val).forEach((element) => {
    const avg = val[element].sum / val[element].count;
    val[element] = avg;
  });

  return val;
};

exports.group = async (array, filter, name) => {
  const val = array.reduce((prev, current) => {
    const dateTime = new Date(current[filter]);
    const formattedDate = formatDate(dateTime);
    const formattedDateTime = `${dateTime.getHours()}:${dateTime.getMinutes()}`;

    if (!prev[formattedDate]) {
      prev[formattedDate] = {};
    }

    if (!prev[formattedDate][formattedDateTime]) {
      prev[formattedDate][formattedDateTime] = [];
    }

    prev[formattedDate][formattedDateTime].push(current[name]);

    return prev;
  }, {});

  const output = Object.entries(val).map(([date, timeData]) => {
    const dateObject = {};
    dateObject[date] = Object.entries(timeData).map(([time, values]) => [
      time,
      parseInt(values[0]),
    ]);
    return dateObject;
  });

  return output;
};

exports.brouseGroup = async (array, filter, name) => {
  const val = array.reduce((prev, current) => {
    const dateTime = new Date(current["startDateTimeUtc"]);
    const formattedDate = formatDate(dateTime);
    const formattedDateTime = current[filter];

    if (!prev[formattedDate]) {
      prev[formattedDate] = {};
    }

    if (!prev[formattedDate][formattedDateTime]) {
      prev[formattedDate][formattedDateTime] = 0;
    }

    prev[formattedDate][formattedDateTime] += Number(current[name]);

    return prev;
  }, {});

  const output = Object.entries(val).map(([date, timeData]) => {
    const dateObject = {};
    dateObject[date] = Object.entries(timeData).map(([time, sum]) => [
      time,
      sum,
    ]);
    return dateObject;
  });

  return output;
};
