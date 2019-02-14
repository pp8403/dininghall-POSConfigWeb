import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { HttpRequestProvider } from '../../providers/http-request/http-request';

/**
 * Generated class for the MachineListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-machine-list',
  templateUrl: 'machine-list.html',
})
export class MachineListPage {

  formValue = new Map();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private common: CommonProvider,
    private http: HttpRequestProvider,
    ) {

  }

  ionViewDidEnter() {
    this.common.LoadingShow();
    this.http.Request("getMachineList", {}).then(res=>{
      this.common.LoadingHide();
      this.formValue["MachineList"] = res.data;
    },error=>{
      this.common.LoadingHide();
      //this.common.Alert(error);
    });

  }
  
  gotoMInfo(mid){
    this.navCtrl.push("MachineSetoptionPage",{mid:mid});
  }
  gotoActualList(mid){
    this.navCtrl.push("ActualListPage",{mid:mid});
  }
  refreshMachine(mid){
    this.common.LoadingShow();
    this.http.Request("refreshMachine", {mid:mid}).then(res=>{
      this.common.LoadingHide();
      this.common.Toast('已成功发送刷新命令!');
      
    },error=>{
      this.common.LoadingHide();
      //this.common.Alert(error);
    });
  }
}
