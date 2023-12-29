import React from 'react'

const Cart = ({cartItems}) => {
  console.log('Cart Props:', cartItems)
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map(item => (
        <div key={item.dishId}>
          <p>Dish ID: {item.dishId}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart
