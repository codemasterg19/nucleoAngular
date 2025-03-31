import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async loadUserInFirebase() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
  
    const userRef = doc(this.firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);
  
    if (userSnap.exists()) return;
  
    await setDoc(userRef, {
      email: user.email,
      photoURL: user.photoURL || 'https://via.placeholder.com/120?text=User', // imagen por defecto
      displayName: user.displayName || user.email?.split('@')[0], // nombre por defecto
      role: "user"
    });
  }
  

  getCurrentUser(){
    const user = this.authService.getCurrentUser();
    if (!user) return null;
    const userRef = doc(this.firestore, "users", user.uid);
    return getDoc(userRef).then(doc => doc.data());
  }
}
