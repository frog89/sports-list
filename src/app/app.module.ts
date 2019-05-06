import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { AuthModule } from './module/auth/auth.module';
import { PlaydayModule } from './module/playday/playday.module';
import { MatNativeDateModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, ErrorStateMatcher } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayerModule } from './module/player/player.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppErrorStateMatcher } from './shared/AppErrorStateMatcher';

export const firebaseConfig = {
  apiKey: "AIzaSyDMXN49jxDCU5ESKnT36a9Su2xxIz6XBqA",
  authDomain: "first-firebase-app-8ea15.firebaseapp.com",
  databaseURL: "https://first-firebase-app-8ea15.firebaseio.com",
  projectId: "first-firebase-app-8ea15",
  storageBucket: "first-firebase-app-8ea15.appspot.com",
  messagingSenderId: "1026345654437"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    PlaydayModule,
    PlayerModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: AppErrorStateMatcher }
  ],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
