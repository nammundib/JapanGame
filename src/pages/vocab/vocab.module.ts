import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocabPage } from './vocab';

@NgModule({
  declarations: [
    VocabPage,
  ],
  imports: [
    IonicPageModule.forChild(VocabPage),
  ],
})
export class VocabPageModule {}
