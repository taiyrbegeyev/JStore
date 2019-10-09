import React, { Component } from 'react'
import {
  LandingPageWrapper
} from './styles'
import { Footer, Header, Intro } from 'components/export'

class Landing extends Component {
  render () {
    return (
      <LandingPageWrapper>
        <Header isAuth={this.props.isAuth} />
        <Intro isAuth={this.props.isAuth} />
        <Footer isAuth={this.props.isAuth} />
      </LandingPageWrapper>
    )
  }
}

export default Landing
