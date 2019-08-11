import React, { Component } from 'react'
import {
  HeaderContainer, NavBar, Logo, LogoImage, LogoAnchor,
  MainNavBar, MainNavBarElements, MainNavBarElementsLinks
} from './styles'
import logo from 'assets/jstore_logo.png'

class Header extends Component {
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
              <MainNavBarElementsLinks href="#">Home</MainNavBarElementsLinks>
            </MainNavBarElements>
          </MainNavBar>
        </NavBar>
      </HeaderContainer>
    )
  }
}

export default Header