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
  totalProductsInCart: number;
};

export const CartContext = createContext<cartContextType | null>(null);

interface Props {
  [propName: string]: ReactNode; // ReactNode
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const calculateSubTotal = (cartItems: ICartItem[]) => {
    const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return { totalQty, totalPrice };
  };
  useEffect(() => {
    const cartProducts = localStorage.getItem("cart");
    if (cartProducts) {
      const cartItems: ICartItem[] = JSON.parse(cartProducts);
      setCartItems(cartItems);
      const { totalQty, totalPrice } = calculateSubTotal(cartItems);
      setCartTotalQty(totalPrice);
      setTotalProductsInCart(totalQty);
    }
  }, []);

  const handleAddToCart = useCallback((product: ICartItem | null) => {
    if (product === null) return;

    setCartItems((prev) => {
      const updatedCart = prev ? [...prev, product] : [product];

      const { totalQty, totalPrice } = calculateSubTotal(cartItems);
      setCartTotalQty(totalPrice);
      setTotalProductsInCart(totalQty);
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
        const { totalQty, totalPrice } = calculateSubTotal(cartItems);
        setCartTotalQty(totalPrice);
        setTotalProductsInCart(totalQty);
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
          const { totalQty, totalPrice } = calculateSubTotal(cartItems);
          setCartTotalQty(totalPrice);
          setTotalProductsInCart(totalQty);
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
          const { totalQty, totalPrice } = calculateSubTotal(cartItems);
          setCartTotalQty(totalPrice);
          setTotalProductsInCart(totalQty);
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
    setTotalProductsInCart(0);
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
    totalProductsInCart,
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
