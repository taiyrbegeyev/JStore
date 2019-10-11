import React, { Component } from 'react'
import { fetchPosts, getSizeOfCollection } from 'firebase/display.js'
import Pagination from "react-js-pagination"
import {
  Button, Card, CardActions,
  CardContent, CardMedia, CssBaseline,
  Grid, Typography, Container

} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
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
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
})

class Album extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 3,
    numberOfPosts: null,
    dbPosts: null,
    timeStampOfFirstPost: new Date(),
    timeStampOfLastPost: new Date()
  }

  getPosts() {
    const { itemsPerPage, timeStampOfLastPost } = this.state

    let res
    const query = fetchPosts(itemsPerPage, timeStampOfLastPost)
    query.get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => {
          let doc_full = Object.assign({}, doc.data())
          // add some addtional data to post
          doc_full.id = doc.id
          // // fetch image and get its url
          // fetchPostImage(doc.id)
          //   .then((url) => {
          //     doc_full.image_url = url
          //   })
          return doc_full
        })
        let timeStampOfFirstPostLocal = posts[0].creationDate
        let timeStampOfLastPostLocal = posts[posts.length - 1].creationDate
        res = {
          posts,
          timeStampOfFirstPostLocal,
          timeStampOfLastPostLocal
        }
        console.log(res)
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
    console.log("isDifferentPage: " + isDifferentPage)
    if (isDifferentPage) {
      this.getPosts()
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
                <Grid item key={dbPost.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={dbPost.imageUrl}
                      title="Product"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {dbPost.title}
                      </Typography>
                      <Typography>
                        {dbPost.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <PaginationWrapper>
              <Pagination
                innerClass="pagination"
                itemClass="page-item"
                linkClass="page-link"
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={numberOfPosts}
                pageRangeDisplayed={5}
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
