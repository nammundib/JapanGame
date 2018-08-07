import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginGuestPage } from '../login-guest/login-guest';
import { MenuPage } from '../menu/menu';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
cheackS = false;
  cheackQ = false;
  constructor(
    public storage: Storage,
    public navCtrl: NavController) {
    this.storage.get('id').then((id) => {
      if(id != null){
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


   openMenu(){
     if(!this.cheackS){
     this.storage.get('id').then((id) => {
      if(id == null){
        console.log('Your name is', id);        
        this.navCtrl.push('LoginGuestPage');    
      }else {
        console.log('Your name is', id); 
        this.navCtrl.push('MenuPage');
      }
    });  
    }else {
        this.navCtrl.push('MenuPage');
    }  

        // this.navCtrl.setRoot(LoginGuestPage);
    
  }

  openlogin(){  
    if(!this.cheackQ){
    this.storage.get('id').then((id) => {
      if(id == null){
        console.log('Your name is', id);        
        this.navCtrl.push('LoginPage');    
      }else {
        console.log('Your name is', id); 
        this.navCtrl.push('MenuPage');
      }
    });       
  }else {
        this.navCtrl.setRoot('MenuPage');    
  }
  }

}
