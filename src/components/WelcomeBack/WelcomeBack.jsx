import React, { Component } from 'react'
import {
  Container, WelcomeBackText, StartUp,
  MainNavBarElementsLinks
} from './styles'

class WelcomeBack extends Component {
  render() {
    return (
      <Container>
        <WelcomeBackText>Welcome Back!</WelcomeBackText>
        <MainNavBarElementsLinks to={'/home'}>
          <StartUp>Start Up</StartUp>
        </MainNavBarElementsLinks>
      </Container>
    )
  }
}

export default WelcomeBack
