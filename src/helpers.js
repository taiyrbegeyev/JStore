export const cutOffString = (str, limit) => {
  return str.substr(0, limit)
}

export const displayDate = (timeStamp) => {
  // split by either GMT or UTC
  let time = timeStamp.split('GMT')
  time = time[0].split('UTC')
  // remove day of the week in front
  time = time[0].slice(4)
  
  return time
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
  return `https://api.whatsapp.com/send?phone=${sanitized_phoneNumber}&text=[JStore]%20${itemName}%0D%0A%0D%0AHey! I'm contacting you by clicking on the WhatsApp button of JStore.%0D%0AMy name is ${fullName}.%0D%0AI am interested in the following item:%0D%0A${link}`
}

export const generateeMail = (email, fullName, itemName, link, imageUrl) => {
  return `mailto:${email}?subject=[JStore]%20${itemName}&body=Hey!%20I'm%20contacting%20you%20by%20clicking%20on%20the%20Email%20button%20of%20JStore.%0D%0A My%20name%20is%20${fullName}.%20I%20am%20interested%20in%20the%20following%20item:%0D%0A${link}%0D%0A%0D%0ASincerely,%0D%0A${fullName}`
}
