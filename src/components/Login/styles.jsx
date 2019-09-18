import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 51.2rem;
  @media (min-width: 768px) {
    padding: 6.2rem 10rem 4.8rem;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  }
`

export const Heading = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    margin-bottom: 4.5rem;
  }
`

export const LogoImage = styled.img`
  width: 16rem;
  @media (min-width: 768px) {
    width: 18rem;
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`

export const InputContainer = styled.div`
  margin: auto;
  width: 30rem;
  margin-bottom: 1rem;
`

export const ButtonContainer = styled.div`
  margin: auto;
  width: 30rem;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`
