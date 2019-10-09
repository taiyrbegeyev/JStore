import React, { Component } from 'react'
import {
  LandingPageWrapper
} from './styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Footer, Header, Intro } from 'components/export'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class Landing extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <LandingPageWrapper>
          <Header isAuth={this.props.isAuth} />
          <Intro isAuth={this.props.isAuth} />
          <Footer isAuth={this.props.isAuth} />
        </LandingPageWrapper>
      </MuiThemeProvider>
    )
  }
}

export default Landing
