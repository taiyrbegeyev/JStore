import React, { Component } from 'react'
import { LoginWrapper } from './styles'
import Login from 'components/Login/Login'

class LoginPage extends Component {
  render () {
    return (
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    )
  }
}

export default LoginPage
