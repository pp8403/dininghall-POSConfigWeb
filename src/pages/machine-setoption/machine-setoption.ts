import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { HttpRequestProvider } from '../../providers/http-request/http-request';

/**
 * Generated class for the MachineSetoptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-machine-setoption',
  templateUrl: 'machine-setoption.html',
})
export class MachineSetoptionPage {

  model: any = { option: {} };
  mid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private common: CommonProvider,
    private http: HttpRequestProvider,
  ) {
    this.mid = navParams.get("mid");
  }

  ionViewDidEnter() {
    this.common.LoadingShow();
    this.http.Request("getMachineInfo", { mid: this.mid }).then(res => {
      this.common.LoadingHide();
      this.model = res.data;
      this.switchBool(1);

    }, error => {
      this.common.LoadingHide();
      //this.common.Alert(error);
    });

  }

  switchBool(stype) {
    if (stype === 1) {
      this.model.option.allow_takepre = this.model.option.allow_takepre == '1';
      this.model.option.allow_localorder = this.model.option.allow_localorder == '1';
      this.model.option.allow_localordermulti = this.model.option.allow_localordermulti == '1';
      this.model.option.allow_takehold = this.model.option.allow_takehold == '1';
    } else {
      this.model.option.allow_takepre = this.model.option.allow_takepre ? '1' : '0';
      this.model.option.allow_localorder = this.model.option.allow_localorder ? '1' : '0';
      this.model.option.allow_localordermulti = this.model.option.allow_localordermulti ? '1' : '0';
      this.model.option.allow_takehold = this.model.option.allow_takehold ? '1' : '0';
    }
  }
  save() {
    this.common.LoadingShow();
    this.switchBool(0);
    this.http.Request("setMachineInfo", this.model.option).then(res => {
      this.common.LoadingHide();
      this.common.Toast('保存成功!');
      this.switchBool(1);
    }, error => {
      this.common.LoadingHide();
      //this.common.Alert(error);
      this.switchBool(1);
    });
    
  }
}
