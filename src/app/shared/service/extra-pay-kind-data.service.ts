import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { IExtraPayKind } from '../model/extra-pay-kind.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraPayKindDataService {
  private readonly MyCollectionName: string = "ExtraPayKinds";

  constructor(private afs: AngularFirestore) { 
  }

  getList() : Observable<DocumentChangeAction<IExtraPayKind>[]> {
    return this.afs.collection<IExtraPayKind>(this.MyCollectionName).snapshotChanges();
  }

  insert(aData: IExtraPayKind): void {
    aData.id = this.afs.createId();
    let doc: AngularFirestoreDocument<IExtraPayKind> = this.afs.
      collection<IExtraPayKind>(this.MyCollectionName).doc<IExtraPayKind>(aData.id);
    let obj: IExtraPayKind = Object.assign({}, aData);
    doc.set(obj);
  }

  update(aData: IExtraPayKind): void {
    let doc: AngularFirestoreDocument<IExtraPayKind> = this.afs.
      doc<IExtraPayKind>(`${this.MyCollectionName}/${aData.id}`);
    let obj: IExtraPayKind = Object.assign({}, aData);
    doc.update(obj);
  }

  delete(aId: string): void {
    let doc: AngularFirestoreDocument<IExtraPayKind> = this.afs.
      doc<IExtraPayKind>(`${this.MyCollectionName}/${aId}`);
    doc.delete();
  }
}
