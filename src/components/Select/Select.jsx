import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '1.5rem'
  },
  formControl: {
    margin: theme.spacing(1),
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
      this.props.parentCallBack (this.props.data_name, this.state.selected_item)
    })
  }
  
  render() {
    const { classes, drop_down_items } = this.props
    return (
      <div className={classes.root}>
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-simple">
          Age
        </InputLabel>
        <Select
          value={this.state.selected_item}
          onChange={this.handleDropDown}
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
