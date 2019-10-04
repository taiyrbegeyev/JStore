import React, { Component } from 'react'
import HomePageHeader from 'components/HomePageHeader/HomePageHeader'
import StepperUpload from 'components/Stepper/Stepper'
import { MainContainer, UploadProductTitle } from './styles'

class UploadProduct extends Component {
  render() {
    return (
      <React.Fragment>
        <HomePageHeader />
        <MainContainer>
          <UploadProductTitle>Tell us what you're selling</UploadProductTitle>
          <StepperUpload />
        </MainContainer>
      </React.Fragment>
    )
  }
}

export default UploadProduct
