import { ICartItem } from "@/interfaces";
import { createContext, ReactNode, useCallback, useContext, useState } from "react"



type cartContextType = {
    cartTotalQty: number;
    cartItems: ICartItem[] | null;
    handleAddToCart: (product: ICartItem | null) => void
}

interface Props {
    [propName : string]: ReactNode
}
export const CartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartItems, setCartItems] = useState<ICartItem[] | null>(null);
    const handleAddToCart = useCallback((product: ICartItem | null)=>{
        if (product === null) return;
        setCartItems((prev) => {
            let updatedCart;
            if(prev){
                updatedCart = {...prev,product}
            }else{
                updatedCart = [product]
            }

            return updatedCart
        })
    },[])
    

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