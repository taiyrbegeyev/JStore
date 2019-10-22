import React, { Component } from 'react'
import { auth } from 'firebase.js'
import { fetchUser } from 'firebase/user.js'
import { displayDate } from 'helpers.js'
import { PacmanLoader } from 'react-spinners'
import {
  IdentityCardWrapper, ProfilePictureInformation,
  ProfileImage, UserName
} from './styles'
import { Euro, LocalMall, SettingsApplications } from '@material-ui/icons'
import {
  Typography, List, ListItem,
  ListItemIcon, ListItemText
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
    selectedIndex: 0,
    creationDate: this.props.user.metadata.creationTime,
    loading: true
  }

  componentWillMount() {
    this.setState({
      loading: true
    })
    fetchUser(auth.currentUser.email, () => {
      alert("Error: can't fetch data")
    }, (data) => {
      this.setState({
        creationDate: data.creationDate,
        loading: false
      })
    })
  }

  handleTabs = (e, selectedIndex) => {
    this.setState({
      selectedIndex: selectedIndex
    }, () => {
      this.props.parentCallBack(this.state.selectedIndex)
    })
  }
  
  render() {
    const { classes, user } = this.props
    const { selectedIndex, creationDate, loading } = this.state

    if (loading) {
      return (
        <PacmanLoader
          sizeUnit={"px"}
          size={20}
          color={'#123abc'}
          loading={loading}
          css={{position: 'absolute', left: '50%', top: '50%', zIndex: '999'}}
        />
      )
    }
    
    return (
      <IdentityCardWrapper>
        <ProfilePictureInformation>
          <ProfileImage>TB</ProfileImage>
          <UserName>
            <Typography variant="h5" component="h2">
              {auth.currentUser.displayName || 'N. A'}
            </Typography>
            <Typography variant="h7" component="h5">
              Member since {displayDate(creationDate.toDate().toString() || user.metadata.creationTime.toString())}
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
