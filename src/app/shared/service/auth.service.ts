import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from  '@angular/fire/auth';
import { auth } from  'firebase/app';
import { Player } from '../model/player.model';
import { PlayerDataService } from './player-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInPlayer: Player | null = null;

  constructor(
      private afAuth: AngularFireAuth,
      private playerDataService: PlayerDataService,
      private router: Router,
      public ngZone: NgZone) {
    this.afAuth.authState.subscribe(authUser => {
      if (authUser == null) {
        return;
      }
      this.playerDataService.getByAuthId(authUser.uid).subscribe(player => {
        this.loggedInPlayer = player;
      });  
    });
  }

  private updateUserData(aUser: firebase.User | null, navigationTarget?: string) {
    if (aUser == null) {
      return;
    }
    this.playerDataService.getByAuthId(aUser.uid).subscribe(player => {
      this.loggedInPlayer = player;
      if (player != null) {
        player.email = aUser.email;
        this.playerDataService.update(player);
      }
      if (navigationTarget != undefined) {
        this.ngZone.run(() => {
          this.router.navigate([navigationTarget]);
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    if (this.loggedInPlayer != null)
      return true;
    return false;
  }

  SignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserData(result.user, "playday-table");
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.updateUserData(result.user, 'verify-email-address');
        this.SendVerificationMail();
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    if (this.afAuth.auth.currentUser == null) {
      return;
    }
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }
  
  // Auth logic to run auth providers
  AuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.updateUserData(result.user, 'playday-table');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.loggedInPlayer = null;
      this.router.navigate(['login']);
    })
  }


}
