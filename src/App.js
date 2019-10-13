import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import routes from './routes'
import withTracker from './withTracker'
import './assets/css/bootstrap.css'
import './assets/css/font-awesome.css'
import './assets/css/main.css'
import './assets/css/metisMenu.css'
import './assets/css/onoffcanvas.css'
import './assets/css/animate.css'

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME || ''}>
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              return (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              )
            })}
          />
        )
      })}
    </div>
  </Router>
)
