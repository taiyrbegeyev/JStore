import firebase, { auth } from '../firebase'

export const getStarted = (email, actionCodeSettings, errHandler) => {
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email)
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
