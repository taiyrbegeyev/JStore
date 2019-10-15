import React, { Component } from 'react'
import {
  IdentityCardWrapper, ProfilePictureInformation,
  ProfileImage, UserName, ListOfTabs, Tab
} from './styles'
import { Person, Euro, LocalMall, SettingsApplications } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const useStyles = theme => ({
  icon: {
    marginRight: '1rem'
  }
})

class IdentityCard extends Component {
  render() {
    const { classes } = this.props
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
        <ListOfTabs>
          <Tab>
            <Person className={classes.icon} />
            <Typography variant="h7" component="h5">
              Personal Info
            </Typography>
          </Tab>
          <Tab>
            <LocalMall className={classes.icon} />
            <Typography variant="h7" component="h5">
              Active Items
            </Typography>
          </Tab>
          <Tab>
            <Euro className={classes.icon} />
            <Typography variant="h7" component="h5">
              Sold Items
            </Typography>
          </Tab>
          <Tab>
            <SettingsApplications className={classes.icon} />
            <Typography variant="h7" component="h5">
              Settings
            </Typography>
          </Tab>
        </ListOfTabs>
      </IdentityCardWrapper>
    )
  }
}

export default withStyles(useStyles)(IdentityCard)
