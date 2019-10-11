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
          isAuth={isAuth}
          user={user}
          {...props}
        />
      : <Redirect to='get-started' />
    )
    }
  />
}

const NormalRoute = ({ isAuth, user, windowWidth, windowHeight, component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={props => (
      <Component
        isAuth={isAuth}
        user={user}
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
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuth: true,
          user: user
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
              isAuth: true,
              user: result.user
            })
          }
          else {
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
      }
    }
  }

  componentWillUnmount () {
    this.fireBaseListener && this.fireBaseListener();
  }

  render () {
    const { isAuth, user } = this.state
    const elements = routes.map((item, index) => {
      const { path, exact, isPrivate, component } = item
      const routeProps = { path, exact }
      if (isPrivate) {
        return (
          <PrivateRoute
            key={index}
            isAuth={isAuth}
            user={user}
            {...routeProps}
            component={component}
          />
        )
      } else {
        return (
          <NormalRoute
            key={index}
            isAuth={isAuth}
            user={user}
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
