import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import RedditTextField from 'components/RedditTextField/RedditTextField'
import SimpleSelect from 'components/Select/Select'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  },
  palette: {
    primary: {
      main: '#004180',
    },
  },
})

const categories = [
  'Apparel, Shoes & Watches',
  'Automotive, Motorcycle & Industrial',
  'Beauty & Health',
  'Books & Audible',
  'Electronics & Computers',
  'Grocery/Food',
  'Home, Garden, Pets & DIY',
  'Movies, TV, Music & Games',
  'Sports & Outdoors',
  'Other'
]

const conditions = [
  'New',
  'Open Box',
  'Used',
  'For parts or not working'
]

class StepperUpload extends Component {
  state = {
    activeStep: 0,
    data: {
      title: null,
      category: null,
      condition: null,
      description: null,
      pick_up_location: null,
      price: null,
      payment_options: null
    }
  }

  getSteps() {
    return ['General Information', 'Add Product Details', 'Add Product Description', 'Add Product Images', 'Add Sellings Details']
  }
  
  getStepContent(step) {
    switch (step) {
      case 0:
        return `Creating a listing is the first step in getting your item in front of buyers. 
        Depending on your needs, we can help to make sure your listing ends in a sale. When listing your item, start by describing what you're selling. You can add photos, select the brand and physical details about the item, and set a price.`
      default:
        return ''
    }
  }

  handleNext = () => {
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep + 1
      }
    })
  }

  handleBack = () => {
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep - 1
      }
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  handleSteps = () => {
    switch (this.state.activeStep) {
      case 1:
        return (
          <React.Fragment>
            <RedditTextField label="Title*" data_name="title" parentCallBack={this.callBackfunction} />
            <SimpleSelect label="Category*" data_name="category" drop_down_items={categories} parentCallBack={this.callBackfunction} />
            <SimpleSelect label="Condition*" data_name="condition" drop_down_items={conditions} parentCallBack={this.callBackfunction} />
          </React.Fragment>
        )
      default:
        return
    }
  }

  callBackfunction = (key, value) => {
    this.setState(prevState => ({
        data: {
          ...prevState.data,
          [key]: value
        }
    }))
  }

  render() {
    console.log(this.state.data)
    const {activeStep} = this.state
    const steps = this.getSteps()
    return (
      <ThemeProvider theme={theme}>
        <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                {
                  this.handleSteps ()
                }
                <div>
                  <div style={{marginTop: '3rem'}}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset}>
              Reset
            </Button>
          </Paper>
        )}
        </div>
      </ThemeProvider>
    )
  }
}

export default StepperUpload
