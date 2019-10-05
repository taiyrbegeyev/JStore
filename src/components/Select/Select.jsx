import React, { Component } from 'react'
import {
  InputLabel, MenuItem,
  FormControl, Select,
  withStyles
} from '@material-ui/core'

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '1.5rem'
  },
  formControl: {
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 300
    },
  },
})

class SimpleSelect extends Component {
  state = {
    selected_item: null
  }

  handleDropDown = (e) => {
    this.setState({
      selected_item: e.target.value,
    }, () => {
      this.props.parentCallBack(this.props.data_name, this.state.selected_item)
      window.localStorage.setItem(this.props.data_name, this.state.selected_item)
    })
  }
  
  render() {
    const { classes, label, drop_down_items, error } = this.props
    return (
      <div className={classes.root}>
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-simple">
          {label}
        </InputLabel>
        <Select
          value={window.localStorage.getItem(this.props.data_name)}
          onChange={this.handleDropDown}
          error={error}
        >
          {
            drop_down_items.map((item, index) => (
              <MenuItem value={item} key={index}>{item}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
    )
  }
}

export default withStyles(useStyles)(SimpleSelect)
