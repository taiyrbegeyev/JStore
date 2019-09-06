import React, { Component } from 'react'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks,
  LoginButton
} from './styles'
import logo from 'assets/jstore_logo.svg'

class Header extends Component {
  state = {
    goToSignUp: false
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
              <MainNavBarElementsLinks to={'/signup'}>Sign up</MainNavBarElementsLinks>
              <span style={{marginRight: '20px'}}>or</span>
              <LoginButton variant="outlined">Log in</LoginButton>
            </MainNavBarElements>
          </MainNavBar>
        </NavBar>
      </HeaderContainer>
    )
  }
}

export default Header