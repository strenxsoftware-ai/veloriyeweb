'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn, Star } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { signInWithGoogle } from '@/firebase/auth/google-auth';

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export const LoginDialog = ({ 
  isOpen, 
  onOpenChange, 
  title = "Join the Collection", 
  description = "Please sign in to add elegant pieces to your bag and wishlist."
}: LoginDialogProps) => {
  const auth = useAuth();
  const db = useFirestore();

  const handleLogin = async () => {
    if (!auth || !db) return;
    try {
      await signInWithGoogle(auth, db);
      onOpenChange(false);
    } catch (error) {
      // Errors are handled centrally via FirebaseErrorListener
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-background rounded-none border-none p-0 overflow-hidden">
        <div className="relative h-40 bg-primary flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 p-4 pointer-events-none">
             {[...Array(20)].map((_, i) => <Star key={i} className="w-8 h-8 text-white" />)}
          </div>
          <h2 className="text-4xl font-headline font-bold text-white tracking-widest relative z-10">VILORYI</h2>
        </div>
        
        <div className="p-8 space-y-8 text-center">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-headline font-bold tracking-tight text-primary">
              {title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-light italic leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>

          <Button 
            onClick={handleLogin}
            className="w-full bg-primary text-white py-7 rounded-none tracking-[0.2em] font-bold text-xs hover:bg-foreground/90 transition-all flex items-center justify-center gap-3"
          >
            <LogIn className="w-4 h-4" />
            SIGN IN WITH GOOGLE
          </Button>

          <p className="text-[10px] tracking-widest text-muted-foreground uppercase opacity-60">
            Timeless silhouettes • Modern minimalism
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
