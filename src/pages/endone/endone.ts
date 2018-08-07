import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';
import { AlertController, ModalController, ViewController} from 'ionic-angular';
/**
 * Generated class for the EndonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-endone',
  templateUrl: 'endone.html',
})
export class EndonePage {
  totalscore = 0;
  state = 1;
  substate = 3;
  textclear = " がんばりましょう。";
  lastStage;
  idCode;
  itemcutnum;
  itemskipnum;
  itemaddnum;
  readyend = false;
  scoreTable;
  checkgetitem = false;
  checkoption;

  constructor(public navCtrl: NavController,
    public modal: ModalController,
    public storage: Storage,
    public navParams: NavParams) {
    this.state = navParams.get('state');
    this.lastStage =navParams.get('lastStage');
  }

  ionViewWillEnter() {
    this.storage.get('id').then((id)=> {
          this.idCode = id;
        });

    this.storage.get('itemTable').then((itemTable) => {
      if(itemTable != null){
        let data1 = itemTable;
        for(let i = 0;i < data1.length ;i++){
          if(data1[i].id == this.idCode){
            this.itemcutnum = data1[i].itemC;
            this.itemskipnum = data1[i].itemS;
            this.itemaddnum = data1[i].itemA;
          }
        }
      }
    });
    
    this.storage.get('scoreTable').then((scoreTable)=> {      
       for(let i = 0; i < scoreTable.length;i++){
        if(scoreTable[i].id == this.idCode){
          
            if(scoreTable[i].stage == this.state){
              

            this.totalscore = this.totalscore + scoreTable[i].score ;
          }
          
          
        }
      }
       if(this.totalscore > 55){
      this.textclear = " "+ "たいへん よく できました。";
    }else if(this.totalscore > 50){
      this.textclear = " "+ "よく できました。";
    }else{ 
      this.textclear  = " "+ "がんばりましょう。";
    }

    });
    
      this.readyend = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndonePage');
  }

  getitem(){
    this.checkgetitem = true;
    let ran = Math.floor(Math.random() * 3);
    if(ran == 1){
      this.itemcutnum++;
      this.storage.get('itemTable').then((itemTable) => {
      if(itemTable != null){
        let data1 = itemTable;
        for(let i = 0;i < data1.length ;i++){
          if(data1[i].id == this.idCode){
             data1[i].itemC = this.itemcutnum;
          }
        }
        this.storage.set('itemTable',data1);
      }
    });

      this.openModalItemcut();
    }else if(ran == 2){
      this.itemaddnum++;
      this.storage.get('itemTable').then((itemTable) => {
      if(itemTable != null){
        let data1 = itemTable;
        for(let i = 0;i < data1.length ;i++){
          if(data1[i].id == this.idCode){
             data1[i].itemA = this.itemaddnum;
          }
        }
        this.storage.set('itemTable',data1);
      }
    });
      this.openModalItemsAdd(); 

    }else{
      this.itemskipnum++;
      this.storage.get('itemTable').then((itemTable) => {
      if(itemTable != null){
        let data1 = itemTable;
        for(let i = 0;i < data1.length ;i++){
          if(data1[i].id == this.idCode){
             data1[i].itemS = this.itemskipnum;
          }
        }
        this.storage.set('itemTable',data1);
      }
    });

      this.openModalItemskip();
    }
  }

  openmap(){
    this.checkoption = "map";
    if(this.checkgetitem){
      this.navCtrl.setRoot('MapPage');
    }else{
      this.getitem();
    }
  }

  openmenu(){
    this.checkoption = "menu";
    if(this.checkgetitem){
      this.navCtrl.setRoot('MenuPage');
    }else{
      this.getitem();
    }
  }

  openModalItemcut() {
    
    const Mymodal = this.modal.create(ModalContentPage, { enableBackdropDismiss: false, itemcutnum: this.itemcutnum});
    Mymodal.present();
    
     Mymodal.onDidDismiss(()=>{
      if(this.checkoption == "menu"){
        this.navCtrl.setRoot('MenuPage');
      }else{
        this.navCtrl.setRoot('MapPage');
      }
     });
  }
  
  openModalItemskip() {
    
    const Mymodal = this.modal.create(ModalContentPageskip, { enableBackdropDismiss: false, itemskipnum: this.itemskipnum });
    Mymodal.present();
    
     Mymodal.onDidDismiss(()=>{

      if(this.checkoption == "menu"){
        this.navCtrl.setRoot('MenuPage');
      }else{
        this.navCtrl.setRoot('MapPage');
      }
     });
  }
  
    openModalItemsAdd() {
    
    const Mymodal = this.modal.create(ModalContentPageAdd, { enableBackdropDismiss: false, itemaddnum: this.itemaddnum });
    Mymodal.present();
    
     Mymodal.onDidDismiss(()=>{

      if(this.checkoption == "menu"){
        this.navCtrl.setRoot('MenuPage');
      }else{
        this.navCtrl.setRoot('MapPage');
      }
     });
  }
  
}

@Component({
  templateUrl: "itemcut.html",
})
export class ModalContentPage {
  itemcutnum;
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.itemcutnum = navParams.get('itemcutnum');
  }
    
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: "itemskip.html",
})
export class ModalContentPageskip {
  itemskipnum;
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.itemskipnum = navParams.get('itemskipnum');
  }
    
  dismiss() {
    this.viewCtrl.dismiss();
  }
}


@Component({
  templateUrl: "itemadd.html",
})
export class ModalContentPageAdd {
  itemaddnum;
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.itemaddnum = navParams.get('itemaddnum');
  }
    
  dismiss() {
    this.viewCtrl.dismiss();
  }
}