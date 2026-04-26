
"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useDoc, useMemoFirebase, errorEmitter, FirestorePermissionError } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 'success';

export default function PreferencesPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();
  
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    gender: "female",
    dob: "",
    topwearType: "",
    height: "",
    weight: "",
    shape: "",
    size: "",
    braSize: {
      band: "",
      cup: ""
    }
  });

  const userRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: userData } = useDoc(userRef);

  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: userData.displayName || prev.name,
        ...(userData.preferences || {})
      }));
    } else if (user?.displayName) {
      setFormData(prev => ({ ...prev, name: user.displayName || "" }));
    }
  }, [userData, user]);

  const nextStep = () => {
    setStep((prev) => (prev === 'success' ? 'success' : (prev as number) + 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep((prev) => (prev === 'success' ? 'success' : (prev as number) - 1) as Step);
  };

  const handleSave = () => {
    if (!userRef) return;
    setLoading(true);
    
    const updateData = {
      displayName: formData.name,
      preferences: {
        gender: formData.gender,
        dob: formData.dob,
        topwearType: formData.topwearType,
        height: formData.height,
        weight: formData.weight,
        shape: formData.shape,
        size: formData.size,
        braSize: formData.braSize
      }
    };

    // Non-blocking update per guidelines
    updateDoc(userRef, updateData)
      .catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: userRef.path,
          operation: 'update',
          requestResourceData: updateData
        }));
      });
    
    // Optimistic UI update
    setTimeout(() => {
      setStep('success');
      setLoading(false);
    }, 500);
  };

  if (isUserLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-full" />
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Basic Details</h2>
              <p className="text-muted-foreground text-sm">Let's start with the basics to personalize your profile.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Your Full Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-none h-12 border-muted"
                  placeholder="E.g. Monika Sharma"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Gender</Label>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(v) => setFormData({...formData, gender: v})}
                  className="flex gap-4"
                >
                  <Label className="flex-1 flex items-center justify-between p-4 border border-muted cursor-pointer hover:border-accent transition-all">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="female" id="female" />
                      <span className="text-sm font-medium">Female</span>
                    </div>
                  </Label>
                  <Label className="flex-1 flex items-center justify-between p-4 border border-muted cursor-pointer hover:border-accent transition-all">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="male" id="male" />
                      <span className="text-sm font-medium">Male</span>
                    </div>
                  </Label>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Date of Birth</Label>
                <Input 
                  type="date"
                  value={formData.dob} 
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="rounded-none h-12 border-muted"
                />
              </div>
            </div>
            <Button onClick={nextStep} className="w-full h-14 rounded-none tracking-widest font-bold uppercase text-xs">
              NEXT <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Style Preferences</h2>
              <p className="text-muted-foreground text-sm">What type of topwear do you prefer wearing more often?</p>
            </div>
            <div className="space-y-4">
              {["Kurtas", "Tops", "Dresses"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({...formData, topwearType: type})}
                  className={cn(
                    "w-full p-6 text-left border transition-all flex justify-between items-center group",
                    formData.topwearType === type ? "border-accent bg-accent/5" : "border-muted hover:border-accent/40"
                  )}
                >
                  <span className="font-headline text-lg">{type}</span>
                  {formData.topwearType === type && <CheckCircle2 className="w-5 h-5 text-accent" />}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-none tracking-widest font-bold uppercase text-xs">
                BACK
              </Button>
              <Button 
                disabled={!formData.topwearType}
                onClick={nextStep} 
                className="flex-[2] h-14 rounded-none tracking-widest font-bold uppercase text-xs"
              >
                CONTINUE <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Body Details</h2>
              <p className="text-muted-foreground text-sm">Providing accurate measurements helps us suggest the best fit.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Height (cms or ft)</Label>
                <Input 
                  value={formData.height} 
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className="rounded-none h-12 border-muted"
                  placeholder="e.g. 165 cms or 5'5\"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Weight (kgs)</Label>
                <Input 
                  value={formData.weight} 
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  className="rounded-none h-12 border-muted"
                  placeholder="e.g. 60 kgs"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-none tracking-widest font-bold uppercase text-xs">
                BACK
              </Button>
              <Button onClick={nextStep} className="flex-[2] h-14 rounded-none tracking-widest font-bold uppercase text-xs">
                CONTINUE <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Your Shape</h2>
              <p className="text-muted-foreground text-sm">Which shape of topwear do you choose most often?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["A-Line", "Anarkali", "Pathani", "Straight"].map((shape) => (
                <button
                  key={shape}
                  onClick={() => setFormData({...formData, shape: shape})}
                  className={cn(
                    "p-6 text-center border transition-all space-y-2 group",
                    formData.shape === shape ? "border-accent bg-accent/5" : "border-muted hover:border-accent/40"
                  )}
                >
                  <div className="w-full aspect-[3/4] bg-muted mb-4 group-hover:bg-muted/50 transition-colors" />
                  <span className="font-bold tracking-widest uppercase text-[10px]">{shape}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-none tracking-widest font-bold uppercase text-xs">
                BACK
              </Button>
              <Button 
                disabled={!formData.shape}
                onClick={nextStep} 
                className="flex-[2] h-14 rounded-none tracking-widest font-bold uppercase text-xs"
              >
                CONTINUE <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-primary">Sizing</h2>
              <p className="text-muted-foreground text-sm">What is your typical size for topwear?</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFormData({...formData, size: size})}
                  className={cn(
                    "h-14 flex items-center justify-center border text-xs font-bold transition-all",
                    formData.size === size 
                      ? "border-primary bg-primary text-white" 
                      : "border-muted hover:border-accent"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-none tracking-widest font-bold uppercase text-xs">
                BACK
              </Button>
              <Button 
                disabled={!formData.size}
                onClick={nextStep} 
                className="flex-[2] h-14 rounded-none tracking-widest font-bold uppercase text-xs"
              >
                CONTINUE <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-headline font-bold text-primary">Fit Details</h2>
                <span className="text-[10px] bg-muted px-2 py-1 tracking-widest font-bold uppercase">Optional</span>
              </div>
              <p className="text-muted-foreground text-sm">What size of bra do you wear?</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Band Size</Label>
                <div className="flex flex-wrap gap-2">
                  {["28", "30", "32", "34", "36", "38", "40", "44"].map((band) => (
                    <button
                      key={band}
                      onClick={() => setFormData({...formData, braSize: {...formData.braSize, band: band}})}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center border text-xs font-bold transition-all",
                        formData.braSize.band === band 
                          ? "border-primary bg-primary text-white" 
                          : "border-muted hover:border-accent"
                      )}
                    >
                      {band}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-[10px] tracking-widest font-bold uppercase">Cup Size</Label>
                <div className="flex flex-wrap gap-2">
                  {["A", "B", "C", "D", "E", "F"].map((cup) => (
                    <button
                      key={cup}
                      onClick={() => setFormData({...formData, braSize: {...formData.braSize, cup: cup}})}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center border text-xs font-bold transition-all",
                        formData.braSize.cup === cup 
                          ? "border-primary bg-primary text-white" 
                          : "border-muted hover:border-accent"
                      )}
                    >
                      {cup}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={prevStep} className="flex-1 h-14 rounded-none tracking-widest font-bold uppercase text-xs">
                BACK
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="flex-[2] h-14 rounded-none tracking-widest font-bold uppercase text-xs bg-accent hover:bg-accent/90"
              >
                {loading ? "SAVING..." : "SAVE PREFERENCES"} <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="py-12 space-y-8 text-center animate-fade-in flex flex-col items-center">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4 scale-110 animate-pulse">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-headline font-bold text-primary">All Set!</h2>
              <p className="text-muted-foreground font-light text-lg italic max-w-sm">
                "Your style profile has been updated. We'll use this to curate the perfect Viloryi collection just for you."
              </p>
            </div>
            <Button 
              onClick={() => router.push("/profile")}
              className="mt-8 px-12 h-14 rounded-none tracking-[0.3em] font-bold uppercase text-xs"
            >
              GO TO MY PROFILE <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
    }
  };

  const progress = typeof step === 'number' ? (step / 6) * 100 : 100;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-lg">
          {step !== 'success' && (
            <div className="mb-12 space-y-4">
              <div className="flex justify-between items-center text-[10px] tracking-widest font-bold uppercase opacity-60">
                <span>Personalizing Your Experience</span>
                <span>Step {step} of 6</span>
              </div>
              <Progress value={progress} className="h-1 rounded-none bg-muted" />
            </div>
          )}

          <div className="bg-white p-8 md:p-12 shadow-sm border border-muted min-h-[500px] flex flex-col justify-center">
            {renderStep()}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
