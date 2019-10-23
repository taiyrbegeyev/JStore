import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { auth } from 'firebase.js'
import { userExists, fullNameExists } from 'firebase/auth.js'
import { routes } from 'routing'

const PrivateRoute = ({ isAuth, user, windowWidth, windowHeight, isNewUser, component: Component, ...rest }) => {
  console.log(isAuth)
  return <Route
    {...rest}
    render={props => (
      isAuth === false
      ? <Redirect to='/get-started' />
      : <Component
          isAuth={isAuth}
          user={user}
          isNewUser={isNewUser}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
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
    isNewUser: null,
    isLoading: true
  }
  
  componentWillMount () {
    this.setState({
      isLoading: true
    })

    this.fireBaseListener = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('onAuthStateChanged setting to true ')
        fullNameExists(user.email, () => {
          this.setState({
            isNewUser: true
          })
        })
        this.setState({
          isAuth: true,
          user: user,
          isLoading: false
        })
      }
      else if (auth.isSignInWithEmailLink(window.location.href)) {
        console.log('isSignInWithEmailLink')
        let email = window.localStorage.getItem('emailForSignIn')
        console.log(email)
        if (!email && !this.state.user) {
          email = window.prompt('Please provide your email for confirmation')
        }
        auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          console.log('signInWithEmailLink')
          window.localStorage.removeItem('emailForSignIn')
          if (result.user) {
            console.log('signInWithEmailLink setting to true')
            userExists(email, (res) => {
              this.setState({
                isNewUser: !res 
              })
            })
            this.setState({
              isAuth: true,
              user: result.user,
              isLoading: false
            })
          }
          else {
            console.log('signInWithEmailLink setting to false')
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
    const { isAuth, user, isNewUser, isLoading } = this.state

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
            isNewUser={isNewUser}
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
