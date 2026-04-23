
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronRight } from "lucide-react";

export const Hero = () => {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-model");

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg?.imageUrl || ""}
          alt="Viloryi Premium Collection"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-slow"
          data-ai-hint="elegant fashion"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-2xl space-y-6 animate-fade-in opacity-0">
          <span className="text-accent font-medium tracking-[0.4em] text-xs uppercase block">THE NEW COLLECTION</span>
          <h2 className="text-6xl md:text-8xl font-headline font-bold text-foreground leading-[1.1]">
            Wear Your <br /> Elegance
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-lg">
            Experience the harmony of traditional silhouettes and modern minimalism with our premium Kurti Sets & Co-ord Styles.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary text-primary-foreground text-sm tracking-[0.2em] rounded-none px-12 py-7 h-auto font-semibold hover:bg-foreground/90 transition-all">
              SHOP NOW
            </Button>
            <Button variant="outline" className="border-foreground text-foreground text-sm tracking-[0.2em] rounded-none px-12 py-7 h-auto font-semibold hover:bg-foreground hover:text-background transition-all">
              EXPLORE STYLES
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};
