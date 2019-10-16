export const cutOffString = (str, limit) => {
  return str.substr(0, limit)
}

export const displayDate = (timeStamp) => {
  // // ensure date comes as 01, 09 etc
  // let DD = ("0" + timestamp.getDate()).slice(-2)
  // // getMonth returns month from 0
  // let MM = ("0" + (timestamp.getMonth() + 1)).slice(-2)
  // let YYYY = timestamp.getFullYear()

  // let hh = ("0" + timestamp.getHours()).slice(-2)
  // let mm = ("0" + timestamp.getMinutes()).slice(-2)
  // let ss = ("0" + timestamp.getSeconds()).slice(-2)
  // let date_string = DD + "-" + MM + "-" + YYYY + " " + hh + ":" + mm + ":" + ss

  // // will output something like "October 15, 2019 at 4:43:49 PM"
  // return date_string

  // expected output: Wed Jul 28 1993d
  let date = timeStamp.toDateString()
  // get rid of day of the week
  date = date.slice(4)
  return date
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

export const generateWhatsAppLink = (phoneNumber, fullName, itemName, link, imageUrl) => {
  const sanitized_phoneNumber = phoneNumber.replace(/\D/g,'')
  console.log(sanitized_phoneNumber)
  return `https://api.whatsapp.com/send?phone=${sanitized_phoneNumber}&text=[JStore]%20${itemName}%0D%0A%0D%0AHey! I'm contacting you by clicking on the WhatsApp button of JStore.%0D%0A My name is ${fullName}.%0D%0AI am interested in the following item:%0D%0A${link}`
}

export const generateeMail = (email, fullName, itemName, link, imageUrl) => {
  return `mailto:${email}?subject=[JStore]%20${itemName}&body=Hey!%20I'm%20contacting%20you%20by%20clicking%20on%20the%20Email%20button%20of%20JStore.%0D%0A My%20name%20is%20${fullName}.%20I%20am%20interested%20in%20the%20following%20item:%0D%0A${link}%0D%0A%0D%0ASincerely,%0D%0A${fullName}`
}
