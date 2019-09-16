import React, { Component } from 'react'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks,
  LoginButton
} from './styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore'
import PublishIcon from '@material-ui/icons/Publish'
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import logo from 'assets/jstore_logo.svg'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})


class HomePageHeader extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <HeaderContainer>
          <NavBar>
            <Logo>
              <LogoAnchor>
                <LogoImage src={logo} />
              </LogoAnchor>
            </Logo>
            <MainNavBar>
              <MainNavBarElements>
                <MainNavBarElementsLinks>
                  <LocalGroceryStoreIcon />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks>
                  <PublishIcon />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks>
                  <NotificationsIcon />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks>
                  <AccountCircleIcon />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks>
                  <SettingsIcon />
                </MainNavBarElementsLinks>
              </MainNavBarElements>
            </MainNavBar>
          </NavBar>
        </HeaderContainer>
      </ThemeProvider>
    )
  }
}

export default HomePageHeader
