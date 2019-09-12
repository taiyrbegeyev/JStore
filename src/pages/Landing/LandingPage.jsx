import React, { Component } from 'react'
import {
  LandingPageWrapper
} from './styles'
import Header from 'components/Header/Header'
import Intro from 'components/Intro/Intro'

class Landing extends Component {
  render () {
    return (
      <LandingPageWrapper>
        <Header />
        <Intro />
      </LandingPageWrapper>
    )
  }
}

export default Landing
