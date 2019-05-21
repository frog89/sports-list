import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ISaison } from '../model/saison.model';

@Injectable({
  providedIn: 'root'
})
export class SaisonDataService {
  private readonly MyCollectionName: string = "Saisons";

  constructor(private afs: AngularFirestore) { }

  getList() : Observable<DocumentChangeAction<ISaison>[]> {
    return this.afs.collection<ISaison>(this.MyCollectionName).snapshotChanges();
  }

  insert(saison: ISaison): void {
    saison.id = this.afs.createId();
    let doc: AngularFirestoreDocument<ISaison> = this.afs.
      collection<ISaison>(this.MyCollectionName).doc<ISaison>(saison.id);
    let obj: ISaison = Object.assign({}, saison);
    doc.set(obj);
  }

  update(saison: ISaison): void {
    let doc: AngularFirestoreDocument<ISaison> = this.afs.
      doc<ISaison>(`${this.MyCollectionName}/${saison.id}`);
    let obj: ISaison = Object.assign({}, saison);
    doc.update(obj);
  }

  delete(aId: string): void {
    let doc: AngularFirestoreDocument<ISaison> = this.afs.
      doc<ISaison>(`${this.MyCollectionName}/${aId}`);
    doc.delete();
  }
}
