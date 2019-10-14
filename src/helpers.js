export const cutOffString = (str, limit) => {
  return str.substr(0, limit)
}

export const displayDate = (timestamp) => {
  // ensure date comes as 01, 09 etc
  let DD = ("0" + timestamp.getDate()).slice(-2)
  // getMonth returns month from 0
  let MM = ("0" + (timestamp.getMonth() + 1)).slice(-2)
  var YYYY = timestamp.getFullYear();

  var hh = ("0" + timestamp.getHours()).slice(-2);
  var mm = ("0" + timestamp.getMinutes()).slice(-2);
  var ss = ("0" + timestamp.getSeconds()).slice(-2);
  var date_string = DD + "-" + MM + "-" + YYYY + " " + hh + ":" + mm + ":" + ss

  // will output something like "14-10-2019 11:04:42"
  return date_string
}
