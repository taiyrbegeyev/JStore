import styled from 'styled-components'
import { Button, ListItemIcon } from '@material-ui/core'

export const HeaderContainer = styled.div`
  height: 15vh;
  width: 100vw;
  display: flex;
  font-size: 1.4rem;
  align-items: center;
  padding: 0 2rem;

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
  width: 14rem;

  @media (min-width: 768px) {
    width: 18rem;
  }
`

export const MainNavBar = styled.ul`
  list-style-type: none;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    align-items: center;
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

export const MainNavBarElementsLinks = styled(Button)`
  &&& {
    color: #004180;
    font-size: 1.6rem;
    letter-spacing: 0.1rem;

    outline: none;
    text-decoration: none;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    margin-left: 40px;
  }
`

export const ListContainer = styled.div`
  width: auto;
  box-sizing: border-box;
  padding: 0 1rem;
`

export const DrawerItems = styled(ListItemIcon)`
  &&& {
    color: #004180;
    outline: none;
    text-decoration: none;
    cursor: pointer;
  }
`
