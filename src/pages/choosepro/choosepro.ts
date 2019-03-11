import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { HttpRequestProvider } from '../../providers/http-request/http-request';

/**
 * Generated class for the ChooseproPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosepro',
  templateUrl: 'choosepro.html',
})
export class ChooseproPage {
  mid;
  actualId;
  actualDate;
  mealTypeName;
  prolist=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private common:CommonProvider,
    private http:HttpRequestProvider,
    private viewCtrl:ViewController,
    ) {
    this.mid=navParams.get('mid');
    this.actualId=navParams.get('actualId');
    this.actualDate=navParams.get('actualDate');
    this.mealTypeName=navParams.get('mealTypeName');
  }

  ionViewDidEnter() {
    this.common.LoadingShow();
    this.http.Request("getActualProList", {mid:this.mid,actualId:this.actualId}).then(res=>{
      this.common.LoadingHide();
      this.prolist=res.data;
      
    },error=>{
      this.common.LoadingHide();
      //this.common.Alert(error);
    });

  }

  cancel(){
    this.viewCtrl.dismiss();
  }
  save(){
    this.viewCtrl.dismiss(this.prolist);
  }
}
