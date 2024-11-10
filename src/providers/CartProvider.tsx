'use client'
import { CartContextProvider } from '@/hooks/useCart'
import React, { ReactNode } from 'react'

const CartProvider = ({children}: {children: ReactNode}) => {
  return (
    <CartContextProvider>{children}</CartContextProvider>
  )
}

export default CartProvider