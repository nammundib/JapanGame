import { CallApiProvider } from './../../providers/call-api/call-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public CallApiProvider:CallApiProvider,) {
    this.staticForSave = navParams.get('static');
    this.typeForSave = navParams.get('type');
    //static save    
    if(this.staticForSave !== undefined && this.staticForSave.length > 0){
      let staticVocab = [{
        "type": this.typeForSave,
        "mistake":this.staticForSave
      }]
      var callback = (result) =>{        
        console.log("saveStaticInDatabase: ",staticVocab);
      }
      this.CallApiProvider.getCallStaticSave(callback,staticVocab);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostPage');
  }

  openMap(){ 
    this.navCtrl.setRoot('MapPage');
  }

}
