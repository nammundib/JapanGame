import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuPage} from '../menu/menu';

import { ChapterPage } from '../chapter/chapter';

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  openMenu(){  
      this.navCtrl.setRoot('MenuPage');
  }

  openLessonsub(lesson){
    this.navCtrl.push('ChapterPage',{
      data: lesson
    });
  }
}
