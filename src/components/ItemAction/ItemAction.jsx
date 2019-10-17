import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import {
  Grid, Paper, Typography,
  ButtonBase
} from '@material-ui/core'

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
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
})

class ItemAction extends Component {
  render() {
    const { classes, status, dbPost } = this.props

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={dbPost.imageUrl} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {dbPost.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sold Date: {dbPost.soldDate}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{dbPost.price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(useStyles)(ItemAction)
