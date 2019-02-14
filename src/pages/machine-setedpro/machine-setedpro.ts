import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { HttpRequestProvider } from '../../providers/http-request/http-request';

/**
 * Generated class for the MachineSetedproPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-machine-setedpro',
  templateUrl: 'machine-setedpro.html',
})
export class MachineSetedproPage {
  mid: string;
  model: any = { machineInfo: {} ,actualList:[]};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private common: CommonProvider,
    private http: HttpRequestProvider,
    ) {
    this.mid = navParams.get("mid");
  }

  ionViewDidEnter() {
    this.common.LoadingShow();
    this.http.Request("getMachineSetedProductList_all", {mid:this.mid}).then(res=>{
      this.common.LoadingHide();
      
      this.model=res.data;
      if (this.model.actualList == null || this.model.actualList.length <= 0) {
        this.common.Toast("该设备尚未设置可提供餐品！");
      }
      
    },error=>{
      this.common.LoadingHide();
      //this.common.Alert(error);
    });

  }
}
