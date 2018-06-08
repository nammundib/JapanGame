import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndonePage } from './endone';

@NgModule({
  declarations: [
    EndonePage,
  ],
  imports: [
    IonicPageModule.forChild(EndonePage),
  ],
})
export class EndonePageModule {}
