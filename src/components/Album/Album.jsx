import React, { Component } from 'react'
import { fetchPosts, getSizeOfCollection } from 'firebase/display.js'
import { cutOffString, displayDate } from 'helpers.js'
import Pagination from "react-js-pagination"
import {
  Button, Card, CardActions,
  CardContent, CardMedia, CssBaseline,
  Grid, Typography, Container, Chip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { PaginationWrapper } from './styles'

const useStyles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
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
})

class Album extends Component {
  state = {
    isForward: true,
    currentPage: 1,
    itemsPerPage: 3,
    numberOfPosts: null,
    dbPosts: null,
    timeStampOfFirstPost: new Date(),
    timeStampOfLastPost: new Date()
  }

  getPosts() {
    const { isForward, itemsPerPage, timeStampOfFirstPost, timeStampOfLastPost } = this.state
    let timeStampOfPost = isForward ? timeStampOfLastPost : timeStampOfFirstPost

    fetchPosts(itemsPerPage, timeStampOfPost, isForward, (err) => {
      alert(err)
    }, (res) => {
      this.setState({
        dbPosts: res.posts,
        timeStampOfFirstPost: res.timeStampOfFirstPostLocal,
        timeStampOfLastPost: res.timeStampOfLastPostLocal
      })
    })
  }

  componentWillMount() {
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
    })
  }
  
  render () {
    const { classes } = this.props
    const { currentPage, itemsPerPage, dbPosts, numberOfPosts } = this.state
    
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {dbPosts && dbPosts.map(dbPost => (
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
              ))}
            </Grid>
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
          </Container>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Album)
