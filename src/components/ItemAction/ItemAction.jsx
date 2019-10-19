import React, { Component } from 'react'
import { cutOffString, displayDate } from 'helpers.js'
import { withStyles } from '@material-ui/styles'
import {
  Grid, Typography,
  Card, CardActions,
  CardContent, CardMedia,
  Container, Chip, Button
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    margin: 0,
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

class ItemAction extends Component {
  render() {
    const { classes, dbPosts, handleMarkAsSold, active } = this.props

    return (
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
        {
          dbPosts.map(dbPost => (
            <Grid item key={dbPost.postId} xs={12} sm={6} md={6}>
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
                    {
                      active ? displayDate(dbPost.creationDate.toDate().toString())
                      : displayDate(dbPost.soldDate.toDate().toString())
                    }
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
                  <Chip label={dbPost.category} color="primary" className={classes.chip} />
                </CardActions>
                {
                  active &&
                  <CardActions>
                    <Button size="small" color="primary" href={`/posts/${dbPost.postId}`}>
                      Edit
                    </Button>
                    <Button size="small" color="primary" onClick={() => handleMarkAsSold(dbPost.postId)}>
                      Mark as sold
                    </Button>
                    <Button size="small" color="primary" href={`/posts/${dbPost.postId}`}>
                      Delete
                    </Button>
                  </CardActions>
                }
              </Card>
            </Grid>
          ))
        }
        </Grid>
      </Container>
    )
  }
}

export default withStyles(useStyles)(ItemAction)
