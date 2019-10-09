import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  }
})

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        JStore
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Footer (props) {
  const classes = useStyles()
  if (!props.isAuth) {
    return null
  }
  
  return (
    <MuiThemeProvider theme={theme}>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made with <span aria-label="love" role="img">❤️</span> by <br /> <a href="mailto:t.begeyev@jacobs-university.de">Taiyr Begeyev</a> and <a href="mailto:ti.chen@jacobs-university.de">Tianyao Chen</a>
        </Typography>
        <Copyright />
      </footer>
    </MuiThemeProvider>
  )
}
