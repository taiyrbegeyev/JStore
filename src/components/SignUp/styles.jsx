import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SignUpContainer = styled.div`
  width: 100%;
  max-width: 51.2rem;
  padding: 0 2rem;
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

export const SignUpForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`

export const InputContainer = styled.div`
  margin: auto;
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
`

export const ButtonContainer = styled.div`
  margin: auto;
  width: 100%;
  margin-top: 0.7rem;
  margin-bottom: 1.4rem;
`

export const LegalNoticeContainer = styled.div`
  text-align: center;
  width: 280px;
  margin: 0 auto;
  font-size: 1.2rem;
`

export const LegalNotice = styled.p`
  color: #a6a6a6;
`

export const LegalNoticeAnchors = styled(Link)`
  &&& {
    color: #004180;
    text-decoration: none; 
  }
`

export const LoginLinkContainer = styled.div`
  text-align: center;
  margin-top: 0.6rem;
`

export const LoginLink = styled(Link)`
  &&& {
    color: #004180;
    font-size: 1.6rem;
    letter-spacing: 0.1rem;

    outline: none;
    text-decoration: none;
    cursor: pointer;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`
