import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
/**
 * Generated class for the VocabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vocab',
  templateUrl: 'vocab.html',
})
export class VocabPage {
  readyvo = false;
  vocab;
  color;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vocab = navParams.get('data');
    this.color = navParams.get('color');
    this.readyvo = true;
    console.log(this.vocab);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VocabPage');
  }

  openchapter(){
    this.navCtrl.pop();
  }

  openmenu(){
    this.navCtrl.setRoot('MenuPage');
  }

}
