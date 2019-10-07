import React, { Component } from 'react'
import { auth, db } from 'firebase.js'
import { HomePageHeader, NewUserModal } from 'components/export'

/**
 * User gets redirected to this page after clicking on the link in an email.
 * This route is private. So there is no need to check if user allowed to be
 * here. So the only thing we need to do is check if user is in the database.
 * If not, then activate a modal to user enter some data.
 */

class Home extends Component {
  state = {
    emailExists: true,
    email: null
  }
  
  componentWillMount () {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      auth.onAuthStateChanged((user) => {
        const isNewUser = auth.currentUser.metadata.creationTime === auth.currentUser.metadata.lastSignInTime
        console.log('isNewUser: ', isNewUser)
        // get current user's email
        const user_email = user.email
        if (user_email) {
          this.setState({
            emailExists: !isNewUser,
            email: user_email
          }, () => {
            console.log('Email exists')
          })
        } else {
          this.setState({
            emailExists: isNewUser,
            email: user_email
          }, () => {
            console.log('Email does not exist')
          })
        }
      })
    }
  }
  
  render() {
    const { email, emailExists } = this.state
    console.log('email: ', email)
    console.log('emailExists: ', emailExists)
    return (
      <React.Fragment>
        <NewUserModal
          open={!emailExists}
          email={email}
        />
        <HomePageHeader />
      </React.Fragment>
    )
  }
}

export default Home
