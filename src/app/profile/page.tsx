
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { 
  User, 
  Settings, 
  Package, 
  Heart, 
  MapPin, 
  HelpCircle, 
  LogOut, 
  Camera,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        description: "We hope to see you back soon at Viloryi.",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again later.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isUserLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-muted" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") router.push("/");
    return null;
  }

  const profileSections = [
    {
      title: "Your Preferences",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Customize your style and fit details",
      href: "/profile/preferences",
    },
    {
      title: "My Orders",
      icon: <Package className="w-5 h-5" />,
      description: "Track and view your order history",
      href: "/profile/orders",
    },
    {
      title: "Wishlist",
      icon: <Heart className="w-5 h-5" />,
      description: "View your saved elegant pieces",
      href: "/profile/wishlist",
    },
    {
      title: "Manage Account & Address",
      icon: <MapPin className="w-5 h-5" />,
      description: "Update your delivery and contact details",
      href: "/profile/address",
    },
    {
      title: "Help Center",
      icon: <HelpCircle className="w-5 h-5" />,
      description: "FAQs, returns, and support",
      href: "/contact",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16 animate-fade-in">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-2 border-muted">
                <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                <AvatarFallback className="text-3xl font-headline">{user.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-background hover:bg-accent transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-headline font-bold text-primary">{user.displayName}</h1>
              <p className="text-muted-foreground font-light">{user.email}</p>
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold tracking-widest uppercase mt-2">
                Premium Member
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {profileSections.map((section, idx) => (
              <Link key={idx} href={section.href}>
                <Card className="rounded-none border-muted hover:border-accent transition-all group overflow-hidden">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-muted flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all">
                        {section.icon}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest">{section.title}</h3>
                        <p className="text-xs text-muted-foreground font-light">{section.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-muted animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="w-full md:w-auto min-w-[200px] rounded-none py-8 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 tracking-[0.2em] font-bold uppercase text-xs gap-3"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
