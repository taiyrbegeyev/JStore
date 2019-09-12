import firebase, { auth } from '../firebase'

export const getStarted = (email, actionCodeSettings, errHandler, completionHandler) => {
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

export const anonymousSignIn = () => {
  auth.signInAnonymously().catch((err) => {

  });
}
