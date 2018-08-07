import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers , RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {MenuPage} from '../menu/menu';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private todo : FormGroup;
  data;
  name;
  qp = [];
  data2: any;
  loginerr = false;
  loading;
  typeS = "begin";
  id:any;

  constructor( public formBuilder: FormBuilder,
    public storage: Storage,
    public http:Http,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.storage.get('name').then((name) => {
    //   console.log('Your name is', name);
    // });
    console.log("nichapat_yanwa@cmu.ac.th");
    console.log("qribbonz");
        
   
  }

  ionViewWillEnter(){
     this.storage.get('type').then((typeresult) => {
      this.typeS = typeresult;
      if(typeresult == 'student'){
        console.log('Your name is', typeresult);     
        this.navCtrl.setRoot('MenuPage');
      }
    });

    this.storage.get('id').then((id) => {
      if(id != null){
        this.id = id;
      }
    });  
  }

  logForm(){
    console.log(this.todo.value)
  }

  presentLoadingCustom() {
  this.loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `
       <img src="assets/imgs/loading/lg.palette-rotating-ring-loader.gif">     
     `
  });
  // loading.onDidDismiss(() => {
  //   console.log('Dismissed loading');
  // });

  this.loading.present();
  this.postCall2();
}

   postCall2(){
      this.loginerr = false;
       
            this.data2 = this.postCall();
            console.log(this.data2)
            
    
      // await funct2();
      // await funct3();
      
}
      
