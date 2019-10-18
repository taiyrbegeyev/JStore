import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import { fetchUser, updatePersonalInfo } from 'firebase/user'
import { validatePhoneNumber } from 'helpers.js'
import {
  Typography, FormControlLabel, Checkbox,
  Button
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import { RedditTextField } from 'components/export'

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

const useStyles = theme => ({
  margin: {
    marginLeft: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
    textTransform: 'none',
    // backgroundColor: '#004180'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

class AccountSettings extends Component {
  state = {
    data: null,
    loading: true,
    fullName: '',
    error_fullName: false,
    checkedWhatsApp: null,
    whatsApp: null,
    phoneNumber: '',
    error_phoneNumber: false,
    redirectToHome: false
  }
  
  componentWillMount() {
    this.setState({
      loading: true
    })
    fetchUser(auth.currentUser.email, () => {
      alert("Error: can't fetch data")
    }, (data) => {
      data.phoneNumber = data.phoneNumber.replace(/\D/g,'')
      this.setState({
        data: data,
        loading: false,
        fullName: data.fullName,
        checkedWhatsApp: data.whatsApp,
        whatsApp: data.whatsApp,
        phoneNumber: data.phoneNumber
      })
    })
  }
  
  callBackfunction = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.checked
    })
  }

  handleSave = () => {
    const { data, fullName, phoneNumber, checkedWhatsApp } = this.state

    // validate inputs
    if (!fullName || fullName.length > 50) {
      this.setState({
        error_fullName: true
      })
    }
    else {
      this.setState({
        error_fullName: false
      })
    }

    if (checkedWhatsApp) {
      if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
        this.setState({
          error_phoneNumber: true
        })
      }
      else {
        this.setState({
          error_phoneNumber: false
        })
      }
    }
    else {
      this.setState({
        error_phoneNumber: false
      })
    }
    
    if (fullName && ( (checkedWhatsApp && phoneNumber && validatePhoneNumber(phoneNumber)) || !checkedWhatsApp ) && fullName.length <= 50) {
      const doc = {}
      if (data.fullName !== fullName) {
        doc.fullName = fullName
      }
      if (data.whatsApp !== checkedWhatsApp) {
        doc.whatsApp = checkedWhatsApp
      }
      const trimmed_phoneNumber_data = data.phoneNumber.replace(/\s/g, '')
      const trimmed_phoneNumber = phoneNumber.replace(/\s/g, '')
      if (trimmed_phoneNumber_data !== trimmed_phoneNumber) {
        doc.phoneNumber = trimmed_phoneNumber
      }
      
      updatePersonalInfo(data.email, doc, () => {
        alert('Error, please make sure that everything is valid')
        }, () => {
          if (doc.fullName) {
            console.log('updateProfile')
            auth.currentUser.updateProfile({
              displayName: fullName
            })
          }
          alert('Saved')
          this.setState({
            redirectToHome: true
          })
        }
      )
    }
  }
  
  render() {
    const { classes } = this.props
    const {
      data, loading, error_fullName,
      error_phoneNumber, checkedWhatsApp, redirectToHome
    } = this.state

    if (redirectToHome) {
      return <Redirect to='home' />
    }

    if (loading) {
      return <p>Loading ...</p>
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Typography variant="h5" component="h2">
          Account Settings
        </Typography>
        <RedditTextField
          label="Full name"
          data_name="fullName"
          defaultValue={data.fullName}
          parentCallBack={this.callBackfunction}
          error={error_fullName}
        />
        <FormControlLabel
          className={classes.margin}
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
        <RedditTextField
          label="Phone Number"
          data_name="phoneNumber"
          defaultValue={data.phoneNumber}
          parentCallBack={this.callBackfunction}
          error={error_phoneNumber}
          disabled={!checkedWhatsApp}
        />
        <div>
          <Button
            variant="contained"
            size="large"
            className={classes.button}
            color="primary"
            onClick={this.handleSave}
          >
            <SaveIcon className={classes.leftIcon} />
            Save
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(useStyles)(AccountSettings)
