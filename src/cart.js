// Cart.js
import React from 'react'
import {useCart} from './CartContext'

const Cart = () => {
  const {selectedDishId, quantity} = useCart()
  console.log(selectedDishId)
  console.log(quantity)

  return (
    <div>
      <h2>Cart</h2>
      <p>{selectedDishId}</p>
      <p>{quantity}</p>
    </div>
  )
}

export default Cart
