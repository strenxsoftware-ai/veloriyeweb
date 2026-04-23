
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
  additionalImages?: string[];
  fabric?: string;
  fit?: string;
  details?: string[];
  deliveryInfo?: string;
  returnPolicy?: string;
};

type CartItem = Product & { quantity: number; selectedSize?: string };

type ShopContextType = {
  products: Product[];
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

  const products: Product[] = [
    {
      id: "p1",
      name: "Ethereal Silk Kurti Set",
      price: 4999,
      category: "Kurti Sets",
      description: "A premium silk blend kurti set featuring intricate hand embroidery and a minimal silhouette. Designed for celebrations that demand grace and sophistication.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-1")?.imageUrl || "",
      additionalImages: [
        "https://picsum.photos/seed/p1-2/800/1200",
        "https://picsum.photos/seed/p1-3/800/1200"
      ],
      fabric: "70% Silk, 30% Fine Cotton",
      fit: "Relaxed Fit",
      details: [
        "Hand-embroidered neckline",
        "Side slits for easy movement",
        "Includes matching straight-cut trousers",
        "Soft inner lining for comfort"
      ],
      deliveryInfo: "Dispatched within 24-48 hours. Standard delivery takes 3-5 business days.",
      returnPolicy: "We offer a 7-day hassle-free return policy for unused items with original tags."
    },
    {
      id: "p2",
      name: "Modern Linen Co-ord",
      price: 3499,
      category: "Co-ord Sets",
      description: "Breathable linen co-ord set designed for the contemporary woman. Perfect for casual elegance and effortless styling from desk to dinner.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-2")?.imageUrl || "",
      additionalImages: [
        "https://picsum.photos/seed/p2-2/800/1200",
        "https://picsum.photos/seed/p2-3/800/1200"
      ],
      fabric: "100% Organic Linen",
      fit: "Tailored Fit",
      details: [
        "Minimalist notch collar",
        "Elasticated waistband on trousers",
        "Functional side pockets",
        "Pre-washed for extra softness"
      ],
      deliveryInfo: "Dispatched within 24-48 hours. Standard delivery takes 3-5 business days.",
      returnPolicy: "We offer a 7-day hassle-free return policy for unused items with original tags."
    },
    {
      id: "p3",
      name: "Minimalist Daily Kurti",
      price: 1899,
      category: "Kurtis",
      description: "A clean, modern kurti made from fine cotton, ideal for professional settings or daily wear. Experience luxury in everyday simplicity.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-3")?.imageUrl || "",
      additionalImages: [
        "https://picsum.photos/seed/p3-2/800/1200"
      ],
      fabric: "Fine Grade Combed Cotton",
      fit: "Straight Cut",
      details: [
        "Concealed button placket",
        "Breathable weave for all-day comfort",
        "Tonal stitching details",
        "Easy-to-iron finish"
      ],
      deliveryInfo: "Dispatched within 24-48 hours. Standard delivery takes 3-5 business days.",
      returnPolicy: "We offer a 7-day hassle-free return policy for unused items with original tags."
    },
    {
      id: "p4",
      name: "Velvet Evening Set",
      price: 6499,
      category: "Kurti Sets",
      description: "Luxurious velvet kurti set with subtle metallic detailing, perfect for evening celebrations and winter festivities.",
      imageUrl: PlaceHolderImages.find(img => img.id === "product-4")?.imageUrl || "",
      additionalImages: [
        "https://picsum.photos/seed/p4-2/800/1200",
        "https://picsum.photos/seed/p4-3/800/1200"
      ],
      fabric: "Premium Micro Velvet",
      fit: "Slim Fit",
      details: [
        "Zari work on cuffs and hem",
        "Deep jewel-toned palette",
        "Includes matching slim-fit pants",
        "Dry clean only"
      ],
      deliveryInfo: "Dispatched within 24-48 hours. Standard delivery takes 3-5 business days.",
      returnPolicy: "We offer a 7-day hassle-free return policy for unused items with original tags."
    },
  ];

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
        products,
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
