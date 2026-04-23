
"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useShop, type Product } from "@/context/ShopContext";
import { ShoppingBag, Eye, Heart } from "lucide-react";

export const FeaturedProducts = () => {
  const { products, addToCart } = useShop();

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-accent tracking-[0.3em] text-xs font-bold uppercase">Our Selection</span>
            <h2 className="text-4xl md:text-5xl font-headline">Featured Pieces</h2>
          </div>
          <Link href="/shop" className="text-sm tracking-widest font-semibold border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-all">
            VIEW ALL PRODUCTS
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: Product, onAddToCart: () => void }) => {
  return (
    <div className="group space-y-4 bg-background p-4 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 space-y-2">
          <Button 
            onClick={onAddToCart}
            className="w-full bg-white text-primary rounded-none tracking-widest text-[10px] font-bold h-10 hover:bg-accent hover:text-white transition-colors"
          >
            QUICK ADD
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1 rounded-none h-10 bg-white/80 backdrop-blur-sm">
                <Eye className="w-4 h-4" />
            </Button>
            <Button variant="secondary" className="flex-1 rounded-none h-10 bg-white/80 backdrop-blur-sm">
                <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-1 text-center">
        <span className="text-[10px] text-accent tracking-[0.2em] uppercase font-bold">{product.category}</span>
        <h3 className="text-lg font-headline tracking-wide group-hover:text-accent transition-colors">{product.name}</h3>
        <p className="font-semibold tracking-wider">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

import Link from "next/link";
