import { ChaptersubPage } from './../chaptersub/chaptersub';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { HttpClient } from "@angular/common/http";
import { Http } from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {MenuPage} from '../menu/menu';
import { LessonPage } from '../lesson/lesson';
/**
 * Generated class for the ChapterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  lesson;
  url = "http://159.65.142.130/api/getLesson/"
  state = '1';
  chapterone = [
    {   "color" :"pink",
        "chapter" : [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10'
        ]
    },
      { "color" :"orange",
        "chapter" : [
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20'
        ]
    
    }
  ];
  chaptertwo = [
      {   "color" :"yellow",
          "chapter" : [
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '38',
            '39'
          ]
    },
        { "color" :"green",
          "chapter" : [
            '40',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '47',
            '48',
            '49',
            '50',
            '51',
            '52',
            '53',
            '54'
          ]
      
    }
  ];
  chapterthree = [
    {   "color" :"darkgreen",
        "chapter" : [
          '55',
          '56',
          '57',
          '58',
          '59',
          '60',
          '61',
          '62',
          '63',
          '64',
          '65',
          '66',
          '67',
          '68',
          '69',
          '70',
          '71',
          '72',
          '73'
        ]
    },
      { "color" :"blue",
        "chapter" : [
          '74',
          '75',
          '76',
          '77',
          '78',
          '79',
          '80',
          '81',
          '82',
          '83',
          '84',
          '85',
          '86',
          '87'
        ]
    
    }
  ];
  chapterfour = [
    {   "color" :"darkblue",
        "chapter" : [
          '88',
          '89',
          '90',
          '91',
          '92',
          '93',
          '94',
          '95',
          '96',
          '97',
          '98',
          '99',
          '100',
          '101',
          '102',
          '103',
          '104'
        ]
    },
      { "color" :"violet",
        "chapter" : [
          '105',
          '106',
          '107',
          '108',
          '109',
          '110',
          '111',
          '112',
          '113',
          '114',
          '115',
          '116',
          '117',
          '118',
          '119'
        ]
    
    }
  ];
  datal;
  constructor(public navCtrl: NavController, 
    
    public http:Http,public navParams: NavParams) {
      this.datal = navParams.get('data');
      if(this.datal == 1){
        this.lesson= this.chapterone;
      }else if (this.datal == 2){
        this.lesson= this.chaptertwo;        
      }else if (this.datal == 3){
        this.lesson= this.chapterthree;        
      }else if (this.datal == 4){
        this.lesson= this.chapterfour;        
      }
  }

  openlesson(){
      this.navCtrl.pop();
  }

  openmenu(){
    this.navCtrl.setRoot('MenuPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChapterPage');
  }

  openchapter(lesson,color){
    this.state = lesson;
    console.log(color);
    // this.getCall();
    //loading
    this.navCtrl.push('ChaptersubPage',{
        data: lesson,
        datacolor: color
      });
  }

  openMenu(){  
      this.navCtrl.setRoot('MenuPage');
  }

  // getCall(){
  //   let headers = new Headers(
  //   {
	// 	  'Content-Type': 'application/json'
  //   });
  //   let options = new RequestOptions({ headers: headers });

  //   return new Promise((resolve, reject) => {
  //   this.http.get(this.url + this.state, options )
  //   .map(res=> res.json())
  //   .subscribe(data => {
  //       console.log(data);
  //       this.chater = data;
  //   resolve(data);
  //   },error => {
  //       console.error('API Error : ', error.status);
  //       console.error('API Error : ', JSON.stringify(error));
  //       reject(error.json());
  //       });
  //   });
  // }

}
