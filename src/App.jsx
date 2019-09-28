import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import { routes } from 'routing'

const PrivateRoute = ({ isAuth, user, component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props => (
      isAuth === true
      ? <Component
          {...props}
        />
      : <Redirect to='get-started' />
    )
    }
  />
}

const NormalRoute = ({ windowWidth, windowHeight, component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props => (
      <Component
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        {...props}
      />
    )}
  />
}

class App extends Component {
  state = {
    isAuth: true,
    user: null
  }
  
  componentWillMount () {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.setState({
          isAuth: true,
          user: user
        })
      } else {
        if (auth.isSignInWithEmailLink(window.location.href)) {
          let email = window.localStorage.getItem('emailForSignIn')
          if (!email) {
            email = window.prompt('Please provide your email for confirmation')
          }
          auth.signInWithEmailLink(email, window.location.href)
            .then((result) => {
              console.log(result.user)
              window.localStorage.removeItem('emailForSignIn')
              if (result.user) {
                this.setState({
                  isAuth: true,
                  user: result.user
                })
              } else {
                this.setState({
                  isAuth: false,
                  user: null
                })
              }
            })
            .catch((err) => {
              console.log(err)
              alert('Error: ' + err.message)
              auth.signOut()
              this.setState({
                isAuth: false,
                user: null
              })
            })
        } else {
          this.setState({
            isAuth: false,
            user: null
          })
        }
      }
    })
  }

  componentDidUpdate (prevState) {
    if (this.state.userName !== prevState.userName) {
      auth.onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.setState({
            isAuth: true,
            user: user
          })
        } else {
          this.setState({
            isAuth: false,
            user: null
          })
        }
      })
    }
  }

  render () {
    const elements = routes.map((item, index) => {
      const { path, exact, isPrivate, component } = item
      const routeProps = { path, exact }
      if (isPrivate) {
        return (
          <PrivateRoute
            key={index}
            isAuth={this.state.isAuth}
            user={this.state.user}
            {...routeProps}
            component={component}
          />
        )
      } else {
        return (
          <NormalRoute
            key={index}
            {...routeProps}
            component={component}
          />
        )
      }
    })
        
    return (
      <Router>
        <Switch>
          {elements}
        </Switch>
      </Router>
    )
  }
}

export default App
