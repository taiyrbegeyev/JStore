import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { fade, makeStyles } from '@material-ui/core/styles'
import { TextField, InputAdornment } from '@material-ui/core'

const useStylesReddit = makeStyles(theme => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('sm')]: {
      width: 500
    },
  },
  focused: {},
}))

function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField fullWidth InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(2),
  },
})

class CustomizedInputs extends Component {
  state = {
    input_value: this.props.defaultValue || window.localStorage.getItem(this.props.data_name) || ''
  }

  handleInputBox = (e) => {
    this.setState({
      input_value: e.target.value
    }, () => {
      this.props.parentCallBack (this.props.data_name, this.state.input_value)
      if (this.props.data_name === 'title') {
        window.localStorage.setItem(this.props.data_name, this.state.input_value)
      }
    })
  }

  handleErrors = (data_name, error) => {
    const { input_value } = this.state
    const limit = 50 - input_value.length
    const left = 'Characters Left: ' + limit

    switch (data_name) {
      case 'phoneNumber':
        if (error) {
          return "You don't need to add the leading + . Also make sure that you are entering only digits. The limits for the phone number are >= 4 and <=15"
        }
        else {
          return ''
        }
      case 'title':
      case 'fullName':
      default:
        return left
    }
  }
  
  render () {
    const { classes, label, error, data_name, defaultValue, disabled } = this.props
    
    return (
      <div className={classes.root}>
        <RedditTextField
          helperText={this.handleErrors(data_name, error)}
          type={data_name === 'phoneNumber' ? "tel" :"text"}
          label={label}
          error={error}
          className={classes.margin}
          defaultValue={defaultValue || window.localStorage.getItem(data_name)}
          variant="filled"
          id="reddit-input"
          onChange={this.handleInputBox}
          placeholder={data_name === 'phoneNumber' && "Example: 49 000 0000 0000"}
          disabled={disabled}
        />
      </div>
    )
  }
}

export default withStyles(useStyles)(CustomizedInputs)
