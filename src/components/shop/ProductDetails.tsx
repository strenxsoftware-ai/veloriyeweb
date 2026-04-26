
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  Maximize2,
  Heart,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const ProductDetails = ({ productId }: { productId: string }) => {
  const { products, addToCart } = useShop();
  const { toast } = useToast();
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>(product?.images?.[0] || "");
  const [isSizeGuideZoomed, setIsSizeGuideZoomed] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerZoom, setViewerZoom] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-headline">Product not found.</h2>
        <Button variant="link" className="mt-4" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const allImages = product.images || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "A size selection is required to add this item to your bag.",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, selectedSize);
  };

  const handleZoomIn = () => setViewerZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setViewerZoom(prev => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setViewerZoom(1);

  return (
    <section className="container mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">
        
        {/* Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="relative aspect-[3/4] bg-muted overflow-hidden group cursor-zoom-in"
            onClick={() => setIsViewerOpen(true)}
          >
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="rounded-none bg-white/80 backdrop-blur-md">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImage(img);
                }}
                className={cn(
                  "relative w-20 aspect-[3/4] flex-shrink-0 bg-muted overflow-hidden transition-all duration-300",
                  activeImage === img ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[10px] tracking-widest text-muted-foreground uppercase font-bold">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span>Catalog</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold tracking-wider text-accent">
              ₹{product.price.toLocaleString()}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs tracking-widest font-bold uppercase">Select Size</span>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-[10px] h-auto p-0 tracking-widest uppercase font-bold opacity-60 hover:opacity-100 transition-opacity">
                    Size Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-background rounded-none border-none p-0 overflow-hidden">
                  <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-2xl font-headline tracking-widest uppercase text-primary">Size Guide</DialogTitle>
                  </DialogHeader>
                  <div className="p-6 overflow-auto max-h-[70vh]">
                    <div className="relative w-full overflow-hidden bg-muted">
                      <Image
                        src="https://raw.githubusercontent.com/strenxsoftware-ai/viloryimee/7aa45a80650fef81cf7ee8c21001c5ac8a9dbefa/size%20chart.png"
                        alt="Viloryi Size Guide"
                        width={800}
                        height={1200}
                        className={cn(
                          "w-full h-auto transition-transform duration-500 origin-top cursor-zoom-in",
                          isSizeGuideZoomed ? "scale-150 cursor-zoom-out" : "scale-100"
                        )}
                        onClick={() => setIsSizeGuideZoomed(!isSizeGuideZoomed)}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-[10px] tracking-widest uppercase font-bold">
                      <Maximize2 className="w-3 h-3" />
                      <span>Click image to {isSizeGuideZoomed ? 'zoom out' : 'zoom in'}</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {(product.sizes || ["XS", "S", "M", "L", "XL"]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border text-xs font-bold transition-all",
                    selectedSize === size 
                      ? "border-primary bg-primary text-white" 
                      : "border-muted hover:border-accent hover:text-accent"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-14 bg-primary text-white rounded-none tracking-[0.2em] font-bold text-sm hover:bg-foreground/90"
              >
                {product.stock === 0 ? "OUT OF STOCK" : "ADD TO BAG"}
              </Button>
              <Button className="w-14 h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 border-none transition-colors">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            {product.stock > 0 && product.stock < 5 && (
              <p className="text-[10px] text-center text-accent tracking-widest uppercase font-bold">
                Only {product.stock} left in stock!
              </p>
            )}
          </div>

          <div className="space-y-6 border-t pt-8">
            <div className="space-y-4">
              <h3 className="text-xs tracking-widest font-bold uppercase">Product Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light italic">
                "{product.description}"
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b-muted">
                <AccordionTrigger className="text-xs tracking-widest font-bold uppercase hover:no-underline">
                  Materials & Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Fabric / Materials</span>
                      <span className="text-muted-foreground">{product.materials || "Premium Blend"}</span>
                    </div>
                    {product.details && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {product.details}
                        </p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b-muted">
                <AccordionTrigger className="text-xs tracking-widest font-bold uppercase hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex gap-4">
                    <Truck className="w-5 h-5 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">Standard shipping: 3-5 business days across major cities.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <RotateCcw className="w-5 h-5 text-accent shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">Initiate a return within 7 days of delivery.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Manual Zoom Image Viewer Dialog */}
      <Dialog open={isViewerOpen} onOpenChange={(open) => {
        setIsViewerOpen(open);
        if (!open) handleResetZoom();
      }}>
        <DialogContent className="max-w-[100vw] h-[100vh] p-0 bg-black/95 border-none rounded-none flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-6 right-6 z-[60] flex items-center gap-4">
             <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-10 w-10 rounded-full"
                onClick={handleZoomOut}
                disabled={viewerZoom <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <div className="w-[1px] h-4 bg-white/20" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-10 w-10 rounded-full"
                onClick={handleZoomIn}
                disabled={viewerZoom >= 4}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <div className="w-[1px] h-4 bg-white/20" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-10 w-10 rounded-full"
                onClick={handleResetZoom}
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full h-12 w-12 bg-white text-black hover:bg-white/90"
              onClick={() => setIsViewerOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="w-full h-full overflow-auto flex items-center justify-center p-4 custom-scrollbar">
            <div 
              className="relative transition-transform duration-300 ease-out"
              style={{ 
                transform: `scale(${viewerZoom})`,
                minWidth: '300px',
                width: viewerZoom > 1 ? `${80 * viewerZoom}vh` : 'auto',
                height: viewerZoom > 1 ? `${100 * viewerZoom}vh` : '90vh',
                aspectRatio: '3/4'
              }}
            >
              {activeImage && (
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                  quality={100}
                />
              )}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/60 text-[10px] tracking-widest uppercase font-bold">
            Zoom Level: {viewerZoom.toFixed(1)}x
          </div>
        </DialogContent>
      </Dialog>

      {/* Sticky Mobile Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md p-4 border-t flex gap-4 animate-in fade-in slide-in-from-bottom-5">
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[10px] tracking-widest font-bold text-muted-foreground uppercase truncate">
            {product.name}
          </p>
          <p className="font-bold text-sm">₹{product.price.toLocaleString()}</p>
        </div>
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="bg-primary text-white rounded-none px-8 tracking-widest text-xs font-bold"
        >
          {product.stock === 0 ? "SOLD OUT" : (selectedSize ? `ADD ${selectedSize}` : "SELECT SIZE")}
        </Button>
      </div>
    </section>
  );
};
