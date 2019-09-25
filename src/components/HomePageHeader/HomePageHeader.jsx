import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks
} from './styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
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
    redirectToHome: false,
    settings_dialog_items: {
      terms_and_condition: false,
      privacy_policy: false,
      impressum: false
    }
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
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleOpenItem = (e) => {
    this.setState({
      anchorEl: null
    })
    switch (e.target.id) {
      case 'terms_and_condition':
        this.setState(prevState => ({
          settings_dialog_items: {
            ...prevState.settings_dialog_items,
            terms_and_condition: true
          }
        }))
        break
      case 'privacy_policy':
        this.setState(prevState => ({
          settings_dialog_items: {
            ...prevState.settings_dialog_items,
            privacy_policy: true
          }
        }))
        break
      case 'impressum':
        this.setState(prevState => ({
          settings_dialog_items: {
            ...prevState.settings_dialog_items,
            impressum: true
          }
        }))
        break
      case 'logout':
        this.logout()
        this.setState({
          redirectToHome: true
        })
        break
    }
  }

  handleCloseModal = (e) => {
    this.setState(prevState => ({
      settings_dialog_items: {
        terms_and_condition: false,
        privacy_policy: false,
        impressum: false
      }
    }))
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
                  onClose={this.handleOpenItem}
                >
                  <MenuItem id="terms_and_condition" onClick={this.handleOpenItem}>Terms and Conditions</MenuItem>
                  <MenuItem id="privacy_policy" onClick={this.handleOpenItem}>Privacy Policy</MenuItem>
                  <MenuItem id="impressum" onClick={this.handleOpenItem}>Impressum</MenuItem>
                  <MenuItem id="logout" onClick={this.handleOpenItem}>Log out</MenuItem>
                </Menu>
                <Dialog
                  open={this.state.settings_dialog_items.terms_and_condition}
                  onClose={this.handleCloseModal}
                  scroll="paper"
                  aria-labelledby="scroll-dialog-title"
                >
                  <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText>
                      {[...new Array(100)]
                        .map(
                          () => `heyeyyeyeyeyeeeeeeey`,
                        )
                      .join('\n')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseModal} color="primary">
                      Got it!
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={this.state.settings_dialog_items.privacy_policy}
                  onClose={this.handleCloseModal}
                  scroll="paper"
                  aria-labelledby="scroll-dialog-title"
                >
                  <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText>
                      {[...new Array(100)]
                        .map(
                          () => `heyeyyeyeyeyeeeeeeey`,
                        )
                      .join('\n')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseModal} color="primary">
                      Got it!
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={this.state.settings_dialog_items.impressum}
                  onClose={this.handleCloseModal}
                  scroll="paper"
                  aria-labelledby="scroll-dialog-title"
                >
                  <DialogTitle id="scroll-dialog-title">Impressum</DialogTitle>
                  <DialogContent dividers={true}>
                    <DialogContentText>
                      {[...new Array(100)]
                        .map(
                          () => `heyeyyeyeyeyeeeeeeey`,
                        )
                      .join('\n')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseModal} color="primary">
                      Got it!
                    </Button>
                  </DialogActions>
                </Dialog>
              </MainNavBarElements>
            </MainNavBar>
          </NavBar>
        </HeaderContainer>
      </ThemeProvider>
    )
  }
}

export default HomePageHeader
