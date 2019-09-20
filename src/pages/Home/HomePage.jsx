import React, { Component } from 'react'
import { auth } from 'firebase.js'
import { Redirect } from 'react-router-dom'
import HomePageHeader from 'components/HomePageHeader/HomePageHeader'

class Home extends Component {
  state = {
    isAuth: true
  }
  
  componentDidMount () {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = window.prompt('Please provide your email for confirmation')
      }
      auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn')
          console.log(result.user)
          if (!result.user) {
            this.setState({
              isAuth: false
            })
          }
        })
        .catch((err) => {
          console.log(err)
          auth.signOut()
          this.setState({
            isAuth: false
          })
        })
    } else {
      auth.onAuthStateChanged((user) => {
        console.log(user)
        if (!user) {
          this.setState({
            isAuth: false
          })
        }
      })
    }
  }
  
  render() {
    if (!this.state.isAuth) {
      return <Redirect to='get-started' />
    }
    
    return (
      <React.Fragment>
        <HomePageHeader />
      </React.Fragment>
    )
  }
}

export default Home
