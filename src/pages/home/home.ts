import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {LoginGuestPage} from '../login-guest/login-guest';
import {MenuPage} from '../menu/menu';

import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cheackS = false;
  cheackQ = false;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    private  http: HttpClient) {
    this.storage.get('id').then((id) => {
      if (id != null) {
        this.cheackS = true;
        this.cheackQ = true;
      }
    });

    // this.storage.get('name').then((name) => {
    //   if(name != null){   
    //     this.cheackQ = true; 
    //   }
    // });
  }


  openMenu() {
    if (!this.cheackS) {
      this.storage.get('id').then((id) => {
        if (id == null) {
          console.log('Your name is', id);
          this.navCtrl.push('LoginGuestPage');
        } else {
          console.log('Your name is', id);
          this.navCtrl.push('MenuPage');
        }
      });
    } else {
      this.navCtrl.push('MenuPage');
    }

    // this.navCtrl.setRoot(LoginGuestPage);

  }

//
  openlogin() {
    if (!this.cheackQ) {
      this.storage.get('id').then((id) => {
        console.log('Your name is', id);
        if (id == null) {
          console.log('Your name is', id);
          this.navCtrl.push('LoginPage');
        } else {
          console.log('Your name is', id);
          this.navCtrl.push('MenuPage');
        }
      });
    } else {
      this.navCtrl.setRoot('MenuPage');
    }
  }

  getParam(name) {
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
      return 0;
    }
    return results[1] || 0;
  }

  //*/

//new openlogin
  /*/    openlogin(){
      if(!this.cheackQ){
      this.storage.get('type').then((type) => {
        console.log('Your type is', type);
        console.log(type === "quest");
        if(type == null){
        //  console.log('Your name is', id);
          this.navCtrl.push('LoginPage');
        }else if (type === "quest"){
        //  console.log('Your name is', id);
          this.navCtrl.push('LoginPage');
        }
        else {
          console.log('Your type is', type);
          this.navCtrl.push('MenuPage');
        }
      });
    }else {
          this.navCtrl.setRoot('MenuPage');
    }
  }
   */

}
