import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const WelcomeBackText = styled.p`
  font-size: 1.8rem;
  font-weight: 420;
  margin-right: 4rem;
  color: #004180;
  display: none;

  @media (min-width: 768px) {
    display: block;
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

export const StartUp = styled(Button)`
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
