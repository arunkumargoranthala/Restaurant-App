// CartContext.js
import React, {createContext, useContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [selectedDishId, setSelectedDishId] = useState(null)
  const [quantity, setQuantity] = useState(0)

  const updateCart = (dishId, qty) => {
    setSelectedDishId(dishId)
    setQuantity(qty)
  }

  return (
    <CartContext.Provider value={{selectedDishId, quantity, updateCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
