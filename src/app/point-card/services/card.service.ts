import { Injectable } from '@angular/core';
import { first, map, take } from 'rxjs/operators';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
  endAt,
  endBefore,
  limitToLast,
  startAfter,
} from '@angular/fire/firestore';
import { limit, orderBy, setDoc, startAt } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private afs: Firestore, private auth: Auth) { }

  public loadAllCards(): Observable<any[]> {
    let q = query<any>(
      collection(this.afs, `cards`) as CollectionReference<any>,
      where('email', '==', this.auth.currentUser?.email)
    );
    return collectionData<any>(q);
  }

  public loadCardByEmail(email: string): Observable<any> {
    let q = query<any>(
      collection(this.afs, `cards`) as CollectionReference<any>,
      where('user-email', '==', email),
      where('owner-email', '==', this.auth.currentUser?.email)
    );
    return collectionData<any>(q).pipe(first());
  }
}
