import { createContext, ReactNode, useContext, useState } from "react"



type cartContextType = {
    cartTotalQty: number
}

interface Props {
    [propName : string]: ReactNode
}
export const CartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const value = {cartTotalQty}
    return <CartContext.Provider value={value} {...props} />
};


export const useCart = () => {
    const context = useContext(CartContext);
    if(context === null){
        throw new Error('useCart must be used within cartContextProvider')
    }

    return context
}