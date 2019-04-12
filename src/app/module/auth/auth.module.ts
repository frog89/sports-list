import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent
  ],
  imports: [
    AuthRoutingModule
  ],
  exports: [
  ],
  providers: []
})
export class AuthModule { }