"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, MapPin, MessageSquare, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const [isSizeGuideZoomed, setIsSizeGuideZoomed] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-[0.2em]">VILORYI</h2>
            <p className="text-sm font-light leading-relaxed opacity-70">
              Redefining ethnic elegance for the modern woman. Luxury, minimal, and premium silhouettes crafted with love.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/viloryi.official" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-bold uppercase">Quick Links</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li><Link href="/" className="hover:opacity-100 hover:text-accent transition-all">Shop All</Link></li>
              <li><Link href="/#collections" className="hover:opacity-100 hover:text-accent transition-all">Collections</Link></li>
              <li><Link href="/about" className="hover:opacity-100 hover:text-accent transition-all">Our Story</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 hover:text-accent transition-all">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-bold uppercase">Customer Care</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Shipping Policy</Link></li>
              <li><Link href="/returns-policy" className="hover:opacity-100 hover:text-accent transition-all">Returns & Exchanges</Link></li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:opacity-100 hover:text-accent transition-all text-left">Size Guide</button>
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
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-bold uppercase">Contact</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> Delhi, India</li>
              <li className="flex items-center gap-3">
                <a href="https://wa.me/919696731313" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <MessageSquare className="w-4 h-4 text-accent" /> +91 96967 31313
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a href="mailto:viloryi.official@gmail.com" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent" /> viloryi.official@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-widest opacity-40 uppercase">© 2024 VILORYI PREMIUM CLOTHING. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] tracking-widest opacity-40 uppercase hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link href="#" className="text-[10px] tracking-widest opacity-40 uppercase hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
