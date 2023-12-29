import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React, {Component} from 'react'
import Cart from './cart'
import RestaurantPage from './RestaurantPage'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  state = {
    cartItems: [],
  }

  handleAddToCart = (dishId, quantity) => {
    const newCartItem = {dishId, quantity}
    this.setState(prevState => {
      const updatedCartItems = [...prevState.cartItems, newCartItem]
      console.log('Updated Cart Items:', updatedCartItems) // Add this console.log
      return {cartItems: updatedCartItems}
    })
  }

  render() {
    const {cartItems} = this.state
    console.log(cartItems)

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/cart"
            component={() => <Cart cartItems={cartItems} />}
          />
          <ProtectedRoute
            exact
            path="/"
            render={props => (
              <RestaurantPage {...props} onAddToCart={this.handleAddToCart} />
            )}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
