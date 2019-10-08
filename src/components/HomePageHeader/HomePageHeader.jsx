import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
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
import {
  LocalGroceryStore, Publish,
  Notifications, AccountCircle,
  Settings, Dehaze
} from '@material-ui/icons'
import logo from 'assets/jstore_logo.svg'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class HomePageHeader extends Component {
  state = {
    anchorEl: null,
    goTo: null,
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
          goTo: '/'
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

  goTo = (url) => {
    this.setState({
      goTo: url
    })
  }
  
  render() {
    const { goTo } = this.state
    if (this.state.goTo) {
      return <Redirect to={goTo} />
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
                <MainNavBarElementsLinks href="/home">
                  <LocalGroceryStore />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks href="/upload">
                  <Publish />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks>
                  <Notifications />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks>
                  <AccountCircle />
                </MainNavBarElementsLinks>
                <MainNavBarElementsLinks
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <Settings />
                </MainNavBarElementsLinks>
              </MainNavBarElements>
              </MainNavBar>
              :
              <MainNavBar>
                <MainNavBarElements>
                  <MainNavBarElementsLinks
                    onClick={this.toggleDrawer}
                  >
                    <Dehaze />
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
                  <ListItem button onClick={() => this.goTo('home')}>
                    <DrawerItems>
                      <LocalGroceryStore />
                    </DrawerItems>
                    <ListItemText primary={'Buy'} />
                  </ListItem>
                  <ListItem button onClick={() => this.goTo('upload')}>
                    <DrawerItems>
                      <Publish />
                    </DrawerItems>
                    <ListItemText primary={'Sell'} />
                  </ListItem>
                  <ListItem button onClick={() => this.goTo('')}>
                    <DrawerItems>
                      <Notifications />
                    </DrawerItems>
                    <ListItemText primary={'Messages'} />
                  </ListItem>
                  <ListItem button onClick={() => this.goTo('')}>
                    <DrawerItems>
                      <AccountCircle />
                    </DrawerItems>
                    <ListItemText primary={'Profile'} />
                  </ListItem>
                  <ListItem button onClick={this.handleClick}>
                    <DrawerItems>
                      <Settings />
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
