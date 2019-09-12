import React, { Component } from 'react'
import  { anonymousUserHandler } from 'firebase/auth.js'
import HomePageHeader from 'components/HomePageHeader/HomePageHeader'

class Home extends Component {
  state = {
    user: undefined
  }
  
  componentDidMount = () => {
    this.setState({
      user: anonymousUserHandler
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <HomePageHeader />
        <p>{this.state.user}</p>
      </React.Fragment>
    )
  }
}

export default Home
