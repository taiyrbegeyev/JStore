import React, { Component } from 'react'
import { MainContainer, UploadProductTitle } from './styles'
import HomePageHeader from 'components/HomePageHeader/HomePageHeader'
import StepperUpload from 'components/Stepper/Stepper'

class UploadProduct extends Component {
  componentWillMount () {
    window.localStorage.clear()
  }
  
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
