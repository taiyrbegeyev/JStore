import React, { Component } from 'react'
import { auth } from 'firebase.js'
import {
  Container, WelcomeBackText
} from './styles'

class WelcomeBack extends Component {
  state = {
    name: ''
  }
  
  componentWillMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
      }
    })
  }
  
  render() {
    return (
      <Container>
        <WelcomeBackText>
          Welcome Back {this.state.name}
        </WelcomeBackText>
      </Container>
    )
  }
}

export default WelcomeBack
