import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { HttpRequestProvider } from '../../providers/http-request/http-request';

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
  name:string;
  pwd:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private common:CommonProvider,
    private http:HttpRequestProvider,
    ) {
  }

  login(){
    this.common.LoadingShow();
    this.http.Request("login", {name:this.name,pwd:this.pwd}).then(res=>{
      this.common.LoadingHide();
      
      this.common.SetStorage(this.common.LSName_Token,res.data).then(()=>{
        this.common.GotoHomePage();
      });
    },error=>{
      this.common.LoadingHide();
      //this.common.Alert(error);
    });

  }

}
