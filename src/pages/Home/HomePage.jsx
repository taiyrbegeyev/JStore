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
  render() {
    const { isNewUser, user } = this.props
    console.log('isnewUser: ', isNewUser)

    return (
      <MuiThemeProvider theme={theme}>
        <NewUserModal
          open={isNewUser}
          email={user.email}
        />
        <HomePageHeader />
        <Album />
        <Footer />
      </MuiThemeProvider>
    )
  }
}

export default Home
