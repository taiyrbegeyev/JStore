import { auth, db } from '../firebase'

export const getStarted = (email, actionCodeSettings, errHandler, completionHandler) => {
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email)
      completionHandler()
    })
    .catch((err) => {
      console.log(err)
      errHandler()
      completionHandler()
    })
}

export const registerNewUser = (name, email, college, actionCodeSettings, errHandler, completionHandler) => {
  let data = {
    name: name,
    email: email,
    college: college,
    createdAt: new Date(),
  }

  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      db.collection('users').doc(email).set(data)
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
