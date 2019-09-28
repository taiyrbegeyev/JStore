import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

export const HeaderContainer = styled.div`
  height: 15vh;
  width: 100vw;
  display: flex;
  font-size: 1.4rem;

  @media (min-width: 768px) {
    padding: 0 8rem;
  }
`

export const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
`

export const LogoAnchor = styled.a`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  padding: 0 2rem;
  color: black;
`

export const LogoImage = styled.img`
  width: 18rem;
`

export const MainNavBar = styled.ul`
  list-style-type: none;
  /* display: none; */
  margin-right: 2rem;

  @media (min-width: 768px) {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
    flex: 1;
  }
`

export const MainNavBarElements = styled.li`
  text-align: center;
  margin: 15px auto;

  @media (min-width: 768px) {
    margin: 0;
  }
`

export const MainNavBarElementsLinks = styled(Link)`
  &&& {
    color: #004180;
    font-size: 1.6rem;
    letter-spacing: 0.1rem;

    outline: none;
    text-decoration: none;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    &&& {
      padding: 0 2rem;
    }
  }
`

export const LoginButton = styled(Button)`
  &&& {
    color: #004180;
    font-size: 1.6rem;
    border: 0.2rem solid;
    border-color: #004180;
    text-transform: none;
    background-color: white;
  }

  @media (min-width: 768px) {
    &&& {
      font-size: 1.8rem;
      padding: 0.5rem 3rem;
    }
  }
`
