import { EndonePage } from './../endone/endone';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EndsubonePage } from '../endsubone/endsubone';
import { MapPage } from '../map/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LostPage } from '../lost/lost';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AlertController, ModalController, ViewController } from 'ionic-angular';


export interface CountdownTimer {
    seconds: number;
    secondsRemaining: number;
    runTimer: boolean;
    displayTime: string;
}

@IonicPage()
@Component({
    selector: 'page-playgame',
    templateUrl: 'playgame.html',
})
export class PlaygamePage {
    debug = true
    stateData; // substate data by page
    loading; //don't use 
    question: any; //question from module and page is list
    questionQ: any; //question for display
    key: any; // key in question
    choice1: any;
    choice2: any;
    choice3: any;
    choice4: any;
    data; //question by-form page
    ques = [];//don't use
    indexques = 0;//move question in state
    indexquessub = 0;//move question insubstate
    score = 0;//score in substate
    totalscore = 0;//score in state
    life = 5;
    substate = 1;// substate in page for change question
    url = 'http://159.65.142.130/api/getQuestion/';
    state = 1;// for change color
    statepage;//for send between page
    substatestore; //for substate in storage
    quesqic = "assets/imgs/question/pinkques.PNG";
    choicecolor = [
        "choice",
        "choice",
        "choice",
        "choice"
    ];//for change color text
    choicepic = [
        "assets/imgs/question/oranC.PNG",
        "assets/imgs/question/oranC.PNG",
        "assets/imgs/question/oranC.PNG",
        "assets/imgs/question/oranC.PNG"
    ];//for change color picture
    indexchoice;//don't use but have in code
    controlclick = 0; //for cheack double touch
    cutchoiceclick = 0; //for cheack number in use
    itemtimeclick = 0; //for cheack number in use
    itemskipclick = 0;//for cheack number in use
    numitemcut; //total have
    numitemskip; //total have
    numitemtime; //total have
    checkcutchoice = [
        true,
        true,
        true,
        true
    ]; //for cheack "cut can't touch"
    cutran1; //for ran cut choice 1. don't repeat 2. don't key
    cutran2;//for ran cut choice 1. don't repeat 2. don't key
    tryQ = false; //for loading data
    timestate = [
        65,
        60,
        55,
        50,
        45,
        40,
        35,
        30
    ];// time each  state
    timeindex = 0; //assign time
    timeready = false; //don't use
    lastStage;//for save laststage
    idCode;//id
    manageTab = [
        "managecolorstage",
        "managecolor",
        "managecolor",
        "managecolor",
        "managecolor",
        "managecolor",
        "managecolor",
        "managecolor",
    ];
    static = [];
    indexstatic = 0;
    staticquestion = [];
    vocabstatic = [];
    checkQueStatic;

    constructor(public navCtrl: NavController,
        public alerCtrl: AlertController,
        public navParams: NavParams,
        public http: Http,
        public storage: Storage,
        public modal: ModalController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController) {

        this.stateData = navParams.get('substate');
        this.statepage = navParams.get('state');
        this.totalscore = navParams.get('totalscore');
        this.data = navParams.get('data');
        this.lastStage = navParams.get('lastStage');
        console.log("playG state" + this.stateData);
        console.log("playG state" + this.state);
        console.log("Play totalsc" + this.totalscore);
        console.log("play data" + this.data);
        if (this.stateData !== undefined) {
            this.substate = this.stateData;
            this.state = this.statepage;
            if (this.substate == 2) {
                if (this.data !== undefined) {
                    this.indexques = 20;
                    this.question = this.data;
                    this.changeColor();
                    this.setQuestion();
                    this.readypage();
                } else {
                    this.getQuestion();
                }
            } else if (this.substate == 3) {
                if (this.data !== undefined) {
                    this.indexques = 40;
                    this.question = this.data;
                    this.changeColor();
                    this.setQuestion();
                    this.readypage();
                } else {
                    this.getQuestion();
                }
            } else if (this.substate == 1) {
                this.getQuestion();
            }

        } else {

            this.getQuestion();
        }
        if (this.totalscore === undefined) {
            this.totalscore = this.score;
        }
    }

    @Input() timeInSeconds: number;
    timer: CountdownTimer;

    ngOnInit() {
        // this.initTimer();
        // this.dataques();
    }
	
	ionViewCanLeave(){
        this.timer.runTimer = false;
    }
    
