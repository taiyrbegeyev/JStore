import React, { Component } from 'react'
import { fetchPosts } from 'firebase/display.js'
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

const cards = [1]

class Album extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 15,
    numberOfPosts: null,
    dbPosts: null,
    timeStampOfLastPost: new Date()
  }

  getPosts() {
    const { itemsPerPage, timeStampOfLastPost } = this.state

    const query = fetchPosts(itemsPerPage, timeStampOfLastPost)
    query.get()
      .then((snapshot) => {
        const size = snapshot.docs.size
        const posts = snapshot.docs.map(
          doc => doc.data()
        )
        console.log(posts)
        const timeStampOfLastPostLocal = posts[posts.size - 1].creationDate
        return this.setState({
          dbPosts: posts,
          numberOfPosts: size,
          timeStampOfLastPost: timeStampOfLastPostLocal
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
  
  // componentDidMount() {
  //   this.getPosts()
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const isDifferentPage = this.state.currentPage !== prevState.currentPage
  //   if (isDifferentPage) {
  //     this.getPosts()
  //   }
  // }

  handlePageChange(pageNumber) {
    this.setState({
      currentPage: pageNumber
    })
  }
  
  render () {
    const { classes } = this.props
    const { activePage, dbPosts, numberOfPosts } = this.state
    console.log(dbPosts)
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the content.
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
                activePage={activePage}
                itemsCountPerPage={15}
                totalItemsCount={numberOfPosts}
                pageRangeDisplayed={5}
                onChange={() => this.handlePageChange(activePage)}
              />
            </PaginationWrapper>
          </Container>
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(Album)
