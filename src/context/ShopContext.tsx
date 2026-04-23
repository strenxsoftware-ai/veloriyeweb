
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
};

type CartItem = Product & { quantity: number };

type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: "p1",
      name: "Ethereal Silk Kurti Set",
      price: 4999,
      category: "Kurti Sets",
      description: "A premium silk blend kurti set featuring intricate hand embroidery and a minimal silhouette.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-1")?.imageUrl || "",
    },
    {
      id: "p2",
      name: "Modern Linen Co-ord",
      price: 3499,
      category: "Co-ord Sets",
      description: "Breathable linen co-ord set designed for the contemporary woman. Perfect for casual elegance.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-2")?.imageUrl || "",
    },
    {
      id: "p3",
      name: "Minimalist Daily Kurti",
      price: 1899,
      category: "Kurtis",
      description: "A clean, modern kurti made from fine cotton, ideal for professional settings or daily wear.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-3")?.imageUrl || "",
    },
    {
      id: "p4",
      name: "Velvet Evening Set",
      price: 6499,
      category: "Kurti Sets",
      description: "Luxurious velvet kurti set with subtle metallic detailing, perfect for evening celebrations.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-4")?.imageUrl || "",
    },
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
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

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
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
