import firebase, { auth, db } from 'firebase.js'

/**
 * send an authentication link to a certain email
 * @param {*} email 
 * @param {*} actionCodeSettings 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
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

/**
 * check if user exists. If not, don't allow to use private routes
 * @param {*} email 
 * @param {*} completionHandler 
 */
export const userExists = (email, completionHandler) => {
  db.collection('users').doc(email).get()
    .then((snapshot) => {
      console.log(snapshot.exists)
      const exists = snapshot.exists
      if (exists) {
        auth.currentUser.updateProfile({
          displayName: snapshot.data().fullName
        })
      }
      completionHandler(exists)
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * check if user is in the DB. Full name is the least requirement we ask users
 * @param {*} email 
 * @param {*} completionHandler 
 */
export const fullNameExists = (email, completionHandler) => {
  db.collection('users').doc(email).get()
    .then((doc) => {
      if (!doc.exists || doc.data().fullName === '') {
        console.log('full name does not exist')
        completionHandler()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * if user is not in DB (user is new), then add the user in there
 * @param {*} name 
 * @param {*} email 
 * @param {*} whatsApp 
 * @param {*} phoneNumber 
 * @param {*} errHandler 
 * @param {*} completionHandler 
 */
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
  else {
    data.phoneNumber = data.phoneNumber.replace(/\s/g, '')
  }

  db.collection('users').doc(email).set(data)
    .then(() => {
      // window.localStorage.setItem('emailForSignIn', email);
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
