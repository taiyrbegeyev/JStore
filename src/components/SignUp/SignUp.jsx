import React, { Component } from 'react'
import { getStarted } from 'firebase/auth.js'
import { termsAndConditions, privacyPolicy } from 'helpers.js'
import {
  SignUpContainer, Heading,
  SignUpForm, InputContainer, ButtonContainer,
  LegalNoticeContainer, LegalNotice, LegalNoticeAnchors, LoadingContainer
} from './styles'
import { EmailSent, Button as ButtonCustom } from 'components/export'
import {
  Button, Dialog, InputAdornment, TextField,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { PacmanLoader } from 'react-spinners'
// import logo from 'assets/jstore_logo.svg'
import StoreIcon from '@material-ui/icons/Store'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    flex: 1,
    flexBasis: 200,
    whiteSpace: 'nowrap'
  },
})

class SignUp extends Component {
  state = {
    email: '',
    emailSentSuccessfully: false,
    loading: false,
    error: false,
    terms_and_condition: false,
    privacy_policy: false,
  }

  validate = (email) => {
    // eslint-disable-next-line
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

    return expression.test(String(email).toLowerCase())
  }

  handleInputBox = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckEmail = (e) => {
    e.preventDefault()
    const { email, emailSentSuccessfully } = this.state

    // validate email first
    // if user entered @jacobs-university.de (he is not supposed to do it)
    // then remove it from string
    const validated_email = email.replace("@jacobs-university.de", "");
    const email_jacobs = validated_email + "@jacobs-university.de"

    if (this.validate(email_jacobs) && !emailSentSuccessfully) {
      this.handleEmailLinkAuth(email_jacobs)
    }
  }

  handleEmailLinkAuth = (email) => {
    const actionCodeSettings = {
      'url': `${process.env.REACT_APP_BASE_URL}/home`,
      'handleCodeInApp': true,
      iOS: {
        bundleID: 'com.tillchen.jstore.ios'
      },
      android: {
        packageName: 'com.tillchen.jstore',
        installApp: true,
        minimumVersion: null
      },
      dynamicLinkDomain: 'https://jacobsstore.page.link'
    }

    this.setState({
      loading: true
    })

    getStarted(email, actionCodeSettings, errHandler => {
      alert('Error, please make sure that everything is valid')
      this.setState({
        loading: false,
        emailSentSuccessfully: false
      })
    }, () => {
      window.localStorage.setItem('emailForSignIn', email)
      this.setState({
        loading: false,
        emailSentSuccessfully: true
      })
    })
  }

  handleDialog = (name) => {
    this.setState({
      [name]: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      terms_and_condition: false,
      privacy_policy: false
    })
  }

  render () {
    const { classes } = this.props
    const { terms_and_condition, privacy_policy } = this.state

    return (
      <MuiThemeProvider theme={theme}>
      <SignUpContainer>
        <Heading>
          {/* <LogoImage src={logo} /> */}
          <StoreIcon style={{color: '#004180', fontSize: '50px'}} />
        </Heading>
        <Dialog
          open={terms_and_condition}
          onClose={this.handleCloseModal}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Terms and Conditions</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText>
              <LegalNoticeAnchors to='/terms_and_conditions' target="_blank">{process.env.REACT_APP_BASE_URL}/terms_and_conditions</LegalNoticeAnchors>
              <br />
              {termsAndConditions()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal} color="primary">
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={privacy_policy}
          onClose={this.handleCloseModal}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText>
              <LegalNoticeAnchors to='/privacy_policy' target="_blank">{process.env.REACT_APP_BASE_URL}/privacy_policy</LegalNoticeAnchors>
              <br />
              {privacyPolicy()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal} color="primary">
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
        {
          this.state.emailSentSuccessfully && !this.state.loading
          ? <EmailSent />
          :
          <React.Fragment>
            <SignUpForm noValidate>
              <InputContainer>
                <TextField
                  id="outlined-adornment-email"
                  className={classes.textField}
                  variant="outlined"
                  type="text"
                  label="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputBox}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        @jacobs-university.de
                      </InputAdornment>
                    ),
                  }}
                />
              </InputContainer>
              <ButtonContainer>
                <ButtonCustom
                  type="submit"
                  name="signup"
                  value="Continue"
                  onClick={this.handleCheckEmail}
                />
              </ButtonContainer>
              <LegalNoticeContainer>
                <LegalNotice>By clicking Continue, you are agreeing to our <LegalNoticeAnchors onClick={(e) => this.handleDialog('terms_and_condition')}>Terms and Conditions</LegalNoticeAnchors> and <LegalNoticeAnchors onClick={(e) => this.handleDialog('privacy_policy')}>Privacy Policy</LegalNoticeAnchors>.</LegalNotice>
              </LegalNoticeContainer>
            </SignUpForm>
            {
              this.state.loading &&
              <LoadingContainer>
                <PacmanLoader
                  sizeUnit={"px"}
                  size={20}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              </LoadingContainer>
            }
          </React.Fragment>
        }
      </SignUpContainer>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(useStyles)(SignUp)