	ionViewWillEnter() {
        this.storage.get('id').then((id) => {
            this.idCode = id;
        });

        this.storage.get('itemTable').then((itemTable) => {
            if (itemTable != null) {
                let data1 = itemTable;
                for (let i = 0; i < data1.length; i++) {
                    if (data1[i].id == this.idCode) {
                        this.numitemcut = data1[i].itemC;
                        this.numitemskip = data1[i].itemS;
                        this.numitemtime = data1[i].itemA;
                    }
                }
            }
        });
        this.storage.get('staticTable').then((staticTable) => {
            if (staticTable != null) {
                for (let i = 0; i < staticTable.length; i++) {
                    if (staticTable[i].UserID == this.idCode) {
                        this.staticquestion.push(staticTable[i]);
                    }
                }
                console.log("staticquestion = " + this.staticquestion)
            }
        });
        this.storage.get('vocabTable').then((vocabTable) => {
            if (vocabTable != null) {
                this.vocabstatic = vocabTable;
                console.log(this.vocabstatic);
            }
        });

    }

    initTimer() {
        this.timeInSeconds = this.timestate[this.timeindex];
        console.log(this.timeInSeconds);

        this.timer = <CountdownTimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            secondsRemaining: this.timeInSeconds
        };
        this.timer.displayTime = this.timer.secondsRemaining.toString();
        this.timer.runTimer = true;
        this.timerTick();
    }

    timerTick() {
        setTimeout(() => {

            //   console.log("this.timer.displayTime : "+ this.timer.secondsRemaining);
            if (!this.timer.runTimer) {
                console.log("OUTTTTTTT");
                return;
            }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.timer.secondsRemaining.toString();
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            } else {
                if (this.checkQueStatic) {
                    this.saveStatic(this.staticquestion[this.indexstatic]);
                } else {
                    this.saveStatic(this.question.question[this.indexques]);
                }
                this.life--;
                this.presentToast();

            }
        }, 1000);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlaygamePage');
    }

    getQuestion() {
        this.getCall();
    }

    readypage() {
        setTimeout(() => {
            this.tryQ = true;
            this.initTimer();
        }, 5500);
    }

    getCall() {
        let headers = new Headers(
            {
                'Content-Type': 'application/json'
            });
        let options = new RequestOptions({ headers: headers });

        return new Promise((resolve, reject) => {
            this.http.get(this.url + this.statepage, options)
                .map(res => res.json())
                .subscribe(data => {
                    console.log(data)
                    this.question = data;
                    this.saveVocab();
                    console.log(this.question.question[this.indexques].stem.romanji);
                    this.changeColor();
                    this.setQuestion();
                    this.initTimer();
                    this.tryQ = true;
                    resolve(data);
                }, error => {
                    console.log('API Error : ', error.status);
                    console.log('API Error : ', JSON.stringify(error));
                    this.getCall();
                    reject(error.json());
                });
        });
    }


    saveVocab() {
        this.storage.get('vocabTable').then((vocabTable) => {
            if (vocabTable != null) {//have data
                let vocab = vocabTable;
                let checkvocab = 0;
                for (let i = 0; i < this.question.question.length; i++) {
                    for (let j = 0; j < vocabTable.length; j++) {
                        if (this.question.question[i].stem.vocabID == vocab[j].stem.vocabID) {
                            checkvocab = 1;
                        }
                    }
                    if (checkvocab != 1) {
                        console.log("vocab no have")
                        vocab.push({
                            choices: [{
                                vocabID: this.question.question[i].choices[0].vocabID,
                                hiragana: this.question.question[i].choices[0].hiragana,
                                romanji: this.question.question[i].choices[0].romanji,
                                thai: this.question.question[i].choices[0].thai
                            }, {
                                vocabID: this.question.question[i].choices[1].vocabID,
                                hiragana: this.question.question[i].choices[1].hiragana,
                                romanji: this.question.question[i].choices[1].romanji,
                                thai: this.question.question[i].choices[1].thai
                            }, {
                                vocabID: this.question.question[i].choices[2].vocabID,
                                hiragana: this.question.question[i].choices[2].hiragana,
                                romanji: this.question.question[i].choices[2].romanji,
                                thai: this.question.question[i].choices[2].thai
                            }, {
                                vocabID: this.question.question[i].choices[3].vocabID,
                                hiragana: this.question.question[i].choices[3].hiragana,
                                romanji: this.question.question[i].choices[3].romanji,
                                thai: this.question.question[i].choices[3].thai
                            }],
                            stem: {
                                vocabID: this.question.question[i].stem.vocabID,
                                hiragana: this.question.question[i].stem.hiragana,
                                romanji: this.question.question[i].stem.romanji,
                                thai: this.question.question[i].stem.thai
                            },
                            UserID: this.idCode

                        });
                        checkvocab = 0;
                    }
                }
                this.storage.set('vocabTable', vocab);
            } else {//new
                let datas = [];
                for (let i = 0; i < this.question.question.length; i++) {
                    datas.push({
                        choices: [{
                            vocabID: this.question.question[i].choices[0].vocabID,
                            hiragana: this.question.question[i].choices[0].hiragana,
                            romanji: this.question.question[i].choices[0].romanji,
                            thai: this.question.question[i].choices[0].thai
                        }, {
                            vocabID: this.question.question[i].choices[1].vocabID,
                            hiragana: this.question.question[i].choices[1].hiragana,
                            romanji: this.question.question[i].choices[1].romanji,
                            thai: this.question.question[i].choices[1].thai
                        }, {
                            vocabID: this.question.question[i].choices[2].vocabID,
                            hiragana: this.question.question[i].choices[2].hiragana,
                            romanji: this.question.question[i].choices[2].romanji,
                            thai: this.question.question[i].choices[2].thai
                        }, {
                            vocabID: this.question.question[i].choices[3].vocabID,
                            hiragana: this.question.question[i].choices[3].hiragana,
                            romanji: this.question.question[i].choices[3].romanji,
                            thai: this.question.question[i].choices[3].thai
                        }],
                        stem: {
                            vocabID: this.question.question[i].stem.vocabID,
                            hiragana: this.question.question[i].stem.hiragana,
                            romanji: this.question.question[i].stem.romanji,
                            thai: this.question.question[i].stem.thai
                        },
                        UserID: this.idCode
                    });
                }
                this.storage.set('vocabTable', datas);
            }
        });
    }

    setQuestion() { // random for selecting question
        let rans = Math.floor(Math.random() * 4);
        if (rans == 1) {
            console.log("static wrong");
            if (this.staticquestion.length != 0) {
                // if(this.indexstatic < this.staticquestion.length){
                this.checkQueStatic = true;
                let ranstaic = Math.floor(Math.random() * this.staticquestion.length);

                console.log("this.staticquestion.length: " + this.staticquestion.length);
                console.log("ranstaic: " + ranstaic);

                this.indexstatic = ranstaic;

                let ran = Math.floor(Math.random() * 4);
                if (this.substate == 1) {
                    if (this.debug) {
                        this.questionQ = this.staticquestion[ranstaic].stem.hiragana;
                    }
                    else {
                        this.questionQ = this.staticquestion[ranstaic].stem.hiragana;
                    }
                    this.stateData = this.substate + 1;
                    if (ran == 0) {
                        this.choice1 = this.staticquestion[ranstaic].choices[0].thai;
                        this.choice2 = this.staticquestion[ranstaic].choices[1].thai;
                        this.choice3 = this.staticquestion[ranstaic].choices[2].thai;
                        this.choice4 = this.staticquestion[ranstaic].choices[3].thai;
                        this.key = 0;
                    } else if (ran == 1) {
                        this.choice1 = this.staticquestion[ranstaic].choices[1].thai;
                        this.choice2 = this.staticquestion[ranstaic].choices[2].thai;
                        this.choice3 = this.staticquestion[ranstaic].choices[3].thai;
                        this.choice4 = this.staticquestion[ranstaic].choices[0].thai;
                        this.key = 3;
                    } else if (ran == 2) {
                        this.choice1 = this.staticquestion[ranstaic].choices[2].thai;
                        this.choice2 = this.staticquestion[ranstaic].choices[3].thai;
                        this.choice3 = this.staticquestion[ranstaic].choices[0].thai;
                        this.choice4 = this.staticquestion[ranstaic].choices[1].thai;
                        this.key = 2;
                    } else if (ran == 3) {
                        this.choice1 = this.staticquestion[ranstaic].choices[3].thai;
                        this.choice2 = this.staticquestion[ranstaic].choices[0].thai;
                        this.choice3 = this.staticquestion[ranstaic].choices[1].thai;
                        this.choice4 = this.staticquestion[ranstaic].choices[2].thai;
                        this.key = 1;
                    }
                } else if (this.substate == 2) {
                    let ransub2 = Math.floor(Math.random() * 2);
                    this.stateData = this.substate + 1;
                    if (ransub2 == 0) {
                        if (this.debug) {
                            this.questionQ = this.staticquestion[ranstaic].stem.hiragana;
                        }
                        else {
                            this.questionQ = this.staticquestion[ranstaic].stem.hiragana;
                        }
                        if (ran == 0) {
                            this.choice1 = this.staticquestion[ranstaic].choices[0].thai;
                            this.choice2 = this.staticquestion[ranstaic].choices[1].thai;
                            this.choice3 = this.staticquestion[ranstaic].choices[2].thai;
                            this.choice4 = this.staticquestion[ranstaic].choices[3].thai;
                            this.key = 0;
                        } else if (ran == 1) {
                            this.choice1 = this.staticquestion[ranstaic].choices[1].thai;
                            this.choice2 = this.staticquestion[ranstaic].choices[2].thai;
                            this.choice3 = this.staticquestion[ranstaic].choices[3].thai;
                            this.choice4 = this.staticquestion[ranstaic].choices[0].thai;
                            this.key = 3;
                        } else if (ran == 2) {
                            this.choice1 = this.staticquestion[ranstaic].choices[2].thai;
                            this.choice2 = this.staticquestion[ranstaic].choices[3].thai;
                            this.choice3 = this.staticquestion[ranstaic].choices[0].thai;
                            this.choice4 = this.staticquestion[ranstaic].choices[1].thai;
                            this.key = 2;
                        } else if (ran == 3) {
                            this.choice1 = this.staticquestion[ranstaic].choices[3].thai;
                            this.choice2 = this.staticquestion[ranstaic].choices[0].thai;
                            this.choice3 = this.staticquestion[ranstaic].choices[1].thai;
                            this.choice4 = this.staticquestion[ranstaic].choices[2].thai;
                            this.key = 1;
                        }
                    } else {
                        if (this.debug) {
                            this.questionQ = this.staticquestion[ranstaic].stem.thai;
                        }
                        else {
                            this.questionQ = this.staticquestion[ranstaic].stem.thai;
                        }
                        if (ran == 0) {
                            this.choice1 = this.staticquestion[ranstaic].choices[0].hiragana;
                            this.choice2 = this.staticquestion[ranstaic].choices[1].hiragana;
                            this.choice3 = this.staticquestion[ranstaic].choices[2].hiragana;
                            this.choice4 = this.staticquestion[ranstaic].choices[3].hiragana;
                            this.key = 0;
                        } else if (ran == 1) {
                            this.choice1 = this.staticquestion[ranstaic].choices[1].hiragana;
                            this.choice2 = this.staticquestion[ranstaic].choices[2].hiragana;
                            this.choice3 = this.staticquestion[ranstaic].choices[3].hiragana;
                            this.choice4 = this.staticquestion[ranstaic].choices[0].hiragana;
                            this.key = 3;
                        } else if (ran == 2) {
                            this.choice1 = this.staticquestion[ranstaic].choices[2].hiragana;
                            this.choice2 = this.staticquestion[ranstaic].choices[3].hiragana;
                            this.choice3 = this.staticquestion[ranstaic].choices[0].hiragana;
                            this.choice4 = this.staticquestion[ranstaic].choices[1].hiragana;
                            this.key = 2;
                        } else if (ran == 3) {
                            this.choice1 = this.staticquestion[ranstaic].choices[3].hiragana;
                            this.choice2 = this.staticquestion[ranstaic].choices[0].hiragana;
                            this.choice3 = this.staticquestion[ranstaic].choices[1].hiragana;
                            this.choice4 = this.staticquestion[ranstaic].choices[2].hiragana;
                            this.key = 1;
                        }
                    }
                } else if (this.substate == 3) {
                    if (this.debug) {
                        this.questionQ = this.staticquestion[ranstaic].stem.thai;
                    }
                    else {
                        this.questionQ = this.staticquestion[ranstaic].stem.thai;
                    }
                    this.stateData = this.substate + 1;
                    if (ran == 0) {
                        this.choice1 = this.staticquestion[ranstaic].choices[0].hiragana;
                        this.choice2 = this.staticquestion[ranstaic].choices[1].hiragana;
                        this.choice3 = this.staticquestion[ranstaic].choices[2].hiragana;
                        this.choice4 = this.staticquestion[ranstaic].choices[3].hiragana;
                        this.key = 0;
                    } else if (ran == 1) {
                        this.choice1 = this.staticquestion[ranstaic].choices[1].hiragana;
                        this.choice2 = this.staticquestion[ranstaic].choices[2].hiragana;
                        this.choice3 = this.staticquestion[ranstaic].choices[3].hiragana;
                        this.choice4 = this.staticquestion[ranstaic].choices[0].hiragana;
                        this.key = 3;
                    } else if (ran == 2) {
                        this.choice1 = this.staticquestion[ranstaic].choices[2].hiragana;
                        this.choice2 = this.staticquestion[ranstaic].choices[3].hiragana;
                        this.choice3 = this.staticquestion[ranstaic].choices[0].hiragana;
                        this.choice4 = this.staticquestion[ranstaic].choices[1].hiragana;
                        this.key = 2;
                    } else if (ran == 3) {
                        this.choice1 = this.staticquestion[ranstaic].choices[3].hiragana;
                        this.choice2 = this.staticquestion[ranstaic].choices[0].hiragana;
                        this.choice3 = this.staticquestion[ranstaic].choices[1].hiragana;
                        this.choice4 = this.staticquestion[ranstaic].choices[2].hiragana;
                        this.key = 1;
                    }
                }

                this.staticquestion[ranstaic].count--;
                console.log("this.staticquestion[ranstaic].count--: " + this.staticquestion[ranstaic].count);

                this.storage.set('staticTable', this.staticquestion);
                // }
                // }else{
                //     this.checkQueStatic = false;
                //     this.setChoice();
                // }
            }
            else {
                this.checkQueStatic = false;
                this.setChoice();
            }
        } else {
            this.checkQueStatic = false;
            this.setChoice();
        }
    }

    setChoice() {
        let ran = Math.floor(Math.random() * 4);
        if (this.substate == 1) {
            this.questionQ = this.question.question[this.indexques].stem.hiragana;
            this.stateData = this.substate + 1;
            if (ran == 0) {
                this.choice1 = this.question.question[this.indexques].choices[0].thai;
                this.choice2 = this.question.question[this.indexques].choices[1].thai;
                this.choice3 = this.question.question[this.indexques].choices[2].thai;
                this.choice4 = this.question.question[this.indexques].choices[3].thai;
                this.key = 0;
            } else if (ran == 1) {
                this.choice1 = this.question.question[this.indexques].choices[1].thai;
                this.choice2 = this.question.question[this.indexques].choices[2].thai;
                this.choice3 = this.question.question[this.indexques].choices[3].thai;
                this.choice4 = this.question.question[this.indexques].choices[0].thai;
                this.key = 3;
            } else if (ran == 2) {
                this.choice1 = this.question.question[this.indexques].choices[2].thai;
                this.choice2 = this.question.question[this.indexques].choices[3].thai;
                this.choice3 = this.question.question[this.indexques].choices[0].thai;
                this.choice4 = this.question.question[this.indexques].choices[1].thai;
                this.key = 2;
            } else if (ran == 3) {
                this.choice1 = this.question.question[this.indexques].choices[3].thai;
                this.choice2 = this.question.question[this.indexques].choices[0].thai;
                this.choice3 = this.question.question[this.indexques].choices[1].thai;
                this.choice4 = this.question.question[this.indexques].choices[2].thai;
                this.key = 1;
            }
        } else if (this.substate == 2) {
            let ransub2 = Math.floor(Math.random() * 2);
            this.stateData = this.substate + 1;
            if (ransub2 == 0) {
                this.questionQ = this.question.question[this.indexques].stem.hiragana;
                if (ran == 0) {
                    this.choice1 = this.question.question[this.indexques].choices[0].thai;
                    this.choice2 = this.question.question[this.indexques].choices[1].thai;
                    this.choice3 = this.question.question[this.indexques].choices[2].thai;
                    this.choice4 = this.question.question[this.indexques].choices[3].thai;
                    this.key = 0;
                } else if (ran == 1) {
                    this.choice1 = this.question.question[this.indexques].choices[1].thai;
                    this.choice2 = this.question.question[this.indexques].choices[2].thai;
                    this.choice3 = this.question.question[this.indexques].choices[3].thai;
                    this.choice4 = this.question.question[this.indexques].choices[0].thai;
                    this.key = 3;
                } else if (ran == 2) {
                    this.choice1 = this.question.question[this.indexques].choices[2].thai;
                    this.choice2 = this.question.question[this.indexques].choices[3].thai;
                    this.choice3 = this.question.question[this.indexques].choices[0].thai;
                    this.choice4 = this.question.question[this.indexques].choices[1].thai;
                    this.key = 2;
                } else if (ran == 3) {
                    this.choice1 = this.question.question[this.indexques].choices[3].thai;
                    this.choice2 = this.question.question[this.indexques].choices[0].thai;
                    this.choice3 = this.question.question[this.indexques].choices[1].thai;
                    this.choice4 = this.question.question[this.indexques].choices[2].thai;
                    this.key = 1;
                }
            } else {
                this.questionQ = this.question.question[this.indexques].stem.thai;
                if (ran == 0) {
                    this.choice1 = this.question.question[this.indexques].choices[0].hiragana;
                    this.choice2 = this.question.question[this.indexques].choices[1].hiragana;
                    this.choice3 = this.question.question[this.indexques].choices[2].hiragana;
                    this.choice4 = this.question.question[this.indexques].choices[3].hiragana;
                    this.key = 0;
                } else if (ran == 1) {
                    this.choice1 = this.question.question[this.indexques].choices[1].hiragana;
                    this.choice2 = this.question.question[this.indexques].choices[2].hiragana;
                    this.choice3 = this.question.question[this.indexques].choices[3].hiragana;
                    this.choice4 = this.question.question[this.indexques].choices[0].hiragana;
                    this.key = 3;
                } else if (ran == 2) {
                    this.choice1 = this.question.question[this.indexques].choices[2].hiragana;
                    this.choice2 = this.question.question[this.indexques].choices[3].hiragana;
                    this.choice3 = this.question.question[this.indexques].choices[0].hiragana;
                    this.choice4 = this.question.question[this.indexques].choices[1].hiragana;
                    this.key = 2;
                } else if (ran == 3) {
                    this.choice1 = this.question.question[this.indexques].choices[3].hiragana;
                    this.choice2 = this.question.question[this.indexques].choices[0].hiragana;
                    this.choice3 = this.question.question[this.indexques].choices[1].hiragana;
                    this.choice4 = this.question.question[this.indexques].choices[2].hiragana;
                    this.key = 1;
                }
            }
        } else if (this.substate == 3) {
            this.questionQ = this.question.question[this.indexques].stem.thai;
            this.stateData = this.substate + 1;
            if (ran == 0) {
                this.choice1 = this.question.question[this.indexques].choices[0].hiragana;
                this.choice2 = this.question.question[this.indexques].choices[1].hiragana;
                this.choice3 = this.question.question[this.indexques].choices[2].hiragana;
                this.choice4 = this.question.question[this.indexques].choices[3].hiragana;
                this.key = 0;
            } else if (ran == 1) {
                this.choice1 = this.question.question[this.indexques].choices[1].hiragana;
                this.choice2 = this.question.question[this.indexques].choices[2].hiragana;
                this.choice3 = this.question.question[this.indexques].choices[3].hiragana;
                this.choice4 = this.question.question[this.indexques].choices[0].hiragana;
                this.key = 3;
            } else if (ran == 2) {
                this.choice1 = this.question.question[this.indexques].choices[2].hiragana;
                this.choice2 = this.question.question[this.indexques].choices[3].hiragana;
                this.choice3 = this.question.question[this.indexques].choices[0].hiragana;
                this.choice4 = this.question.question[this.indexques].choices[1].hiragana;
                this.key = 2;
            } else if (ran == 3) {
                this.choice1 = this.question.question[this.indexques].choices[3].hiragana;
                this.choice2 = this.question.question[this.indexques].choices[0].hiragana;
                this.choice3 = this.question.question[this.indexques].choices[1].hiragana;
                this.choice4 = this.question.question[this.indexques].choices[2].hiragana;
                this.key = 1;
            }
        }
    }

    switchQues() {
        if (this.indexques < 60) {
            this.controlclick = 0;
            this.cutchoiceclick = 0;
            this.itemtimeclick = 0;
            this.indexques++;
            this.indexquessub++;
            this.changeColor();
            this.setQuestion();
        }
        //  console.log("Q : "+this.indexques);
    }

    changeColor() {
        if (this.state == 1) {
            this.quesqic = "assets/imgs/question/pinkques.PNG";
            this.timeindex = 0;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/oranC.PNG";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolorstage",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
            ];
        } else if (this.state == 2) {
            this.quesqic = "assets/imgs/question/orangeques.png";
            this.timeindex = 1;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/yelloC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolorstage",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
            ];
        } else if (this.state == 3) {
            this.quesqic = "assets/imgs/question/yelloques.png";
            this.timeindex = 2;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/greenC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolor",
                "managecolorstage",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
            ];
        } else if (this.state == 4) {
            this.quesqic = "assets/imgs/question/greenques.png";
            this.timeindex = 3;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/darkgreenC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolorstage",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
            ];
        } else if (this.state == 5) {
            this.quesqic = "assets/imgs/question/darkgreenques.png";
            this.timeindex = 4;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/blueC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolorstage",
                "managecolor",
                "managecolor",
                "managecolor",
            ];
        } else if (this.state == 6) {
            this.quesqic = "assets/imgs/question/blueques.png";
            this.timeindex = 5;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/darkblueC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolorstage",
                "managecolor",
                "managecolor",
            ];
        } else if (this.state == 7) {
            this.quesqic = "assets/imgs/question/darkblueques.png";
            this.timeindex = 6;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/violetC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolorstage",
                "managecolor",
            ];
        } else if (this.state == 8) {
            this.quesqic = "assets/imgs/question/violetques.png";
            this.timeindex = 7;
            for (let i = 0; i < 4; i++) {
                this.choicecolor[i] = "choice";
                this.choicepic[i] = "assets/imgs/question/pinkC.png";
                this.checkcutchoice[i] = true;
            }
            this.manageTab = [
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolor",
                "managecolorstage",
            ];
        }
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Time out!',
            duration: 1000,
            position: 'middle',
            cssClass: "toasttime"
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            if (this.life == 0) {
                setTimeout(() => {
                    this.timer.runTimer = false;
                }, 1000);
                this.navCtrl.setRoot('LostPage');
            } else {
                if (this.indexquessub != 19) {
                    this.switchQues();
                    this.initTimer();
                }
                else {
                    this.totalscore += this.score;
                    this.navCtrl.setRoot('EndsubonePage', {
                        data: this.question,
                        totalscore: this.totalscore,
                        score: this.score,
                        state: this.state,
                        substate: this.stateData,
                        lastStage: this.lastStage
                    });
                }
            }

        });
        toast.present();
    }

    stoptime() {
        if (this.life == 0) {
            setTimeout(() => {
                this.timer.runTimer = false;
            }, 1000);
        } else {
            this.timer.runTimer = false;
            if (this.indexquessub != 19) {
                setTimeout(() => {
                    this.switchQues();
                    this.initTimer();
                }, 1000);
            }
            else {
                setTimeout(() => {
                    this.timer.runTimer = false;
                    this.totalscore += this.score;
                    // if(this.stateData == 4){
                    //     this.navCtrl.setRoot('EndonePage'); 
                    // }else{
                    this.navCtrl.setRoot('EndsubonePage', {
                        data: this.question,
                        totalscore: this.totalscore,
                        score: this.score,
                        state: this.state,
                        substate: this.stateData,
                        lastStage: this.lastStage
                    });

                }, 1000);
            }
        }
    }

    presentLoading() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
      <div class="fixheight">
     <div class="loadtop">
    </div>
    <p class="textload">State 1.{{substate}}</p>
 
   <div>
       <img src="assets/imgs/loading/giphy.gif">     
      </div>  
    
      <p class="textload">loading...</p>
      <div class="loadtop">
  
    </div>
      </div>`
        });
        // loading.onDidDismiss(() => {
        //   console.log('Dismissed loading');
        // });

        this.loading.present();
    }

    calulatate(index) {
        if (this.controlclick == 0) {
            this.controlclick = 1;
            this.indexchoice = index;
            if (this.checkcutchoice[index]) {
                if (index == this.key) {
                    if (this.checkQueStatic) {
                        if (this.staticquestion[this.indexstatic].count <= 0) {
                            this.staticquestion.splice(this.indexstatic, 1);
                            this.storage.set('staticTable', this.staticquestion);
                        }
                    }
                    this.score++;
                    this.choicecolor[index] = "choicecorrect";
                    this.choicepic[index] = "assets/imgs/correctchoice.PNG";
                    //   this.openModalCorrect();
                } else {
                    if (this.checkQueStatic) {
                        this.saveStatic(this.staticquestion[this.indexstatic]);
                    } else {
                        this.saveStatic(this.question.question[this.indexques]);
                    }
                    this.life--;

                    this.choicecolor[index] = "choiceincorrect";
                    this.choicepic[index] = "assets/imgs/close.PNG";
                    if (this.life == 0) {
                        setTimeout(() => {
                            this.timer.runTimer = false;
                        }, 1000);
                        this.navCtrl.setRoot('LostPage');
                    }
                    //   this.openModalInCorrect();
                }
                this.stoptime();
            }
            else {
                this.controlclick = 0;
            }

        }
    }

    saveStatic(question) {
        // this.storage.get('staticTable').then((staticTable) => {
        // if(staticTable != null){//have data
        // this.static = staticTable;
        console.log("GGGGGGG");
        console.log("question.stem.vocabID = " + question.stem.vocabID);
        let checkstatic = false;
        for (let i = 0; i < this.staticquestion.length; i++) {
            if (question.stem.vocabID == this.staticquestion[i].stem.vocabID) {
                console.log("this.staticquestion[i].count" + this.staticquestion[i].count);
                this.staticquestion[i].count = this.staticquestion[i].count + 1;
                console.log("this.staticquestion[i].count = this.staticquestion[i].count++;" + this.staticquestion[i].count);
                checkstatic = true;
            }
        }
        if (!checkstatic) {
            if (this.staticquestion.length != 0) {
                this.static.push(this.staticquestion);
            }
            this.static.push({
                choices: [{
                    vocabID: question.choices[0].vocabID,
                    hiragana: question.choices[0].hiragana,
                    romanji: question.choices[0].romanji,
                    thai: question.choices[0].thai
                }, {
                    vocabID: question.choices[1].vocabID,
                    hiragana: question.choices[1].hiragana,
                    romanji: question.choices[1].romanji,
                    thai: question.choices[1].thai
                }, {
                    vocabID: question.choices[2].vocabID,
                    hiragana: question.choices[2].hiragana,
                    romanji: question.choices[2].romanji,
                    thai: question.choices[2].thai
                }, {
                    vocabID: question.choices[3].vocabID,
                    hiragana: question.choices[3].hiragana,
                    romanji: question.choices[3].romanji,
                    thai: question.choices[3].thai
                }],
                stem: {
                    vocabID: question.stem.vocabID,
                    hiragana: question.stem.hiragana,
                    romanji: question.stem.romanji,
                    thai: question.stem.thai
                },
                UserID: this.idCode,
                count: 1
            });
            this.storage.set('staticTable', this.static);
        } else {
            this.storage.set('staticTable', this.staticquestion);
        }

        //   }
        // else{//new
        // let datas = [];
        // datas.push({
        //     choices: [{
        //             vocabID: question[this.indexques].choices[0].vocabID,
        //             hiragana: question[this.indexques].choices[0].hiragana,
        //             romanji: question[this.indexques].choices[0].romanji,
        //             thai: question[this.indexques].choices[0].thai
        //         },{
        //             vocabID: question[this.indexques].choices[1].vocabID,
        //             hiragana: question[this.indexques].choices[1].hiragana,
        //             romanji: question[this.indexques].choices[1].romanji,
        //             thai: question[this.indexques].choices[1].thai
        //         },{
        //             vocabID:  question[this.indexques].choices[2].vocabID,
        //             hiragana: question[this.indexques].choices[2].hiragana,
        //             romanji: question[this.indexques].choices[2].romanji,
        //             thai: question[this.indexques].choices[2].thai
        //         },{
        //             vocabID: question[this.indexques].choices[3].vocabID,
        //             hiragana: question[this.indexques].choices[3].hiragana,
        //             romanji: question[this.indexques].choices[3].romanji,
        //             thai: question[this.indexques].choices[3].thai
        //         }],
        //         stem: {
        //             vocabID: question[this.indexques].stem.vocabID,
        //             hiragana: question[this.indexques].stem.hiragana,
        //             romanji: question[this.indexques].stem.romanji,
        //             thai: question[this.indexques].stem.thai
        //         },
        //         UserID:this.idCode,
        //     count: 1             
        // });
        // this.storage.set('staticTable', datas);
        // }
        // });

        console.log(this.static);
    }

    addtime() {
        if (this.itemtimeclick < 2 && this.numitemtime != 0) {
            this.presentToastadd();
            this.itemtimeclick++;
            --this.numitemtime;
            this.timer.secondsRemaining += 21;

            this.storage.get('itemTable').then((itemTable) => {
                if (itemTable != null) {
                    let data1 = itemTable;
                    for (let i = 0; i < data1.length; i++) {
                        if (data1[i].id == this.idCode) {
                            data1[i].itemA = this.numitemtime;
                        }
                    }
                    this.storage.set('itemTable', data1);
                }
            });

        } else if (this.numitemtime == 0) {
            this.presentToastDhave();
        } else {
            this.presentToastDuse2();
        }
    }

    presentToastadd() {
        let toast = this.toastCtrl.create({
            message: 'Add Time!',
            duration: 1000,
            position: 'middle',
            cssClass: 'itemtoast'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }


    skipQ() {
        if (this.itemskipclick < 2 && this.numitemskip != 0) {
            this.presentToastskip();
            this.itemskipclick++;
            this.numitemskip--;

            this.storage.get('itemTable').then((itemTable) => {
                if (itemTable != null) {
                    let data1 = itemTable;
                    for (let i = 0; i < data1.length; i++) {
                        if (data1[i].id == this.idCode) {
                            data1[i].itemS = this.numitemskip;
                        }
                    }
                    this.storage.set('itemTable', data1);
                }
            });

            this.stoptime();
        } else if (this.numitemskip == 0) {
            this.presentToastDhave();
        } else {
            this.presentToastDuse2();
        }
    }

    presentToastskip() {
        let toast = this.toastCtrl.create({
            message: 'Skip Question!',
            duration: 1000,
            position: 'middle',
            cssClass: 'itemtoast'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

    cutchoice() {
        if (this.cutchoiceclick == 0 && this.numitemcut != 0) {
            this.presentToastcut();
            this.numitemcut--;
            this.cutchoiceclick = 1;
            this.cutran1 = 0;
            this.cutran2 = 0;
            while (this.cutran1 == this.cutran2) {
                this.cutran1 = Math.floor(Math.random() * 4);
                while (this.cutran1 == this.key) {
                    this.cutran1 = Math.floor(Math.random() * 4);
                }
                this.cutran2 = Math.floor(Math.random() * 4);
                while (this.cutran2 == this.key) {
                    this.cutran2 = Math.floor(Math.random() * 4);
                }
                console.log(this.cutran1);
                console.log(this.cutran2);
            }
            this.choicecolor[this.cutran1] = "choicecut";
            this.choicepic[this.cutran1] = "assets/imgs/question/grayC.png";
            this.choicecolor[this.cutran2] = "choicecut";
            this.choicepic[this.cutran2] = "assets/imgs/question/grayC.png";
            this.checkcutchoice[this.cutran1] = false;
            this.checkcutchoice[this.cutran2] = false;

            this.storage.get('itemTable').then((itemTable) => {
                if (itemTable != null) {
                    let data1 = itemTable;
                    for (let i = 0; i < data1.length; i++) {
                        if (data1[i].id == this.idCode) {
                            data1[i].itemC = this.numitemcut;
                        }
                    }
                    this.storage.set('itemTable', data1);
                }
            });
        } else if (this.numitemcut == 0) {
            this.presentToastDhave();
        } else {
            this.presentToastDuse1();
        }

    }

    presentToastcut() {
        let toast = this.toastCtrl.create({
            message: 'Cut Choice!',
            duration: 1000,
            position: 'middle',
            cssClass: 'itemtoast'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

    presentToastDhave() {
        let toast = this.toastCtrl.create({
            message: 'You do not have item!',
            duration: 1000,
            position: 'middle',
            cssClass: 'itemtoast'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }


    presentToastDuse1() {
        let toast = this.toastCtrl.create({
            message: 'Do not use more than 1!',
            duration: 1000,
            position: 'middle',
            cssClass: 'itemtoast'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

    presentToastDuse2() {
        let toast = this.toastCtrl.create({
            message: 'Do not use more than 2!',
            duration: 1000,
            position: 'middle',
            cssClass: 'itemtoast'
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
}