import styled from 'styled-components'

export const IntroContainer = styled.div`
  width: 100vw;
  background-image: url("${props => props.imageUrl}");
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 3rem;

  @media (min-width: 960px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 85vh;
    padding: 0rem 0 0 8rem;
  }
`

export const LeftContainer = styled.div`
  width: 100%;

  @media (min-width: 960px) {
    width: 50%;
    padding: 0 4rem 0 0;
  }
`

export const Slogan = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3.7rem;
  line-height: 4.5rem;
  color: #004180;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 5.6rem;
    line-height: 7.2rem;
  }

  @media (min-width: 960px) {
    text-align: left;
  }
`

export const Description = styled.h4`
  font-weight: 400;
  font-size: 2rem;
  line-height: 3.2rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.4rem;
    line-height: 4rem;
    margin-bottom: 3.5rem;
  }

  @media (min-width: 960px) {
    text-align: left;
  }
`

export const DeviceImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 960px) {
    max-width: 45%;
    flex-direction: row;
  }
  @media (min-width: 1366px) {
    max-width: 40%;
    flex-direction: row;
  }
  @media (min-width: 1920px) {
    max-width: 35%;
    flex-direction: row;
  }
`

export const DeviceImage_1 = styled.img`
  width: 100%;

  @media (min-width: 768px) {
    width: 75%;
    margin-top: -5rem;
  }
  
  @media (min-width: 960px) {
    width: 85%;
    margin-top: 0;
  }
`

export const DeviceImage_2 = styled.img`
  width: 100%;
  margin-top: -5rem;
  @media (min-width: 768px) {
    width: 75%;
    margin-top: -10rem;
  }
  
  @media (min-width: 960px) {
    width: 85%;
    margin-top: 0;
    margin-left: -30rem;
  }
`
