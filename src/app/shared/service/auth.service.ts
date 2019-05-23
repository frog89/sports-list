import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from  '@angular/fire/auth';
import { auth } from  'firebase/app';
import { Observable, of, ObservableInput } from  'rxjs';
import {
    DocumentChangeAction,
    AngularFirestoreDocument,
    AngularFirestore
} from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Player, IPlayer } from '../model/player.model';
import { PlayerDataService } from './player-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  player$: Observable<Player | null>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private playerDataService: PlayerDataService,
      private router: Router) {
    let mapFunction: ((value: firebase.User | null, index: number) => ObservableInput<Player | null>) = 
        (authUser: firebase.User | null, index: number) => {
      if (authUser) {
        return this.playerDataService.getByAuthId(authUser.uid);
      } else {
        return of(null);
      }
    };
    this.player$ = this.afAuth.authState.pipe(switchMap(mapFunction));
  }

  async googleSignIn() {    
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.player$ = of(null);
    return this.router.navigate(['/']);
  }

  private updateUserData(aUser: firebase.User | null) {
    if (aUser == null) {
      return;
    }
    this.playerDataService.getByAuthId(aUser.uid).subscribe(player => {
      this.player$ = of(player);
    });
  }
}
