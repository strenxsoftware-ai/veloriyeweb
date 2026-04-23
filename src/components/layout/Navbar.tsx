
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { StyleCurator } from "@/components/ai/StyleCurator";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen, isCartOpen } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex-1 hidden md:flex gap-8">
          <Link href="#collections" className="text-sm font-medium tracking-widest hover:text-accent transition-colors">COLLECTIONS</Link>
          <Link href="#about" className="text-sm font-medium tracking-widest hover:text-accent transition-colors">ABOUT</Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <div className="flex flex-col gap-6 pt-12">
                <Link href="#collections" className="text-xl font-headline tracking-widest">COLLECTIONS</Link>
                <Link href="#about" className="text-xl font-headline tracking-widest">ABOUT</Link>
                <StyleCurator />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex-1 text-center">
          <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-[0.2em] text-foreground">
            VILORYI
          </h1>
        </Link>

        <div className="flex-1 flex items-center justify-end gap-2 md:gap-6">
          <div className="hidden md:block">
            <StyleCurator />
          </div>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-background flex flex-col p-0">
              <CartDrawer />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
