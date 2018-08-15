import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { MapPage } from '../map/map';
/**
 * Generated class for the LostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {
  
  staticForSave;
  typeForSave;
  urlStatic = 'http://159.65.142.130/api/setVocabMistake/';

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,) {
    this.staticForSave = navParams.get('static');
    this.typeForSave = navParams.get('type');
    //static save    
    if(this.staticForSave !== undefined && this.staticForSave.length > 0){
      let staticVocab = [{
        "type": this.typeForSave,
        "mistake":this.staticForSave
      }]
      this.getCallStaticSave(staticVocab);
      console.log("saveStaticInDatabase: ",staticVocab);
    }
  }

  getCallStaticSave(staticVocab) {
        let headers = new Headers(
        {'Content-Type': 'application/json' 
    });
    let options = new RequestOptions({ headers: headers });    
    let postParams = {
        params :{
          content: staticVocab,
      }
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.urlStatic,postParams,options)
      .toPromise()
      .then((response) =>
      {
        console.log('API Response : ', response.json());
        resolve(response.json());

      })
      .catch((error) =>
      {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        this.getCallStaticSave(staticVocab);
        reject(error.json());
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostPage');
  }

  openMap(){ 
    this.navCtrl.setRoot('MapPage');
  }

}
