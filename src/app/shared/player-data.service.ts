import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, QueryFn, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { IPlayer } from './model/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private readonly MyCollectionName: string = "Players";

  constructor(private afs: AngularFirestore) { }

  getList(aLoadInactive: boolean) : Observable<DocumentChangeAction<IPlayer>[]> {
    let queryFn: QueryFn | undefined = ref => ref.where('isActive', '==', true);
    if (aLoadInactive) {
      queryFn = undefined;
    }
    return this.afs.collection<IPlayer>(this.MyCollectionName, queryFn).snapshotChanges();
  }

  insert(player: IPlayer): void {
    player.id = this.afs.createId();
    let doc: AngularFirestoreDocument<IPlayer> = this.afs.
      collection<IPlayer>(this.MyCollectionName).doc<IPlayer>(player.id);
    let obj: IPlayer = Object.assign({}, player);
    doc.set(obj);
  }

  update(player: IPlayer): void {
    let doc: AngularFirestoreDocument<IPlayer> = this.afs.
      doc<IPlayer>(`${this.MyCollectionName}/${player.id}`);
    let obj: IPlayer = Object.assign({}, player);
    doc.update(obj);
  }

  delete(aId: string): void {
    let doc: AngularFirestoreDocument<IPlayer> = this.afs.
      doc<IPlayer>(`${this.MyCollectionName}/${aId}`);
    doc.delete();
  }

}
