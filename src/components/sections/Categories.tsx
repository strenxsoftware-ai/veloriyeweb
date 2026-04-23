
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const categories = [
  {
    title: "Kurti Sets",
    image: PlaceHolderImages.find(img => img.id === "category-kurti-sets")?.imageUrl,
    href: "/category/kurti-sets"
  },
  {
    title: "Kurtis",
    image: PlaceHolderImages.find(img => img.id === "category-kurtis")?.imageUrl,
    href: "/category/kurtis"
  },
  {
    title: "Co-ord Sets",
    image: PlaceHolderImages.find(img => img.id === "category-coord-sets")?.imageUrl,
    href: "/category/coord-sets"
  }
];

export const Categories = () => {
  return (
    <section id="collections" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline">Shop by Category</h2>
          <div className="w-20 h-[2px] bg-accent mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <Link key={idx} href={category.href} className="group relative block overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={category.image || ""}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="border border-white/40 bg-white/10 backdrop-blur-sm px-8 py-4 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-white text-lg tracking-[0.2em] font-medium uppercase">{category.title}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center px-2">
                <span className="text-xl font-headline tracking-widest">{category.title}</span>
                <span className="text-xs text-muted-foreground tracking-widest font-semibold group-hover:text-accent transition-colors">DISCOVER</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
