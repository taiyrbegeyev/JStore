import firebase, { auth, db } from 'firebase.js'

export const getStarted = (email, actionCodeSettings, errHandler, completionHandler) => {
  auth.signOut()
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

export const userExists = (email, completionHandler) => {
  db.collection('users').doc(email).get()
    .then((snapshot) => {
      console.log(snapshot.exists)
      completionHandler(snapshot.exists)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const registerNewUser = (name, email, whatsApp, phoneNumber, errHandler, completionHandler) => {
  let data = {
    fullName: name,
    email: email,
    whatsApp: whatsApp,
    phoneNumber: phoneNumber,
    creationDate: firebase.firestore.FieldValue.serverTimestamp(),
  }

  if (!whatsApp) {
    data.phoneNumber = ''
  }

  db.collection('users').doc(email).set(data)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
    })
}

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

export const anonymousSignIn = (errHandler) => {
  auth.signInAnonymously().catch((err) => {
    console.log(err)
    errHandler()
  });
}

export const anonymousUserHandler = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user)
      return user
    }
  }) 
}
