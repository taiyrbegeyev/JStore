import React, { Component } from 'react'
import { auth } from 'firebase.js'
import {
  Container, WelcomeBackText
} from './styles'

class WelcomeBack extends Component {
  render() {
    return (
      <Container>
        <WelcomeBackText>
          Welcome Back
        </WelcomeBackText>
      </Container>
    )
  }
}

export default WelcomeBack
