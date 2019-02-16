
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';

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
import { LoginPageModule } from "../pages/login/login.module";
import { HttpClientModule} from "@angular/common/http";
import {InAppBrowser } from "@ionic-native/in-app-browser";
import {HttpModule} from "@angular/http";
import { CallApiProvider } from '../providers/call-api/call-api';

let storage = new Storage({});

@NgModule({
  declarations: [
    MyApp,
    HomePage,ModalContentPage,
    ModalContentPageAdd,ModalContentPageskip
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
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
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallApiProvider
  ]
})
export class AppModule {}
