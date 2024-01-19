import React from 'react'
import CartContext from './CartContext'

class Cart extends React.Component {
  render() {
    return (
      <CartContext.Consumer>
        {cartContext => (
          <div>
            <h1>Cart</h1>
            {cartContext.cartItems.length === 0 ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="Empty Cart"
                />
                <p>Your cart is empty</p>
              </div>
            ) : (
              cartContext.cartItems.map(item => (
                <div key={item.dishId} className="cart-item">
                  <h3>{item.dishName}</h3>
                  <img src={item.dishImage} alt={item.dishName} />
                  <p>Quantity: {item.quantity}</p>
                  <button
                    type="button"
                    onClick={() =>
                      cartContext.incrementCartItemQuantity(item.dishId)
                    }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      cartContext.decrementCartItemQuantity(item.dishId)
                    }
                  >
                    -
                  </button>
                </div>
              ))
            )}
            {cartContext.cartItems.length > 0 && (
              <button type="button" onClick={cartContext.removeAllCartItems}>
                Remove All
              </button>
            )}
          </div>
        )}
      </CartContext.Consumer>
    )
  }
}

export default Cart
