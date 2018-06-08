import { VocabPage } from './../vocab/vocab';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http,Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the ChaptersubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chaptersub',
  templateUrl: 'chaptersub.html',
})
export class ChaptersubPage {

  vocab;
  lesson;
  background;
  url = "http://159.65.142.130/api/getLesson/";
  state = '1';
  chater;
  readych = false;
  color;
  constructor(public navCtrl: NavController,
    public http:Http, public navParams: NavParams) {
    this.lesson = navParams.get('data');
    this.color = navParams.get('datacolor');
    if(this.lesson !== undefined){
      this.state = this.lesson;
    }
    this.getCall();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChaptervocabPage');
  }

  openchapter(){
    this.navCtrl.pop();
  }

  openmenu(){
    this.navCtrl.setRoot('MenuPage');
  }

  openvocab(vocab) {
    console.log(vocab);
    this.navCtrl.push('VocabPage',{
        data: vocab,
        color: this.color
      });
  }

  getCall(){
    let headers = new Headers(
    {
		  'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
    this.http.get(this.url + 1, options )
    .map(res=> res.json())
    .subscribe(data => {
        console.log(data);
        this.vocab = data;
        this.readych =true;
    resolve(data);
    },error => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
        });
    });
  }
}
