import React, { Component } from 'react'
import {
  ContentContainer, CheckedIcon, SuccessText
} from './styles'

class EmailSent extends Component {
  render() {
    return (
      <ContentContainer>
        <CheckedIcon />
        <SuccessText>
          Email has been successfully sent. Check your mailbox.
        </SuccessText>
      </ContentContainer>
    )
  }
}

export default EmailSent
