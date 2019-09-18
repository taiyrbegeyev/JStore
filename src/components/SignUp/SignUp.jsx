import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { db } from 'firebase.js'
import  { getStarted } from 'firebase/auth.js'
import {
  SignUpContainer, Heading, LogoImage,
  SignUpForm, InputContainer, ButtonContainer,
  LegalNoticeContainer, LegalNotice, LegalNoticeAnchors,
  AlreadyHaveAccountContainer, AlreadyHaveAccount,
  LoginLinkContainer, LoginLink, LoadingContainer
} from './styles'
import EmailSent from 'components/EmailSent/EmailSent'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import { PacmanLoader } from 'react-spinners'
import logo from 'assets/jstore_logo.svg'

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    emailSentSuccessfully: false,
    emailExists: undefined,
    loading: false
  }

  handleInputBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckEmail = (e) => {
    e.preventDefault()
    db.collection('users').doc(this.state.email || "error").get()
      .then(email => {
        if (!email.exists) {
          this.setState({
            emailExists: false
          }, () => {
            console.log('Email doesnt exist')
            localStorage.setItem("email", this.state.email);
          })
        } else {
          this.setState({
            emailExists: true
          }, () => {
            console.log('Email exists')
          })
          this.handleEmailLinkAuth()
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  handleEmailLinkAuth = () => {
    const actionCodeSettings = {
      'url': `${process.env.REACT_APP_BASE_URL}`,
      'handleCodeInApp': true
    }

    this.setState({
      loading: true
    })

    getStarted(this.state.email, actionCodeSettings, errHandler => {
      alert('Error, please make sure that everything is valid')
    }, () => {
      this.setState({
        loading: false,
        emailSentSuccessfully: true
      })
    })
  }
  
  render () {
    if (this.state.emailExists === false) {
      return <Redirect to='/register' />
    }
    
    return (
      <SignUpContainer>
        <Heading>
          <LogoImage src={logo} />
        </Heading>
        {
          this.state.emailSentSuccessfully && !this.state.loading
          ? <EmailSent />
          : 
          <React.Fragment>
            <SignUpForm novalidate autoComplete="off">
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
                  name="signup"
                  value="Continue"
                  onClick={this.handleCheckEmail}
                />
              </ButtonContainer>
              <LegalNoticeContainer>
                <LegalNotice>By clicking Continue, you are agreeing to our <LegalNoticeAnchors>Terms of Service</LegalNoticeAnchors> and <LegalNoticeAnchors>Privacy Policy</LegalNoticeAnchors>.</LegalNotice>
              </LegalNoticeContainer>
            </SignUpForm>
            <AlreadyHaveAccountContainer>
              <AlreadyHaveAccount>Just want to test JStore?</AlreadyHaveAccount>
            </AlreadyHaveAccountContainer>
            <LoginLinkContainer>
              <LoginLink to={'/demo'}>Demo</LoginLink>
            </LoginLinkContainer>
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
      </SignUpContainer>
    )
  }
}

export default SignUp