postCall()
{
    let headers = new Headers(
        {'Content-Type': 'application/json' 
    });
    let options = new RequestOptions({ headers: headers });    
    let postParams = {
        params :{
          UserName: this.todo.value.title,
          Password: this.todo.value.password
      }
    }

    //same but too long
    return new Promise((resolve, reject) => {
      this.http.post('https://sis.cmu.ac.th/cmusis/API/User/checkUser',postParams,options)
      .toPromise()
      .then((response) =>
      {
        console.log('API Response : ', response.json());
        this.data2 = response.json();

        this.login();
        resolve(response.json());
        console.log(this.data2);

        // this.data = JSON.stringify(response);
      })
      .catch((error) =>
      {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        this.postCall();
        reject(error.json());
      });
    });

    // return this.http.post('https://sis.cmu.ac.th/cmusis/API/User/checkUser',postParams,options)
    // .map(res=> res.json())
   //  .subscribe(data => {
   //  // console.log(data);
   //    if(data.data != null){
   //     this.qp.push({
   //         qp_name : data.data.FirstName,
   //         qp_last : data.data.lastName
   //     });
   // }
   //  // console.log(this.qp);
   //  },err => {
   //      console.log("error");
        
   //  });

 
    // if(this.qp == []){
    //     console.log(this.qp.length);        
    // }
};

    login(){
      let cheackid = 0;
        if(this.data2.data == null){
            console.log("no");
            this.loginerr = true;
            this.loading.dismiss(() => {
              console.log('Dismissed loading');
            });
        }else{
          //stage
          this.storage.get('stageTable').then((stageTable) => {if(this.typeS == "quest"){
              let dataS = stageTable;
              for(let i = 0; i < stageTable.length;i++){
                if(stageTable[i].id == this.id){
                  dataS.push({
                    id : this.data2.data.StudentCode,
                    stage : stageTable[i].stage                        
                  });
                }
              }
              this.storage.set('stageTable', dataS);
              this.setName();
            }else{
            if(stageTable != null){//have data
              console.log('Your name is', stageTable);
              for(let i = 0; i < stageTable.length;i++){
                if(stageTable[i].id == this.data2.data.StudentCode){
                  this.setName();
                  cheackid = 1;
                }
              }
              if(cheackid == 0){//have data but its new
                let data1 = stageTable;
                data1.push({
                  id : this.data2.data.StudentCode,
                  stage : "1-0"           
                });
                this.storage.set('stageTable', data1);
                this.setName();
              }  
            }else{//new
              this.qp.push({
                id : this.data2.data.StudentCode,
                stage : "1-0"             
              });
              this.setName();
              this.storage.set('stageTable', this.qp);
            }
            }
          });

          //score
          cheackid = 0;
          this.storage.get('scoreTable').then((scoreTable) => {
            if(this.typeS == "quest"){
              let dataQ = scoreTable;
              for(let i = 0; i < scoreTable.length;i++){
                if(scoreTable[i].id == this.id){
                  dataQ.push({
                    id : this.data2.data.StudentCode,
                    stage : scoreTable[i].stage,
                    substage : scoreTable[i].substage,
                    score: scoreTable[i].score                          
                  });
                }
              }
              this.storage.set('scoreTable', dataQ);
            }else{
            if(scoreTable != null){//have data
              console.log('Your name is', scoreTable);
              for(let i = 0; i < scoreTable.length;i++){
                if(scoreTable[i].id == this.data2.data.StudentCode){
                  cheackid = 1;
                }
              }
              if(cheackid == 0){//have data but its new
                let data1 = scoreTable;
                data1.push({
                  id : this.data2.data.StudentCode,
                  stage : 1,
                  substage : 1,
                  score: 0
                        
                });
                this.storage.set('scoreTable', data1);
              }  
            }else{//new
              let scorenew = []
              scorenew.push({
                id : this.data2.data.StudentCode,
                stage : 1,
                substage : 1,
                score: 0
                           
              });              
              this.storage.set('scoreTable', scorenew);
            }
            }
          });
          

          //item
          cheackid = 0;
          this.storage.get('itemTable').then((itemTable) => {
            if(this.typeS == "quest"){
              let dataI = itemTable;
              for(let i = 0; i < itemTable.length;i++){
                if(itemTable[i].id == this.id){
                  dataI.push({
                    id : this.data2.data.StudentCode,
                    itemC : itemTable[i].itemC,
                    itemS : itemTable[i].itemS,
                    itemA : itemTable[i].itemA                                   
                  });
                }
              }
              this.storage.set('itemTable', dataI);
            }else{
            if(itemTable != null){//have data
              console.log('Your name is', itemTable);
              for(let i = 0; i < itemTable.length;i++){
                if(itemTable[i].id == this.data2.data.StudentCode){
                  cheackid = 1;
                }
              }
              if(cheackid == 0){//have data but its new
                let data1 = itemTable;
                data1.push({
                  id : this.data2.data.StudentCode,
                  itemC : 2,
                  itemS : 2,
                  itemA : 2          
                });
                this.storage.set('itemTable', data1);
              }  
            }else{//new
              let itemnew = []
              itemnew.push({
                id : this.data2.data.StudentCode,
                  itemC : 2,
                  itemS : 2,
                  itemA : 2      
              });              
              this.storage.set('itemTable', itemnew);
            }
            }
          });
          this.loading.dismiss(() => {
              console.log('Dismissed loading');
            });
          this.navCtrl.push('MenuPage');
        }

            
    }

  setName() {
    // console.log(this.data2.data.StudentCode);
    // localStorage.setItem('eiei', this.data2.data.StudentCode);
    // console.log(localStorage.getItem('eiei')); 
    this.storage.set('id', this.data2.data.StudentCode);
    this.storage.set('fullname', this.data2.data.FullName);
    this.storage.set('firstname', this.data2.data.FirstName);
    this.storage.set('lastname', this.data2.data.lastName);
    this.storage.set('type', "student");
    console.log(name);  
  };

  setData(){ 
    this.storage.set('state', "1-0");
    this.storage.set('stageTable', this.qp);
    console.log(name);    
  }
  
  getName() {
    this.storage.get('name').then((name) => {
      console.log('Your name is', name);
    });
  };
  
  removeName() {
    this.storage.remove('name').then(() => {
      console.log('name has been removed');
    });
  }
  
  clearKeys() {
    this.storage.clear().then(() => {
      console.log('Keys have been cleared');
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
