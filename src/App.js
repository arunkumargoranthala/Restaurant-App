// App.js
import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import RestaurantPage from './RestaurantPage'
import Login from './Login'
import Cart from './cart' // Import the Cart component
import ProtectedRoute from './ProtectedRoute'
import {CartProvider} from './CartContext' // Import the CartProvider

class App extends Component {
  render() {
    return (
      <CartProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/" component={RestaurantPage} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    )
  }
}

export default App
