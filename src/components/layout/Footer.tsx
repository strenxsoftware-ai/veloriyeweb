
"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="about" className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-[0.2em]">VILORYI</h2>
            <p className="text-sm font-light leading-relaxed opacity-70">
              Redefining ethnic elegance for the modern woman. Luxury, minimal, and premium silhouettes crafted with love.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-bold uppercase">Quick Links</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Shop All</Link></li>
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">New Arrivals</Link></li>
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Collections</Link></li>
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Our Story</Link></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-bold uppercase">Customer Care</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">Size Guide</Link></li>
              <li><Link href="#" className="hover:opacity-100 hover:text-accent transition-all">FAQs</Link></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-bold uppercase">Contact</h4>
            <ul className="space-y-4 text-sm font-light opacity-70">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> Mumbai, Maharashtra, India</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent" /> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent" /> care@viloryi.com</li>
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
