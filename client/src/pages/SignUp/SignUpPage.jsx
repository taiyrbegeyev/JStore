import React, { Component } from 'react'
import { SignUpWrapper } from './styles'
import SignUp from 'components/SignUp/SignUp'

class SignUpPage extends Component {
  render () {
    return (
      <SignUpWrapper>
        <SignUp />
      </SignUpWrapper>
    )
  }
}

export default SignUpPage
