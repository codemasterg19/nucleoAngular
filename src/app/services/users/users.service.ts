import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  loadUserinFirebase(){
    const user = this.authService.getCurrentUser();
    if(!user) return;
    const userRef = doc(this.firestore, `users/${user.uid}`);
    setDoc(userRef,{
      email: user.email,
      photoUrl: user.photoURL,
      displayname: user.displayName,
      role: "user"
    }, {merge:true})
  }
}
