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

export const cutFullName = (fullName) => {
  // split fullName by spaces
  let array_fullName = fullName.split(" ")
  array_fullName = array_fullName.map((word) => {
    return word.charAt(0).toUpperCase()
  })
  console.log(array_fullName)
  if (array_fullName.length === 1) {
    return array_fullName[0]
  }
  else {
    return array_fullName[0] + array_fullName[array_fullName.length - 1]
  }
}

export const validatePhoneNumber = (phoneNumber) => {
  // truncate phone number first
  phoneNumber = phoneNumber.replace(/\s/g, '');

  // remove all non-digits
  const sanitized_phoneNumber = phoneNumber.replace(/\D/g,'')
  // if number doesn't contain any characters except numbers
  if (sanitized_phoneNumber === phoneNumber && sanitized_phoneNumber.length >= 4 && sanitized_phoneNumber.length <= 15) {
    return true
  }
  return false
}
