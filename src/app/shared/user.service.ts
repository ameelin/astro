import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }


  addUser(user: any): Observable<any> {
    return from(this.firestore.collection('users').add(user));
  }
  

  checkUserExists(userId: string): Observable<boolean> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      map((doc) => (doc as DocumentSnapshot<any>).exists as boolean)
    );
  }

  checkBirthStarExists(userId: string): Observable<boolean> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      map((doc) => {
        const data = doc.data() as any;
        return !!data && data.birthStar !== undefined && data.birthStar !== null;
      })
    );
  }
  
}