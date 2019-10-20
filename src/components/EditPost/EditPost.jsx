import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { updatePost } from 'firebase/edit'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import {
  Stepper, Step, StepLabel,
  StepContent, Button, Typography
} from '@material-ui/core'
import {
  RedditTextField, SimpleSelect,
  MultilineTextField,
  PriceInput, PaymentOptionsCheckboxes,
  SnackBar
} from 'components/export'
import { PacmanLoader } from 'react-spinners'

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

class EditPost extends Component {
  state = {
    activeStep: 0,
    data: {
      postId: this.props.data.postId,
      title: this.props.data.title,
      category: this.props.data.category,
      condition: this.props.data.condition,
      description: this.props.data.description,
      price: this.props.data.price,
      paymentOptions: this.props.data.paymentOptions
    },
    error: false,
    loading: false,
    saved: false,
    redirectToPost: false
  }

  getSteps() {
    return ['Edit Product Details', 'Edit Product Description', 'Edit Sellings Details']
  }
  
  getStepContent(step) {
    switch (step) {
      default:
        return ''
    }
  }

  // componentDidMount() {
  //   window.localStorage.clear()
  //   const { data } = this.state
  //   window.localStorage.setItem('title', data.title)
  //   window.localStorage.setItem('category', data.category)
  //   window.localStorage.setItem('condition', data.condition)
  //   window.localStorage.setItem('description', data.description)
  //   window.localStorage.setItem('price', data.price)
  //   window.localStorage.setItem('paymentOptions', data.paymentOptions)
  // }

  handleSubmit = () => {
    if (this.handleNext() === true) {
      this.setState({
        loading: true
      })

      const { data } = this.state
      // verify data once again
      // in case nothing fails, continue
      if (!data.title || !data.category || !data.condition || !data.description ||
           !data.price || !data.paymentOptions || !data.paymentOptions.length) {

        alert('Something went wrong. Verify your entries.')
        this.setState({
          loading: false
        })
        return
      }
      
      updatePost(data, () => {
        alert('Error: contact t.begeyev@jacobs-university.de')
      }, () => {
        this.setState({
          redirectToPost: true
        })
      })
    }
  }

  handleNext = () => {
    const { data } = this.state
    // eslint-disable-next-line
    switch (this.state.activeStep) {
      case 0:
        if (!data.title || data.title.length > 50 || !data.category || !data.condition) {
          this.setState({
            error: true
          })
          return
        }
        break
      case 1:
        if (!data.description || data.description.length > 300) {
          this.setState({
            error: true
          })
          return
        }
        break
      case 2:
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

  handleSteps = () => {
    const { error, data } = this.state
    switch (this.state.activeStep) {
      case 0:
        return (
          <React.Fragment>
            <RedditTextField
              label="Title*"
              data_name="title"
              parentCallBack={this.callBackfunction}
              error={error && (!data.title || data.title.length > 50)}
              defaultValue={data.title}
            />
            <SimpleSelect
              label="Category*"
              data_name="category"
              drop_down_items={categories}
              parentCallBack={this.callBackfunction}
              error={error && !data.category}
              defaultValue={data.category}
            />
            <SimpleSelect
              label="Condition*"
              data_name="condition"
              drop_down_items={conditions}
              parentCallBack={this.callBackfunction}
              error={error && !data.condition}
              defaultValue={data.condition}
            />
          </React.Fragment>
        )
      case 1:
        return (
          <MultilineTextField
            label="Description*"
            data_name="description"
            parentCallBack={this.callBackfunction}
            error={error && (!data.description || data.description.length > 300)}
            defaultValue={data.description}
          />
        )
      case 2:
        return (
          <React.Fragment>
            <PriceInput
              data_name="price"
              parentCallBack={this.callBackfunction}
              error={error && (!data.price || isNaN(data.price) || data.price.length > 8)}
              defaultValue={data.price}
            />
            <PaymentOptionsCheckboxes
              data_name="paymentOptions"
              parentCallBack={this.callBackfunction}
              error={error && (!data.paymentOptions || !data.paymentOptions.length)}
              editPost
              defaultValue={data.paymentOptions}
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
    const { data, activeStep, saved, redirectToPost } = this.state
    const steps = this.getSteps()

    if (redirectToPost) {
      return <Redirect to={'/home'} />
    }
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

export default EditPost
