import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { routes } from 'routing'

class App extends Component {
  render () {
    const elements = routes.map((item, index) => {
      const { path, exact, component } = item
      const routeProps = { path, exact }
      return (<Route key={index} {...routeProps} component={component} />)
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
