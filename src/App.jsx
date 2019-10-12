import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import { routes } from 'routing'

const PrivateRoute = ({ isAuth, user, component: Component, ...rest }) => {
  console.log(isAuth)
  return <Route
    {...rest}
    render={props => (
      isAuth === false
      ? <Redirect to='get-started' />
      : <Component
          isAuth={isAuth}
          user={user}
          {...props}
        />
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
    isAuth: null,
    user: null,
    isLoading: true
  }
  
  componentWillMount () {
    this.setState({
      isLoading: true
    })
    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (auth.isSignInWithEmailLink(window.location.href)) {
        console.log('isSignInWithEmailLink')
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          email = window.prompt('Please provide your email for confirmation')
        }
        else {
          auth.signInWithEmailLink(email, window.location.href)
          .then((result) => {
            console.log('signInWithEmailLink')
            window.localStorage.removeItem('emailForSignIn')
            if (result.user) {
              console.log(result.user)
              this.setState({
                isAuth: true,
                user: result.user,
                isLoading: false
              })
            }
            else {
              console.log('signInWithEmailLink setting to false ')
              this.setState({
                isAuth: false,
                user: null,
                isLoading: false
              })
            }
          })
          .catch((err) => {
            console.log(err)
            alert('Error: ' + err.message)
            auth.signOut()
            this.setState({
              isAuth: false,
              user: null,
              isLoading: false
            })
          })
        }
      }
      else if (user) {
        console.log('onAuthStateChanged setting to true ')
        this.setState({
          isAuth: true,
          user: user,
          isLoading: false
        })
      }
      else {
        console.log('onAuthStateChanged setting to false ')
        this.setState({
          isAuth: false,
          user: null,
          isLoading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.fireBaseListener && this.fireBaseListener();
  }

  render () {
    const { isAuth, user, isLoading } = this.state

    if (isLoading) {
      return null
    }
    
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
