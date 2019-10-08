import React, { Component } from 'react'
import { auth } from 'firebase.js'
import {
  LandingPageWrapper
} from './styles'
import { Footer, Header, Intro } from 'components/export'

class Landing extends Component {
  state = {
    isAuth: false,
    user: null
  }
  
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuth: true,
          user: user
        })
      } else {
        this.setState({
          isAuth: false,
          user: null
        })
      }
    })
  }
  
  render () {
    return (
      <LandingPageWrapper>
        <Header isAuth={this.state.isAuth}/>
        <Intro />
        <Footer />
      </LandingPageWrapper>
    )
  }
}

export default Landing
