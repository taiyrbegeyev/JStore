import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { routes } from 'routing'
import { auth } from 'firebase.js'

const PrivateRoute = ({ auth: auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      auth
      ? <Component {...props} />
      : <Redirect to='get-started' />
    )
    }
  />
)

class App extends Component {
  state = {
    isAuth: false
  }
  
  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuth: true
        })
      }
    })
  }
  
  render () {
    const elements = routes.map((item, index) => {
      const { path, exact, isPrivate, component } = item
      const routeProps = { path, exact }
      if (isPrivate) {
        return (
          <PrivateRoute auth={auth} key={index} {...routeProps} component={component} />
        )
      } else {
        return (
          <Route key={index} {...routeProps} component={component} />
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
