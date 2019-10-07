import React, { Component } from 'react'
import { createPost, uploadImage } from 'firebase/upload'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import {
  Stepper, Step, StepLabel,
  StepContent, Button, Typography
} from '@material-ui/core'
import {
  RedditTextField, SimpleSelect,
  MultilineTextField, ImageUploader,
  PriceInput, PaymentOptionsCheckboxes
} from 'components/export'
import { PacmanLoader } from 'react-spinners'
import uuidv1 from 'uuid'
import { auth } from 'firebase.js'

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
    loading: false
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
      this.setState({
        loading: true
      })

      const { data } = this.state
      // verify data once again
      if (!data.title || !data.category || !data.condition || !data.description ||
          !data.file || !data.price || !data.payment_options || !data.payment_options.length) {

        alert('Something went wrong. Verify your entries.')
        this.setState({
          loading: false
        })
        return
      }

      // In case nothing fails, proceed
      // upload image to the storage
      const postId = uuidv1();
      const post = {
        ownerId: auth.currentUser.email,
        ...data,
      }
      delete post.file
      console.log(post)
      createPost(postId, post, () => {
        alert('Error while creating a new post. Contact t.begeyev@jacobs-university.de')
      }, () => {
        console.log('Post added')
      })

      uploadImage(data.file, postId, () => {
        alert('Error while uploading an image')
      }, () => {
        console.log('Picture uploaded')
        this.setState({
          loading: false
        })
        this.handleReset()
      })
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
        // check if price is a number
        const price = !data.price || isNaN(data.price)
        
        if (price || !data.payment_options || !data.payment_options.length) {
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
    window.localStorage.clear()
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
            error_img={error && !data.file}
          />
        )
      case 4:
        return (
          <React.Fragment>
            <PriceInput
              data_name="price"
              parentCallBack={this.callBackfunction}
              error={error && (!data.price || isNaN(data.price))}
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
    const {activeStep} = this.state
    const steps = this.getSteps()
    return (
      <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{this.getStepContent(index)}</Typography>
                {
                  this.handleSteps ()
                }
                {
                  this.state.loading &&
                  <React.Fragment>
                    <PacmanLoader
                      sizeUnit={"px"}
                      size={20}
                      color={'#123abc'}
                      loading={this.state.loading}
                    />
                  </React.Fragment>
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
      </ThemeProvider>
    )
  }
}

export default StepperUpload
