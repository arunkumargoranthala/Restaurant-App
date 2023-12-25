import {BrowserRouter, Route, Switch} from 'react-router-dom'

import React, {Component} from 'react'
import Cart from './cart'
import RestaurantPage from './RestaurantPage'

import Login from './Login'

import CartContext from './CartContext'

import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/" component={RestaurantPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
