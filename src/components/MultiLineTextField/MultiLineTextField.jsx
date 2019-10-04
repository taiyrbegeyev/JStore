import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 500
    },
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
  },
})

class MultiLineTextField extends Component {
  state = {
    input_value: ''
  }

  handleInputBox = (e) => {
    this.setState({
      input_value: e.target.value
    }, () => {
      this.props.parentCallBack (this.props.data_name, this.state.input_value)
      window.localStorage.setItem(this.props.data_name, this.state.input_value)
    })
  }
  
  render() {
    const { classes, label } = this.props
    return (
      <div className={classes.container}>
        <TextField
          id="outlined-multiline-static"
          label={label}
          multiline
          fullWidth
          rows="4"
          defaultValue={window.localStorage.getItem(this.props.data_name)}
          className={classes.textField}
          variant="outlined"
          onChange={this.handleInputBox}
        />
      </div>
    )
  }
}

export default withStyles(useStyles)(MultiLineTextField)
