import { GenratorProvider } from './../../providers/genrator/genrator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, LoadingController, AlertController, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ViewOrderPage } from '../view-order/view-order';

import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  @ViewChild(Content) content: Content;

  customerOrders = [];
  oriantation = "";

  isBusy = false;
  isEmpty = false;
  loading;
  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: this.trans.instant('LOADING')
      });
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public genrator: GenratorProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public trans: TranslateService, public config: Config) {
    config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }

    this.getOrders(localStorage.getItem("customerid"));
  }

  ionViewWillEnter() {
    this.getOrders(localStorage.getItem("customerid"));
  }

  show() {
    this.isBusy = true;
  }

  hide() {
    this.isBusy = false;
  }


  getOrders(customerId) {
    // let loader = this.loadingCtrl.create({
    //   content: this.trans.instant('LOADING'),
    // });
    // loader.present();
    this.show();
    return this.genrator.getCustomerOrder(customerId,localStorage.getItem('lang')).subscribe((data) => {
      this.customerOrders = data['orders'];
      let orders = [];
      orders = data['orders'];
      if (orders.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
      console.log(this.customerOrders);
      this.hide();
      // loader.dismiss();
    }, (err) => {
      this.hide();
      // loader.dismiss();
      // let alert = this.alertCtrl.create({
      //   title: this.trans.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.trans.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();
      console.log(err);
    });
  }


  reload() {
    this.customerOrders = [];
    this.getOrders(localStorage.getItem("customerid"));
  }


  goOrderDetails(id) {
    this.app.getRootNav().push(ViewOrderPage, {
      orderid: id,
    });
  }




}
