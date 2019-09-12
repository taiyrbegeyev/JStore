import React, { Component } from 'react'
import  { anonymousSignIn } from 'firebase/auth.js'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks,
  LoginButton
} from './styles'
import logo from 'assets/jstore_logo.svg'

class Header extends Component {
  handleDemo = () => {
    anonymousSignIn((err) => {
      alert('Something went wrong. Contact t.begeyev@jacobs-university.de')
    })
  }
  
  render() {
    return (
      <HeaderContainer>
        <NavBar>
          <Logo>
            <LogoAnchor>
              <LogoImage src={logo} />
            </LogoAnchor>
          </Logo>
          <MainNavBar>
            <MainNavBarElements>
            <MainNavBarElementsLinks to={'/home'}>Demo</MainNavBarElementsLinks>
              <span style={{marginRight: '20px'}}>or</span>
              <MainNavBarElementsLinks to={'/get-started'}>
                <LoginButton
                  variant="outlined"
                  onClick={this.handleDemo}
                >
                  Get Started
                </LoginButton>
              </MainNavBarElementsLinks>
            </MainNavBarElements>
          </MainNavBar>
        </NavBar>
      </HeaderContainer>
    )
  }
}

export default Header