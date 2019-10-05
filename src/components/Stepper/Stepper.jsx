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
import MultilineTextField from 'components/MultiLineTextField/MultiLineTextField'
import ImageUploader from 'components/ImageUploader/ImageUploader'
import PriceInput from 'components/PriceInput/PriceInput'
import PaymentOptionsCheckboxes from 'components/PaymentOptionsCheckboxes/PaymentOptionsCheckboxes'

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
      file: null,
      price: null,
      payment_options: []
    },
    error: false,
    isLoading: false
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

  handleSubmit = () => {
    if (this.handleNext() === true) {

    }
  }

  handleNext = () => {
    const { data } = this.state
    switch (this.state.activeStep) {
      case 1:
        if (!data.title || !data.category || !data.condition) {
          this.setState({
            error: true
          })
          return
        }
        break
      case 2:
        if (!data.description) {
          this.setState({
            error: true
          })
          return
        }
        break
      case 3:
        if (!data.file) {
          this.setState({
            error: true
          })
          return
        }
        break
      case 4:
        if (!data.price || !data.payment_options || !data.payment_options.length) {
          this.setState({
            error: true
          })
          return
        }
        return true
    }
    this.setState((prevState) => {
      return {
        error: false,
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
    const { error, data } = this.state
    switch (this.state.activeStep) {
      case 1:
        return (
          <React.Fragment>
            <RedditTextField
              label="Title*"
              data_name="title"
              parentCallBack={this.callBackfunction}
              error={error && !data.title}
            />
            <SimpleSelect
              label="Category*"
              data_name="category"
              drop_down_items={categories}
              parentCallBack={this.callBackfunction}
              error={error && !data.category}
            />
            <SimpleSelect
              label="Condition*"
              data_name="condition"
              drop_down_items={conditions}
              parentCallBack={this.callBackfunction}
              error={error && !data.condition}
            />
          </React.Fragment>
        )
      case 2:
        return (
          <MultilineTextField
            label="Description*"
            data_name="description"
            parentCallBack={this.callBackfunction}
            error={error && !data.description}
          />
        )
      case 3:
        return (
          <ImageUploader
            data_name="file"
            parentCallBack={this.callBackfunction}
            error={error && !data.file}
          />
        )
      case 4:
        return (
          <React.Fragment>
            <PriceInput
              data_name="price"
              parentCallBack={this.callBackfunction}
              error={error && !data.price}
            />
            <PaymentOptionsCheckboxes
              data_name="payment_options"
              parentCallBack={this.callBackfunction}
              error={error && (!data.payment_options || !data.payment_options.length)}
            />
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
                      onClick={activeStep === steps.length - 1 ? this.handleSubmit : this.handleNext}
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
