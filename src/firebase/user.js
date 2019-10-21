import { db } from 'firebase.js'

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
