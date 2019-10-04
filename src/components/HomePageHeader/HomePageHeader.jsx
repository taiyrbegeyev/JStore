import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks,
  ListContainer, DrawerItems
} from './styles'
import {
  Drawer, List,
  ListItem, ListItemText,
  Menu, MenuItem, Button, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore'
import PublishIcon from '@material-ui/icons/Publish'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import DehazeIcon from '@material-ui/icons/Dehaze'
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
    },
    drawerOpen: false,
    windowHeight: undefined,
    windowWidth: undefined
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({
      drawerOpen: !prevState.drawerOpen
    }))
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
      default:
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
      <MuiThemeProvider theme={theme}>
        <HeaderContainer>
          <NavBar>
            <Logo>
              <LogoAnchor href="/home">
                <LogoImage src={logo} />
              </LogoAnchor>
            </Logo>
            {
              this.state.windowWidth >= 768
              ?
              <MainNavBar>
              <MainNavBarElements>
                <MainNavBarElementsLinks>
                  <LocalGroceryStoreIcon />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks href="/upload">
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
              </MainNavBarElements>
              </MainNavBar>
              :
              <MainNavBar>
                <MainNavBarElements>
                  <MainNavBarElementsLinks
                    onClick={this.toggleDrawer}
                  >
                    <DehazeIcon />
                  </MainNavBarElementsLinks>
                </MainNavBarElements>
              </MainNavBar>
            }
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
            <Drawer variant="temporary" anchor="bottom" open={this.state.drawerOpen} onClose={this.toggleDrawer}>
              <ListContainer role="presentation">
                <List>
                  <ListItem button>
                    <DrawerItems>
                      <LocalGroceryStoreIcon />
                    </DrawerItems>
                    <ListItemText primary={'Buy'} />
                  </ListItem>
                  <ListItem button>
                    <DrawerItems>
                      <PublishIcon />
                    </DrawerItems>
                    <ListItemText primary={'Sell'} />
                  </ListItem>
                  <ListItem button>
                    <DrawerItems>
                      <NotificationsIcon />
                    </DrawerItems>
                    <ListItemText primary={'Messages'} />
                  </ListItem>
                  <ListItem button>
                    <DrawerItems>
                      <AccountCircleIcon />
                    </DrawerItems>
                    <ListItemText primary={'Profile'} />
                  </ListItem>
                  <ListItem button onClick={this.handleClick}>
                    <DrawerItems>
                      <SettingsIcon />
                    </DrawerItems>
                    <ListItemText primary={'Settings'} />
                  </ListItem>
                </List>
              </ListContainer>
            </Drawer>
          </NavBar>
        </HeaderContainer>
      </MuiThemeProvider>
    )
  }
}

export default HomePageHeader
