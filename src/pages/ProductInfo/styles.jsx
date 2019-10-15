import styled from 'styled-components'

export const MainContainer = styled.div`
  margin: 2rem 0 0 0;
  padding: 2rem 2rem;

  @media (min-width: 768px) {
    padding: 0 3rem 0 6rem;
  }

  @media (min-width: 960px) {
    padding: 0 6rem 0 10.5rem;
    flex-direction: row;
  }

  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
`

export const ImageContainer = styled.div`
  width: 100%;
  align-self: center;
  @media (min-width: 600px) {
    width: 70%;
  }

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 960px) {
    width: 50%;
    align-self: flex-start;
  }
  
  @media (min-width: 1280px) {
    width: 35%;
  }
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`

export const ProductInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 960px) {
    margin-left: 6rem;
  }
`

export const TitleContainer = styled.div`
  margin: 4rem 0;
  width: 100%;
  @media (min-width: 960px) {
    margin: 0;
    width: 80%;
  }
`

export const OwnerInfoContainer = styled.div`
  margin: 2rem 0 0 0;
  display: flex;
  align-items: center;
`

export const OwnerInfo = styled.div`
  margin-left: 1rem;
`

export const ProductSpecificationsContainer = styled.div`
  @media (min-width: 960px) {
    margin: 4rem 0 0 0rem;
  }
`

export const PreferredPaymentOptions = styled.div`
  margin: 2rem 0 0 0;
`

export const ProductInfo2 = styled.div`
  margin: 4rem 0 0 0;
  @media (min-width: 960px) {
    margin: 4rem 0 0 6rem;
  }
`
