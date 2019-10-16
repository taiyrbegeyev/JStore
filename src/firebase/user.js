import firebase, { storage, db } from 'firebase.js'

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

