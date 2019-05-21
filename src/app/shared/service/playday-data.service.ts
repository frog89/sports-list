import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction, DocumentReference, SetOptions } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { PlayDay, IPlayDay } from 'src/app/shared/model/playday.model';

@Injectable({
  providedIn: 'root'
})
export class PlaydayDataService {
  private readonly MyCollectionName: string = "PlayDays";

  constructor(private afs: AngularFirestore) { }

  getList() : Observable<DocumentChangeAction<IPlayDay>[]> {
    return this.afs.collection<PlayDay>(this.MyCollectionName).snapshotChanges();
  }

  getOne(aId: string) : Observable<DocumentChangeAction<IPlayDay>[]> {
    return this.afs.collection<PlayDay>(this.MyCollectionName, 
      ref => ref.where('id', '==', aId)).snapshotChanges();
  }

  insert(playday: IPlayDay): void {
    playday.id = this.afs.createId();
    let doc: AngularFirestoreDocument<IPlayDay> = this.afs.
      collection<IPlayDay>(this.MyCollectionName).doc<IPlayDay>(playday.id);
    let obj: IPlayDay = Object.assign({}, playday);
    doc.set(obj);
  }

  update(playday: IPlayDay): void {
    let doc: AngularFirestoreDocument<IPlayDay> = this.afs.
      doc<IPlayDay>(`${this.MyCollectionName}/${playday.id}`);
    let obj: IPlayDay = Object.assign({}, playday);
    doc.update(obj);
  }

  delete(aId: string): void {
    let doc: AngularFirestoreDocument<IPlayDay> = this.afs.
      doc<IPlayDay>(`${this.MyCollectionName}/${aId}`);
    doc.delete();
  }
}
