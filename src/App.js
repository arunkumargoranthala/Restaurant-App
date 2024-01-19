/* eslint-disable react/destructuring-assignment */
// Import the necessary items from RestaurantPage.js

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
    dishName: '', // Add dishName to the state
    dishImage: '', // Add dishImage to the state
  }

  handleAddToCart = (dishId, quantity, dishName, dishImage) => {
    this.setState(
      prevState => {
        const updatedCartItems = [
          ...prevState.cartItems,
          {dishId, quantity, dishName, dishImage},
        ]
        return {
          cartItems: updatedCartItems,
          selectedDishId: dishId,
          quantity,
          dishName,
          dishImage,
        }
      },
      () => {
        console.log('State updated:', this.state.cartItems)
      },
    )
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const updatedCartItems = prevState.cartItems.map(item => {
        if (item.dishId === dishId) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      return {cartItems: updatedCartItems}
    })
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const updatedCartItems = prevState.cartItems.map(item => {
        if (item.dishId === dishId && item.quantity > 0) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      return {cartItems: updatedCartItems}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartItems: []})
  }

  render() {
    const {
      cartItems,
      selectedDishId,
      quantity,
      dishName,
      dishImage,
    } = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            selectedDishId,
            quantity,
            cartItems,
            dishName,
            dishImage,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/"
              render={props => (
                <RestaurantPage
                  {...props}
                  onAddToCart={this.handleAddToCart}
                  dishName={dishName}
                  dishImage={dishImage}
                />
              )}
            />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
