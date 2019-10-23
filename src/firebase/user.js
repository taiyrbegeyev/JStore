import { db } from 'firebase.js'

/**
 * fetch the phone number of a certain user. Used for what's app button
 * @param {*} user 
 * @param {*} completionHandler 
 */
export const fetchPhoneNumberOfUser = (user, completionHandler) => {
  db.collection('users').doc(user).get()
    .then((doc) => {
      if (doc.data().whatsApp) {
        completionHandler(doc.data().phoneNumber)
      }
      else {
        completionHandler('')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * fetch a certain user, used for account settings
 * @param {*} user 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
export const fetchUser = (user, errHandler, completionHandler) => {
  db.collection('users').doc(user).get()
    .then((doc) => {
      completionHandler(doc.data())
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

/**
 * if user updates personal data, then update user in DB
 * @param {*} email 
 * @param {*} data 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
export const updatePersonalInfo = (email, data, errHandler, completionHandler) => {
  if (data.whatsApp === false) {
    data.phoneNumber = ''
  }

  db.collection('users').doc(email).update(data)
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}
