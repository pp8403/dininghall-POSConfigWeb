import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { HttpRequestProvider } from '../../providers/http-request/http-request';


/**
 * Generated class for the ActualListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actual-list',
  templateUrl: 'actual-list.html',
})
export class ActualListPage {

  model: any = { machineInfo: {}, actualList: [] };
  mid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private common: CommonProvider,
    private http: HttpRequestProvider,
    private modalCtrl: ModalController,
  ) {
    this.mid = navParams.get("mid");
  }

  ionViewDidEnter() {
    this.common.LoadingShow();
    this.http.Request("getActualList", { mid: this.mid }).then(res => {
      this.common.LoadingHide();
      this.model = res.data;
    }, error => {
      this.common.LoadingHide();
      //this.common.Alert(error);
      this.common.GotoHomePage();
    });

  }

  showChoosePro(actualId, actualDate, mealTypeName) {
    let modal = this.modalCtrl.create('ChooseproPage', { mid: this.mid, actualId: actualId, actualDate: actualDate, mealTypeName: mealTypeName });
    modal.onDidDismiss(data => {
      if (data) {

        this.common.LoadingShow();
        this.http.Request("setMachinePro", { mid: this.mid, actualId: actualId, prolist: data }).then(res => {
          this.common.LoadingHide();
          this.common.Toast('设置完成', 'bottom');
        }, error => {
          this.common.LoadingHide();
          //this.common.Alert(error);
        });
      }
    });
    modal.present();
  }
  getpro(actualId, actualDate, mealTypeName) {
    this.common.LoadingShow();
    this.http.Request("getActualProList", { mid: this.mid, actualId: actualId }).then(res => {
      this.common.LoadingHide();
      let alert = this.common.alertCtrl.create();
      alert.setTitle(`${actualDate} - ${mealTypeName}`);
      let prolist = res.data;
      prolist.map(pro => {
        alert.addInput({
          type: 'checkbox',
          label: pro.proname,
          value: pro.proid + '|' + pro.obj_type,
          checked: pro.seted
        });

      });
      alert.addButton('取消');
      alert.addButton({
        text: '确定',
        handler: data => {

          this.http.Request("setMachinePro", { mid: this.mid, actualId: actualId, proids: data }).then(res => {
            this.common.LoadingHide();
            if (data.length == 0)
              this.common.Alert("未选择任何餐品！");
            else
              this.common.Toast('设置完成', 'bottom');
          }, error => {
            this.common.LoadingHide();
            //this.common.Alert(error);
          });
        }
      });
      alert.present();

    }, error => {
      this.common.LoadingHide();
      //this.common.Alert(error);
    });
  }
  gotoProseted() {
    this.navCtrl.push("MachineSetedproPage", { mid: this.mid });
  }
}
