import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginGuestPage } from './login-guest';

@NgModule({
  declarations: [
    LoginGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginGuestPage),
  ],
})
export class LoginGuestPageModule {}
