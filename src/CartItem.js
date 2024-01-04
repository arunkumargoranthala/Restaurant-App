/* eslint-disable react/no-array-index-key */
import React, {useContext} from 'react'
import CartContext from './CartContext'

const CartItem = () => {
  const {cartList} = useContext(CartContext)

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartList.map((item, index) => (
          <li key={index}>
            Dish ID: {item.dishId}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartItem
