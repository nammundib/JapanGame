import { CallApiProvider } from './../../providers/call-api/call-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaygamePage } from './../playgame/playgame';
import { EndonePage } from './../endone/endone';
import { MenuPage } from '../menu/menu';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EndsubonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endsubone',
  templateUrl: 'endsubone.html',
})
export class EndsubonePage {
  totalscore;
  score;
  state;
  substate;
  textwin = " "+ "がんばりましょう。";
  foot;
  data;
  idCode;
  stagestore;
  lastStage;
  stageTable;
  scoreTable;
  staticForSave;
  typeForSave;

  constructor(public navCtrl: NavController, public storage: Storage,public navParams: NavParams,public CallApiProvider:CallApiProvider,
        ) {
    this.data = navParams.get('data');
    this.state = navParams.get('state');
    this.substate = navParams.get('substate');
    this.score = navParams.get('score');
    this.totalscore = navParams.get('totalscore');
    this.lastStage =navParams.get('lastStage');
    this.staticForSave = navParams.get('static');
    this.typeForSave = navParams.get('type');
    console.log("end state"+ this.state);
    console.log("end state"+ this.lastStage);
    console.log("end score"+ this.score);
    console.log("end total"+ this.totalscore);
    console.log("end data"+ this.data);    
  }

  ionViewWillEnter(){ 
    this.storage.get('id').then((id)=> {
          this.idCode = id;
        });
    if(typeof this.lastStage != 'undefined'){

      if(this.lastStage <= this.state){
        console.log("GGGG");
          
      
      this.storage.get('stageTable').then((stageTable)=> {
        this.stageTable = stageTable;
        console.log(this.stageTable);
        
        for(let i = 0; i < stageTable.length;i++){
          if(stageTable[i].id == this.idCode){
            this.stageTable[i].stage = this.state+"-"+(this.substate-1);
          }
        }
          
        console.log(this.stageTable);
        this.storage.set('stageTable', this.stageTable);
        });

      }
    }

    //score
    let checkscore = 0;
    this.storage.get('scoreTable').then((scoreTable)=> {
      this.scoreTable = scoreTable;    
      if(scoreTable != null){
        if(typeof this.score !== 'undefined'){    
          for(let i = 0; i < scoreTable.length;i++){
            if(scoreTable[i].id == this.idCode){
                if(scoreTable[i].stage == this.state){
                  if(scoreTable[i].substage == (this.substate-1)){
                    if(scoreTable[i].score < this.score){
                      this.scoreTable[i].score = this.score;
                      checkscore = 1;
                      this.storage.set('scoreTable',this.scoreTable);
                      //saveScoreIndatabase
                      if(this.typeForSave == "student"){ 
                          let scoreForSave = [{
                            studentID: this.idCode,
                            stage: this.state+"-"+(this.substate-1),
                            score: this.score
                          }] 
                          var callback = (result) =>{        
                            console.log("saveScoreInDatabase: ",scoreForSave); 
                          }
                          this.CallApiProvider.getCallScoreSave(callback,scoreForSave);               
                      }
                    }else{
                      checkscore = 2;
                    }
                  }
                }
              }
            }
        
        if(checkscore == 0){
          //saveScoreIndatabase
          if(this.typeForSave == "student"){        
            let scoreForSave = [{
              studentID: this.idCode,
              stage: this.state+"-"+(this.substate-1),
              score: this.score
            }]
            var callback = (result) =>{        
                console.log("saveScoreInDatabase: ",scoreForSave); 
            }
            this.CallApiProvider.getCallScoreSave(callback,scoreForSave); 
          }

          this.scoreTable.push({
            id: this.idCode,
            stage : this.state,
            substage : (this.substate-1),
            score : this.score            
          });

          this.storage.set('scoreTable',this.scoreTable);
          }  
      }    
    }
      

    });
    //static save    
    if(typeof this.staticForSave !== 'undefined' && this.staticForSave.length > 0){
      let staticVocab = [{
        "type": this.typeForSave,
        "mistake":this.staticForSave
      }]
      var callback = (result) =>{        
        console.log("saveStaticInDatabase: ",staticVocab);
      }
      this.CallApiProvider.getCallStaticSave(callback,staticVocab);
    }

    if(this.substate < 4){
      this.foot = "next " + this.state + "-" + this.substate;
   
    }else {
      this.foot = "END STATE";
    }
    if(this.score > 18){
      this.textwin = " "+ "たいへん よく できました。";
    }else if(this.score > 16){
      this.textwin = " "+ "よく できました。";
    }else{ 
      this.textwin  = " "+ "がんばりましょう。";
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndsubonePage');
  }

  dismiss(){  
     if(this.substate == 4){
      if(typeof this.lastStage != 'undefined'){
      this.navCtrl.setRoot('EndonePage',{
        // totalscore: this.totalscore,
        state : this.state,
        lastStage: this.lastStage
      }); 
       }else{
         this.navCtrl.setRoot('MapPage');
       }
    }else{
      this.navCtrl.setRoot('MapPage',{
        data: this.data,
        // state: this.state,
        // substate: this.substate,
        // totalscore: this.totalscore
      });   
    } 
  }

  openmap(){
    this.navCtrl.setRoot('MapPage');
  }

  openmenu(){
    this.navCtrl.setRoot('MenuPage');
  }

}
