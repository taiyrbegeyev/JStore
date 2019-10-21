import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  LandingPageWrapper, ClassHomeWorkWrapper,
  JStoreWrapper, JStoreText, JStoreTitle,
  JStoreImg, JStoreSubTitle, Yoga, YogaText, Title1,
  EasyToSellContainer, Steps, Step, StepIcon, StepTitle,
  StepDescription, StepIconWrapper
} from './styles'
import { LoginButton } from 'components/Header/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Footer, Header, Intro } from 'components/export'
import yoga from 'assets/yoga.svg'
import compass from 'assets/compass.svg'
import key from 'assets/key.svg'
import upload from 'assets/upload.svg'
import search from 'assets/search.svg'
import money from 'assets/money.svg'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

class Landing extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <LandingPageWrapper>
          <Header isAuth={this.props.isAuth} />
          <Intro />
          <JStoreWrapper>
            <JStoreText>
              <JStoreTitle>
                JStore is a vibrant marketplace. There's no equal.
              </JStoreTitle>
            </JStoreText>
            <JStoreImg src={compass} />
            <JStoreText>
              <JStoreSubTitle>
              You want hundreds of people all over the campus to see what you're selling? You're in the right place.
              </JStoreSubTitle>
            </JStoreText>
          </JStoreWrapper>
          <ClassHomeWorkWrapper>
            <Yoga src={yoga} />
            <YogaText>
              <Title1>
                In class, at home, and everywhere in between
              </Title1>
            </YogaText>
          </ClassHomeWorkWrapper>
          <EasyToSellContainer>
            <Title1>
              It really is easy to sell on JStore
            </Title1>
            <Steps>
              <Step>
                <StepIconWrapper>
                  <StepIcon src={key} />
                </StepIconWrapper>
                <StepTitle>
                  Sign Up
                </StepTitle>
                <StepDescription>
                  Enter your Jacobs email to receive an authentication link. Since we don't store any passwords, you don't need to create one. Fast and secure!
                </StepDescription>
              </Step>
              <Step>
                <StepIconWrapper>
                  <StepIcon src={upload} />
                </StepIconWrapper>
                <StepTitle>
                  Add Products
                </StepTitle>
                <StepDescription>
                  Snap some photos and write a great description. It takes less than one minute to upload a post!
                </StepDescription>
              </Step>
              <Step>
                <StepIconWrapper>
                  <StepIcon src={search} />
                </StepIconWrapper>
                <StepTitle>
                  Find everything
                </StepTitle>
                <StepDescription>
                  Search by your favorite categories. You can contact the owner either by email or What's App buttons.
                </StepDescription>
              </Step>
              <Step>
                <StepIconWrapper>
                  <StepIcon src={money} />
                </StepIconWrapper>
                <StepTitle>
                  Make some money
                </StepTitle>
                <StepDescription>
                  Each product has its own "preferred payment options". So you can find people who are even willing to accept meal plan as one of the payment methods. Being broke has never been so beneficial!
                </StepDescription>
              </Step>
            </Steps>
          </EasyToSellContainer>
          <JStoreWrapper>
            <JStoreText>
              <JStoreTitle>
                Think you don't have anything to sell? Think again.
              </JStoreTitle>
            </JStoreText>
            <JStoreText>
              <JStoreSubTitle>
                So many things sell great on JStore. Just give it a try.
              </JStoreSubTitle>
            </JStoreText>
            <Link to={'/get-started'}>
              <LoginButton
                variant="outlined"
                style={{marginTop: '4rem'}}
              >
                Get Started
              </LoginButton>
            </Link>
          </JStoreWrapper>
          <Footer />
        </LandingPageWrapper>
      </MuiThemeProvider>
    )
  }
}

export default Landing
