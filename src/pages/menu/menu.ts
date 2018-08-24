import {ProfilePage} from './../profile/profile';
import {CreditPage} from './../credit/credit';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, ViewController} from 'ionic-angular';

import {LoadingController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import {HomePage} from '../home/home';
import {LoginPage} from '../login/login';
import {MapPage} from '../map/map';
import {LessonPage} from '../lesson/lesson';
import {Platform} from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  data;
  id;
  fullname;
  firstname;
  lastname;
  state;
  statetext;
  typemenu = false;
  name;
  readymenu = false;
  loading;

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public storage: Storage,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public platform: Platform) {
    this.platform = platform;
    this.firstname = this.navParams.get('data');
    // if(this.firstname !== undefined){
    //   this.fullname = this.firstname;
    //   this.name = this.firstname;
    // this.readymenu = true;
    // this.storage.get('state').then((state)=> {
    // if(state === "1-0"){
    //   this.state = state;
    //   this.statetext = "Begin";
    // }else{
    //   this.state = state;
    //   this.statetext = state;
    // }
    // });
    // }else{
    // this.presentLoadingCustom();
    // }

    //   this.storage.get('id').then((id) => {
    //     if(id == null){       
    //     this.navCtrl.push(LoginPage);    
    //   }
    //     console.log('Your name is', id);  
    // });

    //   this.data = navParams.get('param1');
    //   console.log(this.data);


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
    this.loaddata();
  }

  loaddata() {
    // this.storage.get('state').then((state)=> {
    //   if(state === "1-0"){
    //     this.state = state;
    //     this.statetext = "Begin";
    //   }else{
    //     this.state = state;
    //     this.statetext = state;
    //   }
    // });
    // this.storage.get('type').then((type)=> {
    //   console.log(type);
    //   if(type === "student"){

    //     this.storage.get('fullname').then((fullname)=> {
    //       this.fullname = fullname;
    //       this.typemenu = true;
    //       this.readymenu = true;
    //       this.loading.dismiss(() => {
    //           console.log('Dismissed loading');
    //         });
    //     }); 

    //   }else {
    //     this.storage.get('name').then((name)=> {
    //       this.name = name;
    //       this.readymenu = true;
    //       this.loading.dismiss(() => {
    //           console.log('Dismissed loading');
    //         });
    //     });
    //   }

    // });

    // this.navCtrl.setRoot('MenuPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    // this.storage.get('state').then((state)=> {
    //   if(state === "1-0"){
    //     this.state = state;
    //     this.statetext = "Begin";
    //   }else{
    //     this.state = state;
    //     this.statetext = state;
    //   }
    // });
    let idCode;
    this.storage.get('id').then((id) => {
      idCode = id;
    });

    this.storage.get('stageTable').then((stageTable) => {
      for (let i = 0; i < stageTable.length; i++) {
        if (stageTable[i].id == idCode) {
          this.state = stageTable[i].stage;
          if (this.state === "1-0") {
            this.statetext = "Begin";
          } else {
            this.statetext = this.state;
          }
        }
      }
    });
    this.storage.get('type').then((type) => {
      console.log(type);
      if (type == "student") {

        this.storage.get('fullname').then((fullname) => {
          this.fullname = fullname;
          this.typemenu = true;
        });

      } else {
        this.storage.get('id').then((id) => {
          this.name = id;
        });
      }

    });

    this.readymenu = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit() {

    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  protect() {
    this.storage.get('id').then((id) => {
      if (id == null) {
        console.log('Your name is', id);
        this.navCtrl.setRoot('LoginPage');
        return false;
      }
    });
    return true;
  }

  openprofile() {
    this.navCtrl.push('ProfilePage');
  }

  openMap() {
    this.navCtrl.push('MapPage', {
      state: this.state,
    });
  }

  openLesson() {
    this.navCtrl.push('LessonPage');
  }

  openCre() {
    this.navCtrl.push('CreditPage');
  }

  removeName() {
    this.storage.remove('id').then(() => {
      console.log('name has been removed');
      this.navCtrl.setRoot(HomePage);
    });
    // this.storage.clear().then(() => {
    //   console.log('Keys have been cleared');
    // });
  }

  exitApp() {
    this.platform.exitApp();
  }
}
