import {
  createContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useContext } from "react";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

type CartContextValue = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  updateQuantity: (
    id: number,
    selectedColor: string,
    selectedSize: string,
    delta: number,
  ) => void;
  removeFromCart: (id: number, selectedColor: string, selectedSize: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return JSON.parse(window.localStorage.getItem("shop-cart") ?? "[]") as CartItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("shop-cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  const addToCart = (product: Product, selectedColor: string, selectedSize: string) => {
    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize,
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
          selectedColor,
          selectedSize,
        },
      ];
    });
  };

  const updateQuantity = (
    id: number,
    selectedColor: string,
    selectedSize: string,
    delta: number,
  ) => {
    setCart((current) =>
      current.flatMap((item) => {
        if (
          item.id !== id ||
          item.selectedColor !== selectedColor ||
          item.selectedSize !== selectedSize
        ) {
          return [item];
        }

        const nextQuantity = item.quantity + delta;
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
      }),
    );
  };

  const removeFromCart = (id: number, selectedColor: string, selectedSize: string) => {
    setCart((current) =>
      current.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          ),
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}



export { CartContext, CartProvider };
export default CartProvider;


