import { GenratorProvider } from './../../providers/genrator/genrator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.html',
})
export class ViewOrderPage {
  oriantation = "";
  orderDetalis = [];
  orderItems = [];

  order = "";
  vieworder;
  status1 = { stImage: "./assets/imgs/view-order/step-1.png" };
  status2 = { stImage: "./assets/imgs/view-order/step-2.png" };
  status3 = { stImage: "./assets/imgs/view-order/step-3.png" };

  pickUpstatus1 = { stImage: "./assets/imgs/view-order/Pickup/step-1.png" }
  pickUpstatus2 = { stImage: "./assets/imgs/view-order/Pickup/step-2.png" }
  pickUpstatus3 = { stImage: "./assets/imgs/view-order/Pickup/step-3.png" }

  statusActive = "step active";
  statusDisActive = "step";
  orderId = "";
  serviceTypeId = "";

  status = "";
  active1 = "";
  active2 = "";
  active3 = "";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public trans: TranslateService,
    public alertCtrl: AlertController,
    public launchNavigator: LaunchNavigator,
    public loadingCtrl: LoadingController) {

    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }

    this.vieworder = "details";

    this.orderId = navParams.get("orderid");
    this.getOrderDetails(this.orderId);





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderPage');
  }




  //Get Order Details
  getOrderDetails(orderId) {
    this.showLoading();
    return this.genrator.getOrderDetails(orderId, localStorage.getItem('lang')).subscribe((data) => {
      this.orderDetalis = data['orders'];
      let orderItem = this.orderDetalis[0];

      this.serviceTypeId = orderItem.service_type_id;
      //Order status by service type id
      if (orderItem.service_type_id == 1) {
        this.changeOrderStatus(orderItem.order_status_id);
      } else if (orderItem.service_type_id == 2) {
        this.changeOrderStatusPickup(orderItem.order_status_id);
      }

      this.order = orderItem;
      this.orderItems = orderItem['order_items'];
      console.log(this.order);
      this.dismissLoading();
    }, (err) => {
      this.dismissLoading();
      // let alert = this.alertCtrl.create({
      //   title: this.trans.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.trans.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();
      console.log(err);
    })

  }


  calcEachItemPrice(orderItem) {
    let total = 0;

    total = orderItem.product.price * orderItem.quantity;

    for (let i = 0; i < orderItem.additions.length; i++) {
      let addition = orderItem.additions[i];
      total += (addition.price * addition.quantity);
    }

    for (let i = 0; i < orderItem.customizations.length; i++) {
      let customize = orderItem.customizations[i];
      total += (customize.price * customize.quantity)
    }

    return total;
  }



  //Control order status method 
  changeOrderStatus(statusId) {

    switch (statusId) {

      case 70:
        this.status = this.status1.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusDisActive;
        this.active3 = this.statusDisActive;
        break;
      case 20:
        this.status = this.status2.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusDisActive;
        break;
      case 30:
        this.status = this.status3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;
      case 40:
        this.status = this.status1.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusDisActive;
        this.active3 = this.statusDisActive;
        break;
      case 50:
        this.status = this.status3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;

      case 60:
        this.status = this.status3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;


      case 80:
        this.status = this.status3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;
    }



  }



  //Control order status method when Pickup
  changeOrderStatusPickup(statusId) {

    switch (statusId) {

      case 70:
        this.status = this.pickUpstatus1.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusDisActive;
        this.active3 = this.statusDisActive;
        break;
      case 20:
        this.status = this.pickUpstatus2.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusDisActive;
        break;
      case 30:
        this.status = this.pickUpstatus3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;
      case 40:
        this.status = this.pickUpstatus1.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusDisActive;
        this.active3 = this.statusDisActive;
        break;
      case 50:
        this.status = this.pickUpstatus3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;

      case 60:
        this.status = this.pickUpstatus3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;

      case 80:
        this.status = this.pickUpstatus3.stImage;
        this.active1 = this.statusActive;
        this.active2 = this.statusActive;
        this.active3 = this.statusActive;
        break;
    }



  }



  cancelOrder() {
    this.showLoading();
    this.genrator.changeOrderStatus(localStorage.getItem("customerid"), this.orderId, 40).then((data) => {
      let alert = this.alertCtrl.create({
        title: this.trans.instant('PAGE_TITLE.dilog'),
        subTitle: this.trans.instant('ordercanceld'),
        buttons: [this.trans.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      this.navCtrl.pop();

      this.dismissLoading();
    }, (err) => {
      this.dismissLoading();
      let alert = this.alertCtrl.create({
        title: this.trans.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.trans.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);
    });

  }



  reOrder() {
    this.showLoading();
    this.genrator.reorder(this.orderId).then((data) => {
      if (data['orders'] != null) {
        let alert = this.alertCtrl.create({
          title: this.trans.instant('PAGE_TITLE.dilog'),
          subTitle: this.trans.instant('reorderdone'),
          buttons: [this.trans.instant('BUTTONS.dissmiss')]
        });
        alert.present();
        this.navCtrl.pop();
      }
      this.dismissLoading();
    }, (err) => {
      this.dismissLoading();
      let alert = this.alertCtrl.create({
        title: this.trans.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.trans.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);
    });
  }


  goBranchLocation(bounds) {
    if (bounds != null) {

      var coordsArray = bounds.split(",");
      let lat = localStorage.getItem("userLat");
      let lng = localStorage.getItem("userLng");
      console.log(lat, lng);
      this.launchNavigator.navigate([parseFloat(coordsArray[0]), parseFloat(coordsArray[1])], {
        start: lat + "," + lng
      });
    } else {
      alert("No Location");
    }
  }

}
