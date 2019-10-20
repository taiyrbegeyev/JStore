import React, { Component } from 'react'
import {
  Input, InputLabel,
  InputAdornment, FormControl,
  withStyles
} from '@material-ui/core'

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      width: 300
    },
  },
  margin: {
    margin: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
})

class PriceInput extends Component {
  state = {
    amount: null
  }

  handleChange = (e) => {
    this.setState({
      amount: e.target.value
    }, () => {
      this.props.parentCallBack (this.props.data_name, this.state.amount)
      window.localStorage.setItem(this.props.data_name, this.state.amount)
    })
  }
  
  render() {
    const { classes, data_name, error } = this.props
    const { amount } = this.state
   
    return (
      <div className={classes.root}>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
          <Input
            id="adornment-amount"
            fullWidth
            defaultValue={window.localStorage.getItem(data_name)}
            value={this.props.defaultValue || amount}
            onChange={this.handleChange}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
            error={error}
          />
        </FormControl>
      </div>
    )

  }
}

export default withStyles(useStyles)(PriceInput)
