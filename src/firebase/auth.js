import firebase, { auth, db } from 'firebase.js'

export const getStarted = (email, actionCodeSettings, errHandler, completionHandler) => {
  auth.signOut()
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email)
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
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
    delete data.phoneNumber
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
