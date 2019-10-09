import React, { Component } from 'react'
import { Album, Footer, HomePageHeader, NewUserModal } from 'components/export'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

/**
 * User gets redirected to this page after clicking on the link in an email.
 * This route is private. So there is no need to check if user allowed to be
 * here. So the only thing we need to do is check if user is in the database.
 * If not, then activate a modal to user enter some data.
 */

class Home extends Component {
  state = {
    user: null,
    isNewUser: null,
    user_email: null,
    // auth_user: this.props.user
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user) {
      return ({
        user: nextProps.user
      })
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.user !== this.props.user) {
      const isNewUser = this.props.user.metadata.creationTime === this.props.user.metadata.lastSignInTime
      const user_email = this.props.user.email
      this.setState({
        user: this.props.user,
        isNewUser,
        user_email
      })
    }
  }
  
  //  componentDidMount () {
    // if (auth.isSignInWithEmailLink(window.location.href)) {
    //   auth.onAuthStateChanged((user) => {
    //     const isNewUser = auth.currentUser.metadata.creationTime === auth.currentUser.metadata.lastSignInTime
    //     // get current user's email
    //     const user_email = user.email
    //     if (user_email) {
    //       this.setState({
    //         emailExists: !isNewUser,
    //         email: user_email
    //       }, () => {
    //         console.log('Email exists')
    //       })
    //     } else {
    //       this.setState({
    //         emailExists: isNewUser,
    //         email: user_email
    //       }, () => {
    //         console.log('Email does not exist')
    //       })
    //     }
    //   })
    // }
  // }

  // componentDidMount() {
  //   const { auth_user } = this.state
  //   const isNewUser = auth_user.metadata.creationTime === auth_user.metadata.lastSignInTime
  //   // get current user's email
  //   const user_email = auth_user.email
  //   console.log(user_email)

  //   if (user_email) {
  //     this.setState({
  //       emailExists: !isNewUser,
  //       email: user_email
  //     }, () => {
  //       console.log('Email exists')
  //     })
  //   } else {
  //     this.setState({
  //       emailExists: isNewUser,
  //       email: user_email
  //     }, () => {
  //       console.log('Email does not exist')
  //     })
  //   }
  // }


  
  render() {
    const { isNewUser, user_email } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <NewUserModal
          open={isNewUser}
          email={user_email}
        />
        <HomePageHeader />
        <Album />
        <Footer />
      </MuiThemeProvider>
    )
  }
}

export default Home
