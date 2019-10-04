import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { fade, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

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
    input_value: ''
  }

  handleInputBox = (e) => {
    this.setState({
      input_value: e.target.value
    }, () => {
      this.props.parentCallBack (this.props.data_name, this.state.input_value)
    })
  }
  
  render () {
    const { classes, label } = this.props
    return (
      <div className={classes.root}>
        <RedditTextField
          label={label}
          className={classes.margin}
          defaultValue=""
          variant="filled"
          id="reddit-input"
          onChange={this.handleInputBox}
        />
      </div>
    )
  }
}

export default withStyles(useStyles)(CustomizedInputs)
