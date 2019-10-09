import React, { Component } from 'react'
import { MainContainer, UploadProductTitle } from './styles'
import HomePageHeader from 'components/HomePageHeader/HomePageHeader'
import StepperUpload from 'components/Stepper/Stepper'
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
          <StepperUpload />
        </MainContainer>
      </MuiThemeProvider>
    )
  }
}

export default UploadProduct
