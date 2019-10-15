import React, { Component } from 'react'
import {
  IdentityCardWrapper, ProfilePictureInformation,
  ProfileImage, UserName, ListOfTabs, Tab
} from './styles'
import { Typography } from '@material-ui/core'

class IdentityCard extends Component {
  render() {
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
          <Tab>hey</Tab>
          <Tab>hey</Tab>
        </ListOfTabs>
      </IdentityCardWrapper>
    )
  }
}

export default IdentityCard
