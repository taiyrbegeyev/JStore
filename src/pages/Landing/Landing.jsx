import React, { Component } from 'react'
import Header from 'components/Header/Header'
import Intro from 'components/Intro/Intro'

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Intro />
      </React.Fragment>
    )
  }
}

export default Landing
