import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { IExtraPay } from '../model/extra-pay.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraPayDataService {
  private readonly MyCollectionName: string = "ExtraPays";

  constructor(private afs: AngularFirestore) { 
  }

  getList(aPlayDayId: string) : Observable<DocumentChangeAction<IExtraPay>[]> {
    let queryFn: QueryFn = ref => ref.where('playDayId', '==', aPlayDayId);
    return this.afs.collection<IExtraPay>(this.MyCollectionName, queryFn).snapshotChanges();
  }

  insert(aData: IExtraPay): void {
    aData.id = this.afs.createId();
    let doc: AngularFirestoreDocument<IExtraPay> = this.afs.
      collection<IExtraPay>(this.MyCollectionName).doc<IExtraPay>(aData.id);
    let obj: IExtraPay = Object.assign({}, aData);
    doc.set(obj);
  }

  update(aData: IExtraPay): void {
    let doc: AngularFirestoreDocument<IExtraPay> = this.afs.
      doc<IExtraPay>(`${this.MyCollectionName}/${aData.id}`);
    let obj: IExtraPay = Object.assign({}, aData);
    doc.update(obj);
  }

  delete(aId: string): void {
    let doc: AngularFirestoreDocument<IExtraPay> = this.afs.
      doc<IExtraPay>(`${this.MyCollectionName}/${aId}`);
    doc.delete();
  }
}
