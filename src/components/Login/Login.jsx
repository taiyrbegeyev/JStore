import React, { Component } from 'react'
import  { registerNewUser } from 'firebase/auth.js'
import {
  LoginContainer, Heading, LogoImage,
  LoginForm, InputContainer, ButtonContainer,
  LoadingContainer
} from './styles'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import EmailSent from 'components/EmailSent/EmailSent'
import logo from 'assets/jstore_logo.svg'
import { PacmanLoader } from 'react-spinners'

class Login extends Component {
  state = {
    name: '',
    email: localStorage.getItem("email"),
    college: '',
    emailSentSuccessfully: false,
    loading: false
  }

  handleInputBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegisterNewUser = (e) => {
    e.preventDefault()
    const actionCodeSettings = {
      'url': `${process.env.REACT_APP_BASE_URL}/home`,
      'handleCodeInApp': true
    }

    this.setState({
      loading: true
    })

    registerNewUser(this.state.name, this.state.email, this.state.college, actionCodeSettings, errHandler => {
      alert('Error, please make sure that everything is valid')
      this.setState({
        loading: false,
        emailSentSuccessfully: false
      })
    }, () => {
      this.setState({
        loading: false,
        emailSentSuccessfully: true
      })
    })    
  }
  
  render () {
    return (
      <LoginContainer>
        <Heading>
          <LogoImage src={logo} />
        </Heading>
        {
          this.state.emailSentSuccessfully === true && !this.state.loading
          ? <EmailSent />
          :
          <React.Fragment>
            <LoginForm noValidate autoComplete="off">
              <InputContainer>
                <Input
                  type="text"
                  name="name"
                  maxlength="255"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleInputBox}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  name="college"
                  maxlength="255"
                  placeholder="College"
                  value={this.state.college}
                  onChange={this.handleInputBox}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  name="email"
                  maxlength="255"
                  placeholder="Email (@jacobs-university.de)"
                  value={this.state.email}
                  onChange={this.handleInputBox}
                />
              </InputContainer>
              <ButtonContainer>
                <Button 
                  type="submit"
                  name="Login"
                  value="Continue"
                  onClick={this.handleRegisterNewUser}
                />
              </ButtonContainer>
            </LoginForm>
            {
              this.state.loading &&
              <LoadingContainer>
                <PacmanLoader
                  sizeUnit={"px"}
                  size={20}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              </LoadingContainer>
            }
          </React.Fragment>
        }
      </LoginContainer>
    )
  }
}

export default Login
