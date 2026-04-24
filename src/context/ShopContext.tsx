"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string; // Display category name
  categoryId: string; // Reference to category doc ID
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  fabric?: string;
  fit?: string;
  details?: string[];
  deliveryInfo?: string;
  returnPolicy?: string;
  isFeatured?: boolean;
};

type CartItem = Product & { quantity: number; selectedSize?: string };

type ShopContextType = {
  products: Product[];
  isLoading: boolean;
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const db = useFirestore();

  // Fetch products from Firestore
  const productsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, "products");
  }, [db]);

  const { data: firestoreProducts, isLoading } = useCollection<Product>(productsQuery);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("viloryi-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem("viloryi-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedSize?: string) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id && item.selectedSize === selectedSize);
      if (existingItem) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedSize === selectedSize) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("viloryi-cart");
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products: firestoreProducts || [],
        isLoading,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
};