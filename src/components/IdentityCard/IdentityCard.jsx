import React, { Component } from 'react'
import {
  IdentityCardWrapper, ProfilePictureInformation,
  ProfileImage, UserName, ListOfTabs, Tab
} from './styles'
import { Person, Euro, LocalMall, SettingsApplications } from '@material-ui/icons'
import {
  Typography, List, ListItem,
  ListItemIcon, ListItemText, Divider
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    marginRight: '1rem'
  },
})

class IdentityCard extends Component {
  state = {
    selectedIndex: 0
  }

  handleTabs = (e, selectedIndex) => {
    this.setState({
      selectedIndex: selectedIndex
    }, () => {
      this.props.parentCallBack(this.state.selectedIndex)
    })
  }
  
  render() {
    const { classes } = this.props
    const { selectedIndex } = this.state
    
    return (
      <IdentityCardWrapper>
        <ProfilePictureInformation>
          <ProfileImage>TB</ProfileImage>
          <UserName>
            <Typography variant="h5" component="h2">
              Taiyr Begeyev
            </Typography>
            <Typography variant="h7" component="h5">
              Member since 14.10.2019
            </Typography>
          </UserName>
        </ProfilePictureInformation>
        <div className={classes.root}>
          <List component="nav" aria-label="secondary profile activities" disablePadding>
            <ListItem
              divider
            ></ListItem>
            <ListItem
              button
              onClick={e => this.handleTabs(e, 0)}
              selected={selectedIndex === 0}
              divider
            >
            <ListItemIcon>
              <SettingsApplications />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
          </ListItem>
          <ListItem
            button
            onClick={e => this.handleTabs(e, 1)}
            selected={selectedIndex === 1}
            divider
          >
            <ListItemIcon>
              <LocalMall />
            </ListItemIcon>
            <ListItemText primary="Active Items" />
          </ListItem>
          <ListItem
            button
            onClick={e => this.handleTabs(e, 2)}
            selected={selectedIndex === 2}
            divider
          >
            <ListItemIcon>
              <Euro />
            </ListItemIcon>
            <ListItemText primary="Sold Items" />
          </ListItem>
          </List>
        </div>
      </IdentityCardWrapper>
    )
  }
}

export default withStyles(useStyles)(IdentityCard)
