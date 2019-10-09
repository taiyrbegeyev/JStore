import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import  { registerNewUser } from 'firebase/auth.js'
import {
  Button, TextField, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@material-ui/core'

class NewUserModal extends Component {
  state = {
    open: null,
    fullName: null,
    redirectToHome: false
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
      fullName: e.target.value
    })
  }

  handleClose = () => {
    const { email } = this.props
    const { fullName } = this.state
    console.log(email + " " + fullName)
    if (fullName) {
      registerNewUser(fullName, email, errHandler => {
        alert('Error, please make sure that everything is valid')
        }, () => {
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
    const { open, redirectToHome } = this.state

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
              autoFocus
              margin="dense"
              id="fullName"
              label="Full Name"
              type="text"
              fullWidth
              onChange={this.handleInputBox}
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
