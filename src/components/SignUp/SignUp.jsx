import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase, { auth } from '../../firebase'
import  { getStarted } from 'firebase/auth.js'
import {
  SignUpContainer, Heading, LogoImage,
  SignUpForm, InputContainer, ButtonContainer,
  LegalNoticeContainer, LegalNotice, LegalNoticeAnchors,
  AlreadyHaveAccountContainer, AlreadyHaveAccount,
  LoginLinkContainer, LoginLink
} from './styles'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import logo from 'assets/jstore_logo.svg'

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    emailSubmitted: false,
    loading: false
  }

  handleCheckBox = (e) => {
    this.setState({ email: e.target.value })
  }

  handleEmailLinkAuth = () => {
    const actionCodeSettings = {
      'url': window.location.href, // Here we redirect back to this same page.
      'handleCodeInApp': true
    }

    this.setState({
      loading: true
    })
    getStarted(this.state.email, actionCodeSettings, err => {
      alert('Error, please make sure that everything is valid')
    }, () => {
      this.setState({
        loading: false
      })
    })
  }
  
  render () {
    return (
      <SignUpContainer>
        <Heading>
          <LogoImage src={logo} />
        </Heading>
        <SignUpForm autoComplete="off">
          {/* <InputContainer>
            <Input
              type="text"
              name="name"
              maxlength="255"
              placeholder="Name"
            />
          </InputContainer> */}
          <InputContainer>
            <Input
              type="text"
              name="email"
              maxlength="255"
              placeholder="Email (@jacobs-university.de)"
              value={this.state.email}
              onChange={this.handleCheckBox}
            />
          </InputContainer>
          <ButtonContainer>
            <Button 
              type="button"
              name="signup"
              value="Continue"
              onClick={this.handleEmailLinkAuth}
            />
          </ButtonContainer>
          <LegalNoticeContainer>
            <LegalNotice>By creating an account, you are agreeing to our <LegalNoticeAnchors>Terms of Service</LegalNoticeAnchors> and <LegalNoticeAnchors>Privacy Policy</LegalNoticeAnchors>.</LegalNotice>
          </LegalNoticeContainer>
        </SignUpForm>
        <AlreadyHaveAccountContainer>
          <AlreadyHaveAccount>Already have an account?</AlreadyHaveAccount>
        </AlreadyHaveAccountContainer>
        <LoginLinkContainer>
          <LoginLink to={'/login'}>Sign In</LoginLink>
        </LoginLinkContainer>
      </SignUpContainer>
    )
  }
}

export default SignUp
