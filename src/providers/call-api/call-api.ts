import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER } from './../../app/app.config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the CallApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallApiProvider {
  urlStatic = SERVER + '/api/setVocabMistake/';
  urlScore = SERVER + '/api/updateScoreStudent/';
  constructor(public http: Http,public HttpClient:HttpClient) {
    console.log('Hello CallApiProvider Provider');
  }

  LastStage(callback){
    
  }

  getCallStaticSave(callback, staticVocab) {
    let headers = new Headers(
        {'Content-Type': 'application/json' 
    });
    let options = new RequestOptions({ headers: headers });    
    let postParams = {        
          content: staticVocab      
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.urlStatic,postParams,options)
      .toPromise()
      .then((response) =>
      {
        callback(response.json());

      })
      .catch((error) =>
      {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        callback(error.json());
      });
    });
  }

  getCallScoreSave(callback, scoreForSave) {
        let headers = new Headers(
        {'Content-Type': 'application/json' 
    });
    let options = new RequestOptions({ headers: headers });    
    let postParams = {
          content: scoreForSave 
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.urlScore,postParams,options)
      .toPromise()
      .then((response) =>
      {
        callback(response.json());

      })
      .catch((error) =>
      {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        callback(error.json());
      });
    });
  }
}
