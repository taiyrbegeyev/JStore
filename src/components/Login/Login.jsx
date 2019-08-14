import React, { Component } from 'react'
import {
  LoginContainer, Heading, LogoImage,
  LoginForm, InputContainer, ButtonContainer,
  ForgotPasswordContainer, ForgotPasswordAnchor,
  AlreadyHaveAccountContainer, AlreadyHaveAccount,
  LoginLinkContainer, LoginLink
} from './styles'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import logo from 'assets/jstore_logo.svg'

class Login extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }
  
  render () {
    return (
      <LoginContainer>
        <Heading>
          <LogoImage src={logo} />
        </Heading>
        <LoginForm noValidate autoComplete="off">
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
              name="Login"
              value="Continue"
            />
          </ButtonContainer>
          <ForgotPasswordContainer>
            <ForgotPasswordAnchor>Forgot password?</ForgotPasswordAnchor>
          </ForgotPasswordContainer>
        </LoginForm>
        <AlreadyHaveAccountContainer>
          <AlreadyHaveAccount>Don't have an account?</AlreadyHaveAccount>
        </AlreadyHaveAccountContainer>
        <LoginLinkContainer>
          <LoginLink to={'/signup'}>Create account</LoginLink>
        </LoginLinkContainer>
      </LoginContainer>
    )
  }
}

export default Login
