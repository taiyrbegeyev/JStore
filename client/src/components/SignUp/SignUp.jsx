import React, { Component } from 'react'
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
  }
  
  render () {
    return (
      <SignUpContainer>
        <Heading>
          <LogoImage src={logo} />
        </Heading>
        <SignUpForm noValidate autoComplete="off">
          <InputContainer>
            <Input
              type="text"
              name="name"
              maxlength="255"
              placeholder="Name"
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              name="email"
              maxlength="255"
              placeholder="Email (@jacobs-university.de)"
            />
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              name="password"
              placeholder="Password"
            />
          </InputContainer>
          <ButtonContainer>
            <Button 
              type="submit"
              name="signup"
              value="Continue"
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
