import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, QueryFn, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { IPlayer, Player } from '../model/player.model';
import { IAuthentication } from '../model/authentication.model';
import { take, map, mergeMap } from 'rxjs/operators';
import { AuthenticationDataService } from './authentication-data.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private readonly MyCollectionName: string = "Players";

  constructor(private afs: AngularFirestore,
    private authenticationDataService: AuthenticationDataService) { 
  }

  getList(aLoadInactive: boolean) : Observable<DocumentChangeAction<IPlayer>[]> {
    let queryFn: QueryFn | undefined = ref => ref.where('isActive', '==', true);
    if (aLoadInactive) {
      queryFn = undefined;
    }
    return this.afs.collection<IPlayer>(this.MyCollectionName, queryFn).snapshotChanges();
  }

  getByAuthId(aAuthId: string) : Observable<Player | null> {
    let playerObservable = (auth: IAuthentication | undefined) => {
      if (auth == undefined) {
        return of(null);
      }
      return this.afs.doc<IPlayer>(`${this.MyCollectionName}/${auth.playerId}`).valueChanges().pipe(
        map(dbPlayer => {
          if (dbPlayer == undefined)
            return null;
          return new Player(dbPlayer.id, dbPlayer);
        })
      );
    }

    return this.authenticationDataService.getByAuthId(aAuthId).pipe(
      mergeMap(playerObservable)
    );
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
