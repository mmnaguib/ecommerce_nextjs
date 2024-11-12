import { ICartItem } from "@/interfaces";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"


type cartContextType = {
    cartTotalQty: number;
    cartItems: ICartItem[] | null;
    handleAddToCart: (product: ICartItem | null) => void
}

export const CartContext = createContext<cartContextType | null>(null);

interface Props {
    [propName : string]: any //ReactNode
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(1);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);  // حددها كمصفوفة فارغة

    useEffect(()=>{
        const items = localStorage.getItem('cart');
        const cartProducts:ICartItem[] | [] = JSON.parse(items!);
        setCartItems(cartProducts)
    },[])
    const handleAddToCart = useCallback((product: ICartItem | null) => {
        if (product === null) return;
      
        setCartItems((prev) => {
          const productIndex = prev.findIndex((item) => item.id === product.id);
      
          if (productIndex !== -1) {
            const updatedCart = [...prev];
            updatedCart[productIndex] = {
              ...updatedCart[productIndex],  // ننسخ بقية خصائص المنتج الحالي
              quantity: updatedCart[productIndex].quantity + product.quantity,  // نزيد الكمية
            };
      
            setCartTotalQty(updatedCart.reduce((total, item) => total + item.quantity, 0));
      
            return updatedCart;
          } else {
            const updatedCart = [...prev, product];
            setCartTotalQty(updatedCart.reduce((total, item) => total + item.quantity, 0));
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart;
            
          }
        });
      }, []);
    

    const value = {cartTotalQty,cartItems,handleAddToCart}
    return <CartContext.Provider value={value} {...props} />
};


export const useCart = () => {
    const context = useContext(CartContext);
    if(context === null){
        throw new Error('useCart must be used within cartContextProvider')
    }

    return context
}