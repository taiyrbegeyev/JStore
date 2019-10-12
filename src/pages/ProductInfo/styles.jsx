import styled from 'styled-components'

export const MainContainer = styled.div`
  padding: 2rem 2rem;

  @media (min-width: 768px) {
    padding: 0 6rem;
  }

  @media (min-width: 960px) {
    padding: 0 12rem;
    flex-direction: row;
  }

  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
`

export const ImageContainer = styled.div`
  width: 35rem;
  align-self: center;
  @media (min-width: 960px) {
    align-self: flex-start;
  }
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 960px) {
    width: 70%;
  }
`

export const ProductInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1280px) {
    flex-direction: row;
  }
`

export const TitleContainer = styled.div`
  margin: 4rem 0;
  @media (min-width: 960px) {
    margin: 0 0 0 4rem;
  }
`

export const OwnerInfoContainer = styled.div`
  margin: 2rem 0 0 0;
  @media (min-width: 960px) {
    margin: 4rem 0 0 0;
  }
  display: flex;
  align-items: center;
`

export const OwnerInfo = styled.div`
  margin-left: 1rem;
`

export const ProductSpecificationsContainer = styled.div`
  @media (min-width: 960px) {
    margin: 4rem 0 0 4rem;
  }
  @media (min-width: 1280px) {
    margin: 0 0 0 10rem;
  }
`

export const PreferredPaymentOptions = styled.div`
  margin: 2rem 0 0 0;
`

export const ProductInfo2 = styled.div`
  margin: 4rem 0 0 0;
  @media (min-width: 960px) {
    margin: 4rem 0 0 4rem;
  }
`

export const DescriptionContainer = styled.p`

`
