import React, { Component } from 'react'
import { auth } from 'firebase.js'
import {
  LandingPageWrapper
} from './styles'
import Header from 'components/Header/Header'
import Intro from 'components/Intro/Intro'

class Landing extends Component {
  state = {
    isAuth: true
  }
  
  componentDidMount = async () => {
    await auth.onAuthStateChanged((user) => {
      console.log(user)
      if (!user) {
        this.setState({
          isAuth: false
        })
      }
    })
  }
  
  render () {
    return (
      <LandingPageWrapper>
        <Header isAuth={this.state.isAuth} />
        <Intro />
      </LandingPageWrapper>
    )
  }
}

export default Landing
