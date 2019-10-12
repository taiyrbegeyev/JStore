import React, { Component } from 'react'
import { MainContainer, UploadProductTitle } from './styles'
import { Footer, HomePageHeader, Stepper } from 'components/export'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class UploadProduct extends Component {
  componentWillMount () {
    window.localStorage.clear()
  }
  
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HomePageHeader />
        <MainContainer>
          <UploadProductTitle>Tell us what you're selling</UploadProductTitle>
          <Stepper />
        </MainContainer>
        <Footer /> 
      </MuiThemeProvider>
    )
  }
}

export default UploadProduct
