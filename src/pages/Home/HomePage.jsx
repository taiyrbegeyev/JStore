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
    user_email: null
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
        <Footer isAuth={this.props.isAuth} />
      </MuiThemeProvider>
    )
  }
}

export default Home
