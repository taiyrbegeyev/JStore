import styled from 'styled-components'

export const HeaderContainer = styled.div`
  background-color: gray;
  height: 15vh;
  width: 100vw;
  display: flex;
`

export const NavBar = styled.nav`
  width: 100%;
  font-size: 1.8rem;
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
  width: 10rem;
  height: 10rem;
`

export const MainNavBar = styled.ul`
  list-style-type: none;
  display: none;

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

export const MainNavBarElementsLinks = styled(LogoAnchor)`
  @media (min-width: 768px) {
    margin-left: 40px;
  }
`
