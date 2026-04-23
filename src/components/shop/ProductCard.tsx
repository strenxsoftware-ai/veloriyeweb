"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useShop, type Product } from "@/context/ShopContext";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useShop();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // For quick add from card, we'll default to 'M' or handle as needed
    addToCart(product, "M");
  };

  return (
    <div className={cn("group space-y-4 bg-background p-4 shadow-sm hover:shadow-xl transition-all duration-500", className)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 space-y-2">
          <Button 
            onClick={handleQuickAdd}
            className="w-full bg-white text-primary rounded-none tracking-widest text-[10px] font-bold h-10 hover:bg-accent hover:text-white transition-colors border-none"
          >
            <ShoppingBag className="w-3 h-3 mr-2" />
            QUICK ADD (M)
          </Button>
          <div className="flex gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button variant="secondary" className="w-full rounded-none h-10 bg-white/80 backdrop-blur-sm hover:bg-white">
                  <Eye className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="secondary" className="flex-1 rounded-none h-10 bg-white/80 backdrop-blur-sm hover:bg-white">
                <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-1 text-center">
        <span className="text-[10px] text-accent tracking-[0.2em] uppercase font-bold">{product.category}</span>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-headline tracking-wide hover:text-accent transition-colors cursor-pointer truncate">
            {product.name}
          </h3>
        </Link>
        <p className="font-semibold tracking-wider">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};
