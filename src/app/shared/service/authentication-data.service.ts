import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument, DocumentSnapshot } from 'angularfire2/firestore';
import { IAuthentication } from '../model/authentication.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {
  private readonly MyCollectionName: string = "Authentications";

  constructor(private afs: AngularFirestore) {
  }

  getByAuthId(aAuthId: string) : Observable<IAuthentication | undefined> {
    let doc: AngularFirestoreDocument<IAuthentication> = 
      this.afs.doc<IAuthentication>(`${this.MyCollectionName}/${aAuthId}`);
    return doc.valueChanges();
  }
}
