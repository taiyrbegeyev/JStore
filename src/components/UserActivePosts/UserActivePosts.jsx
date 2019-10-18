import React, { Component } from 'react'
import { PacmanLoader } from 'react-spinners'
import { activePosts } from 'firebase/display'
import { Typography } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ItemAction } from 'components/export'
import { PostsContainer } from './styles'

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

class UserActivePosts extends Component {
  state = {
    dbPosts: null,
    loading: true
  }

  componentWillMount() {
    // this.setState({
    //   loading: true
    // })
    // activePosts(auth.currentUser.email, () => {
    //   alert("Error: can't fetch data")
    // }, (data) => {
    //   this.setState({
    //     dbPosts: data,
    //     loading: false
    //   })
    // })
  }
  
  render() {
    const { loading } = this.state

    if (loading) {
      return (
        <PacmanLoader
          sizeUnit={"px"}
          size={20}
          color={'#123abc'}
          loading={loading}
          css={{position: 'absolute', left: '50%', top: '50%', zIndex: '999'}}
        />
      )
    }
    
    return (
      <MuiThemeProvider theme={theme}>
        <Typography variant="h5" component="h2">
          Active Posts
        </Typography>
        <PostsContainer>
          
        </PostsContainer>
      </MuiThemeProvider>
    )
  }
}

export default UserActivePosts
