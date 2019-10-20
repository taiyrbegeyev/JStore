import React, { Component } from 'react'
import {
  IntroContainer, LeftContainer, Slogan,
  Description, DeviceImageContainer,
  DeviceImage_1, DeviceImage_2
} from './style'
import imageUrl from 'assets/texture_1.png'
import deviceUrl_1 from 'assets/mac.png'
import deviceUrl_2 from 'assets/iphone.png'

class Intro extends Component {
  render () {
    return (
      <IntroContainer imageUrl={imageUrl}>
        <LeftContainer>
          <Slogan>Your purchases. Organized. Effortless.</Slogan>
          <Description>Buy stuff anywhere. Find stuff faster. Sell stuff to anyone.</Description>
        </LeftContainer>
        {/* <RightContainer> */}
          <DeviceImageContainer>
            <DeviceImage_1 src={deviceUrl_1} />
            <DeviceImage_2 src={deviceUrl_2} />
          </DeviceImageContainer>
        {/* </RightContainer> */}
      </IntroContainer>
    )
  }
}

export default Intro
