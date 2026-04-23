"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useShop, type Product } from "@/context/ShopContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SIZES = ["S", "M", "L", "XL"];

export const CategoryContent = ({ categorySlug }: { categorySlug: string }) => {
  const { products } = useShop();
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Format category name from slug
  const categoryName = categorySlug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => 
      p.category.toLowerCase() === categoryName.toLowerCase()
    );

    // Filter by Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by Size (Note: in a real app, products would have available sizes in their schema)
    // For now, we simulate this.
    if (selectedSizes.length > 0) {
      // In this MVP, all products technically have all sizes, but we'll simulate filtering
      // by just keeping the list as is if sizes are checked, or adding more logic if needed.
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0; // Default newest (based on order in array for this MVP)
    });

    return result;
  }, [products, categoryName, sortBy, priceRange, selectedSizes]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 border-muted">
          <div className="space-y-2">
            <span className="text-accent tracking-[0.3em] text-xs font-bold uppercase">Collections</span>
            <h1 className="text-5xl font-headline tracking-tight">{categoryName}</h1>
            <p className="text-muted-foreground text-sm font-light italic">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-none border-muted h-11 tracking-widest text-xs font-bold gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> FILTERS
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background rounded-none">
                <SheetHeader className="border-b pb-6 mb-8">
                  <SheetTitle className="text-2xl font-headline tracking-widest">Filters</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-12">
                  {/* Price Filter */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs tracking-[0.2em] font-bold uppercase">Price Range</h4>
                      <span className="text-xs font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                    </div>
                    <Slider
                      defaultValue={[0, 10000]}
                      max={10000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>

                  {/* Size Filter */}
                  <div className="space-y-6">
                    <h4 className="text-xs tracking-[0.2em] font-bold uppercase">Select Size</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {SIZES.map(size => (
                        <div key={size} className="flex items-center space-x-3">
                          <Checkbox 
                            id={`size-${size}`} 
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => toggleSize(size)}
                            className="rounded-none border-muted"
                          />
                          <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">{size}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t space-y-4">
                    <Button 
                      onClick={clearFilters}
                      variant="ghost" 
                      className="w-full rounded-none tracking-widest text-xs h-12"
                    >
                      CLEAR ALL
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-none border-muted h-11 focus:ring-0">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-muted">
                <SelectItem value="newest" className="rounded-none">Newest Arrivals</SelectItem>
                <SelectItem value="price-low" className="rounded-none">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="rounded-none">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] tracking-widest font-bold uppercase mr-2">Active Filters:</span>
            {selectedSizes.map(size => (
              <span key={size} className="bg-muted px-3 py-1 text-[10px] tracking-widest uppercase flex items-center gap-2">
                Size: {size} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSize(size)} />
              </span>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 10000) && (
              <span className="bg-muted px-3 py-1 text-[10px] tracking-widest uppercase flex items-center gap-2">
                ₹{priceRange[0]} - ₹{priceRange[1]} <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, 10000])} />
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <h3 className="text-2xl font-headline italic">No pieces found matching your criteria.</h3>
            <Button onClick={clearFilters} variant="link" className="tracking-widest text-xs uppercase font-bold opacity-60">
              RESET FILTERS
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
