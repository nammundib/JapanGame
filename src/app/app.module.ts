
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { MapPage } from '../pages/map/map';
import { LessonPage } from '../pages/lesson/lesson';
import { DictionaryPage } from '../pages/dictionary/dictionary';
import { LoginPage } from '../pages/login/login';
import { LoginGuestPage } from '../pages/login-guest/login-guest';
import { PlaygamePage } from '../pages/playgame/playgame';
import { EndsubonePage } from '../pages/endsubone/endsubone';
import { EndonePage,ModalContentPage,ModalContentPageAdd,ModalContentPageskip } from '../pages/endone/endone';
import { LostPage } from '../pages/lost/lost';
import { ProfilePage } from '../pages/profile/profile';
import { ChapterPage } from '../pages/chapter/chapter';
import { ChaptersubPage } from './../pages/chaptersub/chaptersub';
import { VocabPage } from '../pages/vocab/vocab';
import { CreditPage } from '../pages/credit/credit';

let storage = new Storage({});

@NgModule({
  declarations: [
    MyApp,
    HomePage,ModalContentPage,
    ModalContentPageAdd,ModalContentPageskip
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,ModalContentPage
    ,ModalContentPageAdd,ModalContentPageskip
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
