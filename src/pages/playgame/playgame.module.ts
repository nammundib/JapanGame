import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaygamePage } from './playgame';

@NgModule({
  declarations: [
    PlaygamePage
  ],
  imports: [
    IonicPageModule.forChild(PlaygamePage),
  ],
})
export class PlaygamePageModule {}
