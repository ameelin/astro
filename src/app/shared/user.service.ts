import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  editUser(user: any): Observable<any> {
    const { userId, ...userData } = user;
    
    // Find the document ID based on the userId
    return this.findDocIdByUserId(userId).pipe(
      switchMap((docId) => {
        if (docId) {
          // Update the document with the provided userData
          return from(this.firestore.collection('users').doc(docId).update(userData));
        } else {
          throw new Error('Document with the provided userId not found.');
        }
      })
    );
  }

  findDocIdByUserId(userId: string): Observable<string | null> {
    const usersRef = this.firestore.collection('users');
    return from(
      usersRef
        .ref.where('userId', '==', userId)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            return null; // Document with the provided userId not found.
          }
          return querySnapshot.docs[0].id;
        })
    );
  }


  checkUserExists(userId: string): Observable<boolean> {
    return this.firestore.collection('users', (ref) => ref.where('userId', '==', userId)).get().pipe(
      map((querySnapshot) => !querySnapshot.empty)
    );
  }

  checkBirthStarExists(userId: string): Observable<boolean> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      map((doc) => {
        const data = doc.data() as { birthStar: any }; // Type assertion to specify the expected data shape
        return !!data && 'birthStar' in data && data.birthStar !== null;
      })
    );
  }
  
}