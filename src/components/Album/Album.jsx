import React, { Component } from 'react'
import { fetchPosts, getSizeOfCollection } from 'firebase/display.js'
import { searchByTitle } from 'firebase/search.js'
import { cutOffString, displayDate } from 'helpers.js'
import Pagination from "react-js-pagination"
import SearchField from 'react-search-field'
import { PacmanLoader } from 'react-spinners'
import {
  Button, Card, CardActions,
  CardContent, CardMedia, CssBaseline,
  Grid, Typography, Container, Chip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { PaginationWrapper, SearchBar } from './styles'

const useStyles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    wordWrap: 'break-word',
    position: 'relative',
    '&::-webkit-transition': 'margin 0.5s ease-out',
    '&::-moz-transition': 'margin 0.5s ease-out',
    '&::-o-transition': 'margin 0.5s ease-out',
    '&:hover': {
      top: '-5px'
    }
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  cardActions: {
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  owner: {
    color: '#555'
  },
  price: {
    color: '#004180',
    fontWeight: '700'
  },
  chip: {
    margin: 2,
    backgroundColor: '#004180'
  },
  searchBar: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  searchChip: {
    marginBottom: theme.spacing(8),
    backgroundColor: '#004180'
  },
  dummy: {
    marginBottom: theme.spacing(8),
  }
})

class Album extends Component {
  state = {
    isForward: true,
    currentPage: 1,
    itemsPerPage: 9,
    numberOfPosts: null,
    dbPosts: null,
    timeStampOfFirstPost: new Date(),
    timeStampOfLastPost: new Date(),
    loading: true,
    isSearchBy: false,
    searchByText: null
  }

  getPosts() {
    const {
      isForward, itemsPerPage,
      timeStampOfFirstPost, timeStampOfLastPost,
      isSearchBy, searchByText
    } = this.state
    let timeStampOfPost = isForward ? timeStampOfLastPost : timeStampOfFirstPost

    if (isSearchBy) {
      searchByTitle(searchByText, () => {
        this.setState({
          loading: false,
          dbPosts: null
        })
      }, (res) => {
        this.setState({
          dbPosts: res.posts,
          // timeStampOfFirstPost: res.timeStampOfFirstPostLocal,
          // timeStampOfLastPost: res.timeStampOfLastPostLocal,
          loading: false
        })
      })
    }
    else {
      fetchPosts(itemsPerPage, timeStampOfPost, isForward, () => {
        this.setState({
          loading: false,
          dbPosts: null
        })
      }, (res) => {
        this.setState({
          dbPosts: res.posts,
          timeStampOfFirstPost: res.timeStampOfFirstPostLocal,
          timeStampOfLastPost: res.timeStampOfLastPostLocal,
          loading: false
        })
      })
    }
  }

  componentWillMount() {
    this.setState({
      loading: true
    })
    getSizeOfCollection('posts', (size) => {
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

  onSearchClick = (value) => {
    this.setState({
      isForward: true,
      currentPage: 1,
      numberOfPosts: null,
      dbPosts: null,
      timeStampOfFirstPost: new Date(),
      timeStampOfLastPost: new Date(),
      loading: true,
      isSearchBy: true,
      searchByText: value
    }, () => {
      this.getPosts()
    })
  }

  deleteSearch = () => {
    this.setState({
      isForward: true,
      currentPage: 1,
      numberOfPosts: null,
      dbPosts: null,
      timeStampOfFirstPost: new Date(),
      timeStampOfLastPost: new Date(),
      loading: true,
      isSearchBy: false,
      searchByText: null,
    }, () => {
      getSizeOfCollection('posts', (size) => {
        this.setState({
          numberOfPosts: size
        }, () => {
          this.getPosts()
        })
      })
    })
  }
  
  render () {
    const { classes } = this.props
    const {
      currentPage, itemsPerPage, dbPosts,
      numberOfPosts, loading, isSearchBy, searchByText
    } = this.state

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
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
          <SearchField 
            classNames={classes.searchBar}
            placeholder='Search item'
            onSearchClick={(value) => this.onSearchClick(value)}
            onEnter={(value) => this.onSearchClick(value)}
          />
            {!isSearchBy && <div className={classes.dummy}></div>}
            {isSearchBy && <Chip className={classes.searchChip} label={searchByText} onDelete={this.deleteSearch} color="primary" />}
            <Grid container spacing={4}>
              {dbPosts ? dbPosts.map(dbPost => (
                <Grid item key={dbPost.postId} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={dbPost.imageUrl}
                      title="Product"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" component="h2">
                        {dbPost.title}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="h4" className={classes.owner}>
                        by <span className={classes.owner_email}>{dbPost.ownerName || dbPost.ownerId}</span>
                      </Typography>
                      <Typography gutterBottom variant="h7" component="h4" className={classes.owner}>
                        {displayDate(dbPost.creationDate.toDate().toString())}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h4" className={classes.price}>
                        €{dbPost.price}
                      </Typography> 
                      <Typography className={classes.description}>
                        {cutOffString(dbPost.description, 100)}
                        {
                          dbPost.description.length > 100 && 
                            <React.Fragment>
                              <MoreHorizIcon />
                            </React.Fragment>
                        }
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Button size="small" color="primary" href={`/posts/${dbPost.postId}`}>
                        View
                      </Button>
                      <Chip label={dbPost.category} color="primary" className={classes.chip} />
                    </CardActions>
                  </Card>
                </Grid>
              ))
              : 
              <div style={{padding: '2rem'}}>
                <Typography variant="h7" component="h4">
                  No Posts
                </Typography>
              </div>
            }
            </Grid>
            {!isSearchBy &&
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
            }
          </Container>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Album)
