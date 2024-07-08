function yyyymmddDateString(ddmmyyyyDate) {
  var parts = ddmmyyyyDate.split("/");
  var day = parts[1];
  var month = parts[0];
  var year = parts[2];

  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }

  var formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

function ddmmyyyyDateString(yyyymmddDate) {
  var parts = yyyymmddDate.split("/");
  var year = parts[2];
  var month = parts[0];
  var day = parts[1];

  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }

  var formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}

/**
 *
 * @param {String} minute
 * @param {String} hour
 * @returns {String} String time
 */
function formatTimeString(minute, hour) {
  if (minute < 10) minute = "0" + minute;
  if (hour < 10) hour = "0" + hour;

  return hour + ":" + minute;
}

function getDayOfDate(day) {
  switch (day) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ 2";
    case 2:
      return "Thứ 3";
    case 3:
      return "Thứ 4";
    case 4:
      return "Thứ 5";
    case 5:
      return "Thứ 6";
    case 6:
      return "Thứ 7";
  }
}

export {
  yyyymmddDateString,
  ddmmyyyyDateString,
  formatTimeString,
  getDayOfDate,
};
