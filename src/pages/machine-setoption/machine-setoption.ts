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
  mealType;
  lstMeal = [];
  formval = new Set();
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
      this.lstMeal = this.model.lstMeal;
      this.switchBool(1);

      this.mealType = this.lstMeal[0].mealType;

    }, error => {
      this.common.LoadingHide();
      //this.common.Alert(error);
      this.common.GotoHomePage();
    });

  }

  switchBool(stype) {
    if (stype === 1) {
      // this.model.option.allow_takepre = this.model.option.allow_takepre == '1';
      // this.model.option.allow_localorder = this.model.option.allow_localorder == '1';
      // this.model.option.allow_localordermulti = this.model.option.allow_localordermulti == '1';
      this.model.option.allow_takehold = this.model.option.allow_takehold == '1';
      this.model.option.rice_isfree = this.model.option.rice_isfree == '1';

      this.formval.clear();
      this.lstMeal.map(meal => {
        this.formval[meal.mealType] = new Set();
        this.formval[meal.mealType]["allow_takepre"] = false;
        this.formval[meal.mealType]["allow_localorder"] = false;
        this.formval[meal.mealType]["allow_localordermulti"] = false;
      });

      if (this.model.option.allow_takepre != null) {
        let items = this.model.option.allow_takepre.split('|');
        items.forEach(item => {
          let values = item.split(':');
          if (this.formval[values[0]]!=undefined)
            this.formval[values[0]]["allow_takepre"] = values[1] == '1';
        });
      }
      if (this.model.option.allow_localorder != null) {
        let items = this.model.option.allow_localorder.split('|');
        items.forEach(item => {
          let values = item.split(':');
          if (this.formval[values[0]]!=undefined){
            this.formval[values[0]]["allow_localorder"] = values[1] === '1';
          }
          
        });
      }
      if (this.model.option.allow_localordermulti != null) {
        let items = this.model.option.allow_localordermulti.split('|');
        items.forEach(item => {
          let values = item.split(':');
          if (this.formval[values[0]]!=undefined)
            this.formval[values[0]]["allow_localordermulti"] = values[1] == '1';
        });
      }

    } else {
      // this.model.option.allow_takepre = this.model.option.allow_takepre ? '1' : '0';
      // this.model.option.allow_localorder = this.model.option.allow_localorder ? '1' : '0';
      // this.model.option.allow_localordermulti = this.model.option.allow_localordermulti ? '1' : '0';
      this.model.option.allow_takehold = this.model.option.allow_takehold ? '1' : '0';
      this.model.option.rice_isfree = this.model.option.rice_isfree ? '1' : '0';

      let allow_takepre = "", allow_localorder = "", allow_localordermulti = "";
      this.lstMeal.map(meal => {
        allow_takepre += "|" + meal.mealType + ":" + (this.formval[meal.mealType]['allow_takepre'] == true ? "1" : "0");
        allow_localorder += "|" + meal.mealType + ":" + (this.formval[meal.mealType]['allow_localorder'] == true ? "1" : "0");
        allow_localordermulti += "|" + meal.mealType + ":" + (this.formval[meal.mealType]['allow_localordermulti'] == true ? "1" : "0");

      });
      this.model.option.allow_takepre = allow_takepre.substr(1);
      this.model.option.allow_localorder = allow_localorder.substr(1);
      this.model.option.allow_localordermulti = allow_localordermulti.substr(1);
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
