/* eslint-disable react/no-array-index-key */
import React from 'react'
import {Link} from 'react-router-dom'
import CartContext from './CartContext'

const Cart = () => (
  <CartContext.Consumer>
    {cartContext => {
      const {selectedDishId, quantity, cartItems} = cartContext

      return (
        <div>
          <h2>Cart Details</h2>

          {cartItems.length === 0 ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="Empty Cart"
            />
          ) : (
            <>
              <Link to="/">Home</Link>
              <button type="button" onClick={() => console.log('Remove All')}>
                Remove All
              </button>
              <button type="button" onClick={() => console.log('+')}>
                +
              </button>
              <button type="button" onClick={() => console.log('-')}>
                -
              </button>
            </>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
