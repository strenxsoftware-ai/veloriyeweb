
'use client';

import { GoogleAuthProvider, signInWithPopup, Auth } from 'firebase/auth';
import { doc, setDoc, Firestore, serverTimestamp } from 'firebase/firestore';

export async function signInWithGoogle(auth: Auth, db: Firestore) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Sync user data to Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp(),
    }, { merge: true });

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}
