import styled from 'styled-components'

export const IntroContainer = styled.div`
  height: 85vh;
  width: 100vw;
  background-image: url("${props => props.imageUrl}");
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 85vh;
    padding: 0 8rem;
  }
`

export const LeftContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
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

  @media (min-width: 768px) {
    font-size: 5.6rem;
    line-height: 7.2rem;
  }
`

export const Description = styled.h4`
  font-weight: 400;
  font-size: 2rem;
  line-height: 3.2rem;
  margin-bottom: 4rem;    

  @media (min-width: 768px) {
    font-size: 2.4rem;
    line-height: 4rem;
    margin-bottom: 3.5rem;  
  }
`

export const RightContainer = styled.div`

`
