import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { PlaygamePage } from './../playgame/playgame';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  id;
  fullname;
  firstname;
  lastname;
  type;
  name;
  typeR;
  state;
  readypro = false;
  statenum;
  substate;
  scoreTable = [];
  totalscore = 0;
  statetext;
  login = false;
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    public navParams: NavParams) {
      
  }

  setLastStage(state){
    if(state == "1-0"){  
      this.statenum = 1;
      
        this.substate = 1;
      
    }else if(state == "1-1"){
      this.statenum = 1;
      
        this.substate = 1;
      
    }else if(state == "1-2"){
      this.statenum = 1;
      
        this.substate = 2;
      
    }else if(state == "1-3"){
      this.statenum = 1;
      
        this.substate = 3;
      
    }else if(state == "2-1"){
      this.statenum = 2;
      
        this.substate = 1;
      
    }else if(state == "2-2"){
      this.statenum = 2;
      
        this.substate = 2;
      
    }else if(state == "2-3"){
      this.statenum = 2;
      
        this.substate = 3;
      
    }else if(state == "3-1"){
      this.statenum = 3;
      
        this.substate = 1;
      
    }else if(state == "3-2"){
      this.statenum = 3;
      
        this.substate = 2;
      
    }else if(state == "3-3"){
      this.statenum = 3;
      
        this.substate = 3;
      
    }else if(state == "4-1"){
      this.statenum = 4;
      
        this.substate = 1;
      
    }else if(state == "4-2"){
      this.statenum = 4;
      
        this.substate = 2;
      
    }else if(state == "4-3"){
      this.statenum = 4;
      
        this.substate = 3;
      
    }else if(state == "5-1"){
      this.statenum = 5;
      
        this.substate = 1;
      
    }else if(state == "5-2"){
      this.statenum = 5;
      
        this.substate = 2;
      
    }else if(state == "5-3"){
      this.statenum = 5;
      
        this.substate = 3;
      
    }else if(state == "6-1"){
      this.statenum = 6;
      
        this.substate = 1;
      
    }else if(state == "6-2"){
      this.statenum = 6;
      
        this.substate = 2;
      
    }else if(state == "6-3"){
      this.statenum = 6;
      
        this.substate = 3;
      
    }else if(state == "7-1"){
      this.statenum = 7;
      
        this.substate = 1;
      
    }else if(state == "7-2"){
      this.statenum = 7;
      
        this.substate = 2;
      
    }else if(state == "7-3"){
      this.statenum = 7;
      
        this.substate = 3;
      
    }else if(state == "8-1"){
      this.statenum = 8;
      
        this.substate = 1;
      
    }else if(state == "8-2"){
      this.statenum = 8;
      
        this.substate = 2;
      
    }else if(state == "8-3"){
      this.statenum = 8;
      
        this.substate = 3;
      
    }
  
  }
  
  ionViewWillEnter(){

    let idCode;
    this.storage.get('id').then((id)=> {
      idCode = id;
    });

    this.storage.get('stageTable').then((stageTable)=> {      
       for(let i = 0; i < stageTable.length;i++){
        if(stageTable[i].id == idCode){
          this.state = stageTable[i].stage;
          if(this.state == "1-0"){
            this.statetext = "Begin";
          }else{
            this.statetext = this.state;
          }
        }
      }
      console.log(this.state);

    });

    this.storage.get('type').then((type)=> {
      if(type == "student"){
        this.type = true;
        this.login = true;
        this.typeR = "student";
      }
    });

    this.storage.get('id').then((id)=> {
      this.name = id;
    });

    this.storage.get('id').then((id)=> {
      this.id = id;
    });

    this.storage.get('fullname').then((fullname)=> {
      this.fullname = fullname;
    }); 
    
    this.storage.get('firstname').then((firstname)=> {
      this.firstname = firstname;
    });

    this.storage.get('lastname').then((lastname)=> {
      this.lastname = lastname;
    });

    this.storage.get('scoreTable').then((scoreTable)=> {      
       for(let i = 0; i < scoreTable.length;i++){
        if(scoreTable[i].id == idCode){
          
            if(scoreTable[i].score != 0){
              this.scoreTable.push({
                stage : scoreTable[i].stage,
                substage : scoreTable[i].substage,
                score : scoreTable[i].score            
              });

            this.totalscore = this.totalscore + scoreTable[i].score ;
          }
          
          
        }
      }

    });

    this.readypro = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openMenu(){
    this.navCtrl.pop();
  }

  loginCMU(){
    this.navCtrl.push('LoginPage');
  }

  openMap(stage,substage){
    console.log(stage);
    console.log(substage);
    // this.setLastStage(state);
    this.navCtrl.setRoot('PlaygamePage',{
      substate: substage,
      state: stage
    });
  }

  logout(){
    this.storage.remove('type').then(() => {
      console.log('type has been removed');  
    });
   
    this.storage.remove('staticTable').then(() => {
      console.log('staticTable has been removed');  
    });
    this.storage.remove('vocabTable').then(() => {
      console.log('staticTable has been removed');  
    });
    this.storage.remove('id').then(() => {
      console.log('name has been removed');    
      this.navCtrl.setRoot(HomePage);
    });
    // this.storage.clear().then(() => {
    //   console.log('Keys have been cleared');
    // });
    
  }
}
