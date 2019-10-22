import React, { Component } from 'react'
import { privacyPolicy } from 'helpers.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ProductInfo2 } from 'pages/ProductInfo/styles'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class PrivacyPolicy extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ProductInfo2 style={{padding: '0 2rem'}}>
          <h1>Privacy Policy</h1>
          <pre style={{fontSize: '14px'}}>{privacyPolicy()}</pre>
        </ProductInfo2>
      </MuiThemeProvider>
    )
  }
}

export default PrivacyPolicy
