import React, { Component } from 'react'
import { IdentityCard } from 'components/export'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class Profile extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <IdentityCard />
      </MuiThemeProvider>
    )
  }  
}

export default Profile
