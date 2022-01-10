import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
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
import { StatusData } from '../interfaces/status.interface';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: Firestore) {
  }

  public getStatusList(firstId: string, lastId: string, pageSize: number): Observable<StatusData[]> {
    debugger;
    let q = query<StatusData>(
      collection(this.afs, `servers`) as CollectionReference<StatusData>,
      orderBy('id'),
    );

    if (firstId) {
      q = query(q,
        startAfter(lastId),
        limit(pageSize)
      )
    }

    return collectionData<StatusData>(q);
  }
}
