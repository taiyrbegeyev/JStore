import React, { Component } from 'react'
import {
  IntroContainer, LeftContainer, Slogan,
  Description, RightContainer
} from './style'
import imageUrl from 'assets/texture_1.png'

class Intro extends Component {
  render() {
    return (
      <IntroContainer imageUrl={imageUrl}>
        <LeftContainer>
          <Slogan>Your purchases. Organized. Effortless.</Slogan>
          <Description>Take notes anywhere. Find information faster. Share ideas with anyone. Meeting notes, web pages, projects, to-do lists—with Evernote as your note taking app, nothing falls through the cracks.</Description>
        </LeftContainer>
        <RightContainer>

        </RightContainer>
      </IntroContainer>
    )
  }
}

export default Intro
