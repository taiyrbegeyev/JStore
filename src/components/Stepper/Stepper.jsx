import React, { Component } from 'react'
import { fetchPhoneNumberOfUser } from 'firebase/user.js'
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
  PriceInput, PaymentOptionsCheckboxes,
  SnackBar
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
      paymentOptions: []
    },
    error: false,
    loading: false,
    saved: false
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
      // in case nothing fails, continue
      if (!data.title || !data.category || !data.condition || !data.description ||
          !data.file || !data.price || !data.paymentOptions || !data.paymentOptions.length) {

        alert('Something went wrong. Verify your entries.')
        this.setState({
          loading: false
        })
        return
      }

      const postId = uuidv1();
      // upload image to the storage first, get imageUrl and then write it into post object
      uploadImage(data.file, postId, () => {
        alert('Error while uploading an image')
      }, () => {
        console.log('Picture uploaded')
      }, (url) => {
        console.log(url)

        fetchPhoneNumberOfUser(auth.currentUser.email, (phoneNumber) => {
          const post = {
            postId: postId,
            ownerId: auth.currentUser.email,
            ownerName: auth.currentUser.displayName,
            imageUrl: url,
            sold: false,
            soldDate: null,
            whatsApp: phoneNumber === '' ? false : true,
            phoneNumber: phoneNumber,
            ...data,
          }
          delete post.file
        
          console.log(post)
          // upload post to the firestore
          createPost(postId, post, () => {
            alert('Error while creating a new post. Contact t.begeyev@jacobs-university.de')
          }, () => {
            console.log('Post added')
            this.setState({
              loading: false,
              saved: true
            })
            // alert('Product was successfully added')
            this.handleReset()
          })
        })
      })
    }
  }

  handleNext = () => {
    const { data } = this.state
    // eslint-disable-next-line
    switch (this.state.activeStep) {
      case 1:
        if (!data.title || data.title.length > 50 || !data.category || !data.condition) {
          this.setState({
            error: true
          })
          return
        }
        break
      case 2:
        if (!data.description || data.description.length > 300) {
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

        if (data.price.length > 8) {
          alert('Error: Amount of digits exceeded')
        }
        
        if (price || !data.paymentOptions || !data.paymentOptions.length || data.price.length > 8) {
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
        saved: false,
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
              error={error && (!data.title || data.title.length > 50)}
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
            error={error && (!data.description || data.description.length > 300)}
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
              error={error && (!data.price || isNaN(data.price) || data.price.length > 8)}
            />
            <PaymentOptionsCheckboxes
              data_name="paymentOptions"
              parentCallBack={this.callBackfunction}
              error={error && (!data.paymentOptions || !data.paymentOptions.length)}
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
    const { activeStep, saved } = this.state
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
                    <SnackBar open={saved} />
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
