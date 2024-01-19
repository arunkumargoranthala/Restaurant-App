/* eslint-disable react/destructuring-assignment */
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import React, {Component} from 'react'
import Cart from './cart'
import RestaurantPage from './RestaurantPage'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import CartContext from './CartContext'

class App extends Component {
  state = {
    cartItems: [],
    selectedDishId: null,
    quantity: 0,
  }

  handleAddToCart = (dishId, quantity) => {
    this.setState(
      prevState => {
        const updatedCartItems = [...prevState.cartItems, {dishId, quantity}]
        return {cartItems: updatedCartItems, selectedDishId: dishId, quantity}
      },
      () => {
        console.log('State updated:', this.state.cartItems)
      },
    )
  }

  render() {
    const {cartItems, selectedDishId, quantity} = this.state
    console.log('render: ', cartItems)

    return (
      <BrowserRouter>
        <CartContext.Provider value={{selectedDishId, quantity, cartItems}}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/"
              render={props => (
                <RestaurantPage {...props} onAddToCart={this.handleAddToCart} />
              )}
            />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
