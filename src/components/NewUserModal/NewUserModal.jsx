import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import  { registerNewUser } from 'firebase/auth.js'
import {
  Button, Checkbox, TextField, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  FormControlLabel, InputAdornment
} from '@material-ui/core'

class NewUserModal extends Component {
  state = {
    open: null,
    fullName: null,
    checkedWhatsApp: true,
    phoneNumber: null,
    redirectToHome: false,
    error_fullName: false,
    error_phoneNumber: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      return ({
        open: nextProps.open
      })
    }
  }

  handleInputBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.checked
    })
  }

  handleClose = () => {
    const { email } = this.props
    const { fullName, phoneNumber, checkedWhatsApp } = this.state

    // validate inputs
    if (!fullName) {
      this.setState({
        error_fullName: true
      })
    }
    else {
      this.setState({
        error_fullName: false
      })
    }

    if (checkedWhatsApp && !phoneNumber) {
      this.setState({
        error_phoneNumber: true
      })
    }
    else {
      this.setState({
        error_phoneNumber: false
      })
    }
    
    if (fullName && ( (checkedWhatsApp && phoneNumber) || !checkedWhatsApp ) ) {
      console.log(email + " " + fullName + " " + phoneNumber)
      registerNewUser(fullName, email, checkedWhatsApp, phoneNumber, () => {
        alert('Error, please make sure that everything is valid')
        }, () => {
          auth.currentUser.updateProfile({
            displayName: fullName,
            phoneNumber: phoneNumber
          })
          this.setState({
            redirectToHome: true
          }, () => {
            console.log('User added successfully')
          })
        }
      )
    }
  }
  
  render() {
    const { open, redirectToHome, checkedWhatsApp, error_fullName, error_phoneNumber } = this.state
    if (redirectToHome) {
      return <Redirect to='home' />
    }

    return (
      <React.Fragment>
        <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Hey, it seems like you are a new user!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Almost there! 
            </DialogContentText>
            <TextField
              margin="dense"
              id="fullName"
              name="fullName"
              label="Full Name"
              type="text"
              fullWidth
              onChange={this.handleInputBox}
              error={error_fullName}
              placeholder="Example: Elon Musk"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedWhatsApp}
                  onChange={this.handleChange('checkedWhatsApp')}
                  value="checkedWhatsApp"
                  color="primary"
                />
              }
              label="I want to be contacted via What's App"
            />
            <TextField
              disabled={!checkedWhatsApp}
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              fullWidth
              onChange={this.handleInputBox}
              error={error_phoneNumber}
              placeholder="Example: 49 000 0000 0000"
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )    
  }
}

export default NewUserModal
