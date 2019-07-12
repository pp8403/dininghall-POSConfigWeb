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
  selectAll_status=false;
  selectAll_nowalkin_status=false;

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
      this.prolist.map(m=>{
        m.nowalkin=m.nowalkin=="1";
      });
      this.selectAll_re();
      this.selectAll_re_nowalkin();
    },error=>{
      this.common.LoadingHide();
      //this.common.Alert(error);
    });

  }

  cancel(){
    this.viewCtrl.dismiss();
  }
  save(){
    this.prolist.map(m=>{
      m.nowalkin=m.nowalkin?"1":"0";
    });
    this.viewCtrl.dismiss(this.prolist);
  }


  selectAll(){
    setTimeout(() => {
    this.selectAll_status=!this.selectAll_status;
    this.prolist.map(pro=>{pro.seted=this.selectAll_status});
    }, 200);
  }
  selectAll_nowalkin(){
    setTimeout(() => {
    this.selectAll_nowalkin_status=!this.selectAll_nowalkin_status;
    this.prolist.map(pro=>{pro.nowalkin=this.selectAll_nowalkin_status});
    }, 200);
  }
  selectAll_re(){
    let isAllTrue=true;
    for(let pro of this.prolist){
      if(pro.seted==false){
        isAllTrue=false;
        break;
      }
    }
    this.selectAll_status=isAllTrue;
  }
  selectAll_re_nowalkin(){
    let isAllTrue=true;
    for(let pro of this.prolist){
      if(pro.nowalkin==false){
        isAllTrue=false;
        break;
      }
    }
    this.selectAll_nowalkin_status=isAllTrue;
  }
}
