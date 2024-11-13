import { ICartItem } from "@/interfaces";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type cartContextType = {
  cartTotalQty: number;
  cartItems: ICartItem[] | null;
  handleAddToCart: (product: ICartItem | null) => void;
  handleRemoveFromCart: (productId: string) => void;
};

export const CartContext = createContext<cartContextType | null>(null);

interface Props {
  [propName: string]: ReactNode; // ReactNode
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  // This useEffect will update the cartTotalQty whenever cartItems change
  useEffect(() => {
    const newTotalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartTotalQty(newTotalQty);
  }, [cartItems]);

  const handleAddToCart = useCallback((product: ICartItem | null) => {
    if (product === null) return;

    setCartItems((prev) => {
      const productIndex = prev.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: updatedCart[productIndex].quantity + product.quantity,
        };
        toast.success('Product Added To Cart!');
        return updatedCart;
      } else {
        const updatedCart = [...prev, product];
        toast.success('Product Added To Cart!');
        return updatedCart;
      }
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const value = { cartTotalQty, cartItems, handleAddToCart, handleRemoveFromCart };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within CartContextProvider');
  }

  return context;
};
