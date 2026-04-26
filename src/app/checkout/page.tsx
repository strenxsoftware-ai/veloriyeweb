"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ShoppingBag, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";

export default function CheckoutPage() {
  const { cart, cartTotal } = useShop();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/checkout/success");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-40 pb-24 text-center space-y-6">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/20" />
          <h1 className="text-3xl font-headline">Your bag is empty.</h1>
          <p className="text-muted-foreground">Add some elegant pieces to your collection before checking out.</p>
          <Link href="/#collections">
            <Button className="rounded-none tracking-widest mt-4">BROWSE COLLECTIONS</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Simplified Header for focus */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-headline font-bold tracking-widest">VILORYI</Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>
      </header>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Checkout Form */}
            <div className="lg:col-span-7 space-y-12">
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                    <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Contact Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] tracking-widest font-bold uppercase">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="jane@example.com" 
                        className="rounded-none h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[10px] tracking-widest font-bold uppercase">Phone Number</Label>
                      <Input id="phone" type="tel" required placeholder="+91 98765 43210" className="rounded-none h-12" />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                    <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Shipping Address</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-[10px] tracking-widest font-bold uppercase">First Name</Label>
                        <Input id="firstName" required placeholder="Jane" className="rounded-none h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-[10px] tracking-widest font-bold uppercase">Last Name</Label>
                        <Input id="lastName" required placeholder="Doe" className="rounded-none h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-[10px] tracking-widest font-bold uppercase">Street Address</Label>
                      <Input id="address" required placeholder="House No. / Street Name" className="rounded-none h-12" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-[10px] tracking-widest font-bold uppercase">City</Label>
                        <Input id="city" required placeholder="Delhi" className="rounded-none h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-[10px] tracking-widest font-bold uppercase">State</Label>
                        <Input id="state" required placeholder="Delhi" className="rounded-none h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-[10px] tracking-widest font-bold uppercase">Pincode</Label>
                        <Input id="pincode" required placeholder="110001" className="rounded-none h-12" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                    <h2 className="text-xl font-headline font-bold uppercase tracking-widest">Payment Method</h2>
                  </div>
                  <RadioGroup defaultValue="upi" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label
                      htmlFor="upi"
                      className="flex items-center justify-between p-4 border cursor-pointer hover:border-accent transition-all data-[state=checked]:border-accent"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="upi" id="upi" />
                        <span className="text-xs font-bold tracking-widest uppercase">UPI / PhonePe / GPay</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-accent opacity-0 peer-data-[state=checked]:opacity-100" />
                    </Label>
                    <Label
                      htmlFor="cod"
                      className="flex items-center justify-between p-4 border cursor-pointer hover:border-accent transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cod" id="cod" />
                        <span className="text-xs font-bold tracking-widest uppercase">Cash on Delivery</span>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <Button 
                  disabled={loading}
                  className="w-full bg-primary text-white py-8 tracking-[0.3em] font-bold uppercase rounded-none hover:bg-foreground/90 transition-all text-sm"
                >
                  {loading ? "PROCESSING..." : `PLACE ORDER • ₹${cartTotal.toLocaleString()}`}
                </Button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-muted/30 p-8 sticky top-32">
                <h3 className="text-xl font-headline font-bold uppercase tracking-widest mb-8">Order Summary</h3>
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => {
                    const displayImage = item.images?.[0] || "https://picsum.photos/seed/placeholder/600/800";
                    return (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                        <Link 
                          href={`/product/${item.id}`}
                          className="relative w-16 h-20 bg-muted flex-shrink-0 hover:opacity-80 transition-opacity"
                        >
                          <Image src={displayImage} alt={item.name} fill className="object-cover" />
                        </Link>
                        <div className="flex-1 space-y-1">
                          <Link href={`/product/${item.id}`} className="hover:text-accent transition-colors">
                            <h4 className="text-xs font-bold uppercase tracking-tight">{item.name}</h4>
                          </Link>
                          <p className="text-[10px] text-muted-foreground uppercase font-medium">Qty: {item.quantity} • Size: {item.selectedSize}</p>
                          <p className="text-xs font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator className="mb-6" />
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-accent font-bold">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-background border space-y-2">
                    <Truck className="w-5 h-5 text-accent" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Safe Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-background border space-y-2">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
