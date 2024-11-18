import { ICartItem } from "@/interfaces";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type cartContextType = {
  cartTotalQty: number;
  cartItems: ICartItem[];
  handleAddToCart: (product: ICartItem | null) => void;
  handleRemoveFromCart: (productId: string) => void;
  handleIncreaseQty: (product: ICartItem) => void;
  handleDecreaseQty: (product: ICartItem) => void;
  clearCart: () => void;
};

export const CartContext = createContext<cartContextType | null>(null);

interface Props {
  [propName: string]: ReactNode; // ReactNode
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const cartProducts: any = localStorage.getItem("cart");
    const cartItems: ICartItem[] = JSON.parse(cartProducts);
    setCartItems(cartItems);
  }, []);

  const handleAddToCart = useCallback((product: ICartItem | null) => {
    if (product === null) return;

    setCartItems((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      //toast.success('Product Added To Cart!');
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      setCartItems((prevCartItems) => {
        const filteredProducts = prevCartItems.filter(
          (item) => item.id !== productId
        );
        localStorage.setItem("cart", JSON.stringify(filteredProducts));
        return filteredProducts;
      });
    },
    [setCartItems]
  );

  const handleIncreaseQty = useCallback(
    (product: ICartItem) => {
      if (product.quantity === product.stock)
        return toast.error("تجاوزت الحد الاقصي للبيع");
      let updatedCart;
      if (cartItems) {
        updatedCart = [...cartItems];
        const existingIndex = cartItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
          setCartItems(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      }
    },
    [cartItems]
  );

  const handleDecreaseQty = useCallback(
    (product: ICartItem) => {
      if (product.quantity === 1) return toast.error("لا يمكن اقل من ذلك");
      //handleRemoveFromCart(product.id)
      let updatedCart;
      if (cartItems) {
        updatedCart = [...cartItems];
        const existingIndex = cartItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
          setCartItems(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      }
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartTotalQty(0);
    localStorage.setItem("cart", JSON.stringify(null));
  }, []);

  const value = {
    cartTotalQty,
    clearCart,
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQty,
    handleDecreaseQty,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within CartContextProvider");
  }

  return context;
};
