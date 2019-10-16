import React, { Component } from 'react'
import { auth } from 'firebase.js'
import { fetchUser } from 'firebase/user'
import { Typography } from '@material-ui/core'
import { RedditTextField } from 'components/export'

class AccountSettings extends Component {
  state = {
    data: null,
    loading: true,
    error:
  }
  
  componentWillMount() {
    this.setState({
      loading: true
    })
    fetchUser(auth.currentUser.email, () => {
      alert("Error: can't fetch data")
      this.setState({
        loading: false
      })
    }, (data) => {
      this.setState({
        data: data,
        loading: false
      })
    })
  }
  
  callBackfunction = (key, value) => {
    this.setState(prevState => ({
        data: {
          ...prevState.data,
          [key]: value
        }
    }))
  }
  
  render() {
    const { data, loading } = this.state
    console.log(data)

    if (loading) {
      return <p>Loading ...</p>
    }
    
    return (
      <React.Fragment>
        <Typography variant="h5" component="h2">
          Account Settings
        </Typography>
        <RedditTextField
          label="Full name"
          data_name="fullName"
          defaultValue={data.fullName}
          parentCallBack={this.callBackfunction}
          // error={error && (!data.title || data.title.length > 50)}
        />
      </React.Fragment>
    )
  }
}

export default AccountSettings
