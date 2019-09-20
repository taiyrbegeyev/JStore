import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks
} from './styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore'
import PublishIcon from '@material-ui/icons/Publish'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import logo from 'assets/jstore_logo.svg'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})


class HomePageHeader extends Component {
  state = {
    anchorEl: null,
    selectedItem: null,
    redirectToHome: false
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        console.log('Logged out')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  handleClick = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose = (e) => {
    this.setState({
      anchorEl: null
    })
    switch (e.target.id) {
      case 'logout':
        this.logout()
        this.setState({
          redirectToHome: true
        })
        break
      default:
        console.log('default')
    }
  }
  
  render() {
    if (this.state.redirectToHome) {
      return <Redirect to='/' />
    }
    
    const open = Boolean(this.state.anchorEl)
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
                <MainNavBarElementsLinks
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <SettingsIcon />
                </MainNavBarElementsLinks>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem id="terms_and_condition" onClick={this.handleClose}>Terms and Conditions</MenuItem>
                  <MenuItem id="privacy_policy" onClick={this.handleClose}>Privacy Policy</MenuItem>
                  <MenuItem id="imressum" onClick={this.handleClose}>Impressum</MenuItem>
                  <MenuItem id="logout" onClick={this.handleClose}>Log out</MenuItem>
                </Menu>
              </MainNavBarElements>
            </MainNavBar>
          </NavBar>
        </HeaderContainer>
      </ThemeProvider>
    )
  }
}

export default HomePageHeader
