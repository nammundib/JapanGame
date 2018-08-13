import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-guest',
  templateUrl: 'login-guest.html',
})
export class LoginGuestPage {
  name;
  data = [];
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public formBuilder: FormBuilder, 
    public navParams: NavParams) {
    this.name = this.formBuilder.group({
      title: ['', Validators.compose([
		  Validators.required,
		  Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginGuestPage');
  }

  openMenu(){
    //stage
    this.storage.get('stageTable').then((stageTable) => {
      if(stageTable != null){//have data its new
        this.data = stageTable;
        this.data.push({
          id : this.name.value.title,
          stage : "1-0"            
        });

      this.storage.set('stageTable',this.data);
      }else{//new
        this.data.push({
          id : this.name.value.title,
          stage : "1-0"            
        });

      this.storage.set('stageTable',this.data);
      }  
      console.log(this.data);
    });
           
    //score
    this.storage.get('scoreTable').then((scoreTable) => {
      if(scoreTable != null){
        let data1 = scoreTable;
        data1.push({
          id : this.name.value.title,
          stage : 1,
          substage : 1,
          score: 0            
        });

      this.storage.set('scoreTable',data1);
      }else{
        let data1 = [];
        data1.push({
          id : this.name.value.title,
          stage : 1,
          substage : 1,
          score: 0             
        });

      this.storage.set('scoreTable',data1);
      }  
    });

    //item
    this.storage.get('itemTable').then((itemTable) => {
      if(itemTable != null){
        let data1 = itemTable;
        data1.push({
          id : this.name.value.title,
          itemC : 2,
          itemS : 2,
          itemA : 2               
        });

      this.storage.set('itemTable',data1);
      }else{
        let data1 = [];
        data1.push({
          id : this.name.value.title,
          itemC : 2,
          itemS : 2,
          itemA : 2              
        });

      this.storage.set('itemTable',data1);
      }  
    });

    //  this.storage.get('id').then((id) => {
    //   if(id == null){
    //     console.log('Your name is', id);        
    //     this.navCtrl.push(LoginPage);    
    //   }else {
    //     console.log('Your name is', id); 
    //     this.navCtrl.setRoot(MenuPage);
    //   }
    // });
    this.storage.set('id', this.name.value.title);
    this.storage.set('type', "quest");
    this.storage.set('state', "1-0");
    this.navCtrl.push('MenuPage');
  }
}
