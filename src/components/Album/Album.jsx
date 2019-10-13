import React, { Component } from 'react'
import { fetchPosts, getSizeOfCollection } from 'firebase/display.js'
import { cutOffString } from 'helpers.js'
import Pagination from "react-js-pagination"
import {
  Button, Card, CardActions,
  CardContent, CardMedia, CssBaseline,
  Grid, Typography, Container

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
    justifyContent: 'space-between'
  },
  owner: {
    color: '#555'
  },
  price: {
    color: '#004180',
    fontWeight: '700'
  }
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
    console.log(this.state)
    let res
    const query = fetchPosts(itemsPerPage, (isForward ? timeStampOfLastPost : timeStampOfFirstPost), isForward)
    query.get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          let doc_full = Object.assign({}, doc.data())
          // add some addtional data to post
          doc_full.id = doc.id
          return doc_full
        })
        let timeStampOfFirstPostLocal = posts[0].creationDate
        let timeStampOfLastPostLocal = posts[posts.length - 1].creationDate
        res = {
          posts,
          timeStampOfFirstPostLocal,
          timeStampOfLastPostLocal
        }
        return res
      })
      .then(() => {
        console.log(res)
        this.setState({
          dbPosts: res.posts,
          timeStampOfFirstPost: res.timeStampOfFirstPostLocal,
          timeStampOfLastPost: res.timeStampOfLastPostLocal
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentWillMount() {
    console.log('ComponentWillMount()')
    getSizeOfCollection('postsActive', (size) => {
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
    const isForward = this.state.currentPage >= prevState.currentPage
    if (isDifferentPage) {
      console.log('isForward: ' + isForward)
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
    
    console.log(dbPosts)
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {dbPosts && dbPosts.map(dbPost => (
                <Grid item key={dbPost.id} xs={12} sm={6} md={4}>
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
                        by <span className={classes.owner_email}>{dbPost.ownerId}</span>
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
                      <Button size="small" color="primary" href={`/posts/${dbPost.id}`}>
                        View
                      </Button>
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
