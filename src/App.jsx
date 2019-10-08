import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import { routes } from 'routing'

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props => (
      user === true
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
    user: true
  }
  
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: true
        })
      }
    })

    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = window.prompt('Please provide your email for confirmation')
      }
      else {
        auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn')
          if (result.user) {
            this.setState({
              user: true
            })
          }
          else {
            this.setState({
              user: false
            })
          }
        })
        .catch((err) => {
          console.log(err)
          alert('Error: ' + err.message)
          auth.signOut()
          this.setState({
            user: false
          })
        })
      }
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
