import { database, auth, storage } from 'firebase'

export const createUser = (name, email, password, errHandler, completionHandler) => {
  firebase.auth().createUserWithEmailAndPassword(`${email}@jacobs-university.de`, password)
    .catch(errHandler)
    .then(user => {
      // if user was successfully created
      if (user) {
        const { currentUser } = auth
        const profile = { displayName: name }

        // send verification email
        currentUser.sendEmailVerification()
          .catch(errHandler)
        
        // set username in profile
        currentUser.updateProfile(profile)
          .catch(errHandler)
          .then(() => {
            // create new entry in user table
            const userInfo = {
              email: currentUser.email,
              joinDate: new Date().getTime(),
              name: {
                fullName: name,
                displayName: name,
              }
            }

            // upload user data into database
          })
      }
    })
}

export const signIn = (email, password)
