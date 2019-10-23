import styled from 'styled-components'

export const LandingPageWrapper = styled.div`
  height: 100vh;
`

export const JStoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 3rem;
`

export const JStoreText = styled.div`
  margin-top: 2rem;
`

export const JStoreTitle = styled.p`
  font-size: "Helvetica Neue","Segoe UI",Helvetica,Arial,sans-serif;
  font-size: 4rem;
  font-weight: lighter;
  text-align: center;
  line-height: 1.25;
  max-width: 600px;
`

export const JStoreSubTitle = styled.p`
  margin-top: 2rem;
  line-height: 1.4;
  font-size: 2rem;
  max-width: 550px;
  text-align: center;
`

export const JStoreImg = styled.img`
  width: 10rem;
  margin-top: 2rem;
`

export const ClassHomeWorkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 3rem;
`

export const Yoga = styled.img`
  width: 12rem;
`

export const YogaText = styled.div`
  margin-top: 2rem;
`

export const Title1 = styled.p`
  font-size: "Helvetica Neue","Segoe UI",Helvetica,Arial,sans-serif;
  font-size: 4rem;
  font-weight: lighter;
  text-align: center;
  line-height: 1.25;
`

export const EasyToSellContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Steps = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: 960px) {
    flex-direction: row;
  }
`

export const Step = styled.div`
  margin: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StepIconWrapper = styled.div`
  border-radius: 50%;
  border: 0.2rem solid;
  border-color: #d3d3d3;
`

export const StepIcon = styled.img`
  padding: 2rem;
  width: 12rem;
`

export const StepTitle = styled.p`
  margin-top: 2rem;
  font-family: "Helvetica Neue","Segoe UI",Helvetica,Arial,sans-serif;
  font-size: 3rem;
  text-align: center;
  line-height: 1.25;
`

export const StepDescription = styled.p`
  margin-top: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: #192026;
  font-size: 1.8rem;
  text-align: center;
  line-height: 1.55;
  @media (min-width: 960px) {
    max-width: 30rem;
  }
`

export const GetOnGooglePlay = styled.img`
  width: 20rem;
`
