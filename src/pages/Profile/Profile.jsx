import React, { Component } from 'react'
import { Footer, HomePageHeader, IdentityCard, TaskManager } from 'components/export'
import {
  MainContainer
} from './styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class Profile extends Component {
  state = {
    currentItem: 'profileSettings'
  }

  callBackfunction = (value) => {
    let item
    switch (value) {
      case 0:
        item = 'profileSettings'
        break
      case 1:
        item = 'activeItems'
        break
      case 2:
        item = 'soldItems'
        break
      default:
        item = null
        break
    }
    this.setState({
      currentItem: item
    })
  }
  
  render() {
    const { user } = this.props
    const { currentItem } = this.state
    
    return (
      <MuiThemeProvider theme={theme}>
        <HomePageHeader />
        <MainContainer>
          <IdentityCard
            user={user}
            parentCallBack={this.callBackfunction}
          />
          <TaskManager
            currentItem={currentItem}
          />
        </MainContainer>
        <Footer />
      </MuiThemeProvider>
    )
  }  
}

export default Profile
