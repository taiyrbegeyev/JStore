import React, { Component } from 'react'
import { PacmanLoader } from 'react-spinners'
import { auth } from 'firebase.js'
import { fetchUsersPosts, getUsersPostsCollectionSize } from 'firebase/display.js'
import Pagination from "react-js-pagination"
import { Typography } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ItemAction } from 'components/export'
import { PostsContainer, PaginationWrapper } from './styles'

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

class UserSoldPosts extends Component {
  state = {
    isForward: true,
    currentPage: 1,
    itemsPerPage: 3,
    numberOfPosts: null,
    dbPosts: null,
    timeStampOfFirstPost: new Date(),
    timeStampOfLastPost: new Date(),
    loading: true
  }

  getPosts() {
    const { isForward, itemsPerPage, timeStampOfFirstPost, timeStampOfLastPost } = this.state
    let timeStampOfPost = isForward ? timeStampOfLastPost : timeStampOfFirstPost

    fetchUsersPosts(itemsPerPage, timeStampOfPost, isForward, auth.currentUser.email, true, () => {
      this.setState({
        loading: false
      })
    }, (res) => {
      this.setState({
        dbPosts: res.posts || null,
        timeStampOfFirstPost: res.timeStampOfFirstPostLocal,
        timeStampOfLastPost: res.timeStampOfLastPostLocal,
        loading: false
      })
    })
  }

  componentWillMount() {
    this.setState({
      loading: true
    })
    getUsersPostsCollectionSize(auth.currentUser.email, true, () => {
      alert('Error: contact t.begeyev@jacobs-university.de')
    }, (size) => {
      this.setState({
        numberOfPosts: size
      })
    })
  }

  componentDidMount() {
    this.getPosts()
  }

  componentDidUpdate(prevProps, prevState) {
    const isDifferentPage = this.state.currentPage !== prevState.currentPage
    const isForward = this.state.currentPage > prevState.currentPage
    if (isDifferentPage) {
      this.setState({
        isForward
      }, () => {
        this.getPosts()
      })
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`)
    this.setState({
      currentPage: pageNumber
    }, () => {
      window.scrollTo(0, 0)
    })
  }
  
  render() {
    const { currentPage, itemsPerPage, dbPosts, numberOfPosts, loading } = this.state

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
        <PostsContainer>
          <Typography variant="h5" component="h2">
            Sold Posts
          </Typography>
          {
            dbPosts ? <ItemAction dbPosts={dbPosts} />
            :
            <div style={{marginTop: '4rem'}}>
              <Typography variant="h7" component="h4">
                No Sold Items
              </Typography>
            </div>
          }
          <PaginationWrapper>
            <Pagination
              hideFirstLastPages
              innerClass="pagination"
              itemClass="page-item"
              linkClass="page-link"
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={numberOfPosts}
              pageRangeDisplayed={1}
              onChange={(e) => this.handlePageChange(e)}
            />
          </PaginationWrapper>
        </PostsContainer>
      </MuiThemeProvider>
    )
  }
}

export default UserSoldPosts
