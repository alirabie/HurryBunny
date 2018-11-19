import { ResturantInfoPage } from './../resturant-info/resturant-info';
import { GenratorProvider } from './../../providers/genrator/genrator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, AlertController, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  offers=[];
  constructor(public navCtrl: NavController, public navParams: NavParams , public trans : TranslateService , public app : App , public config : Config , public genrator : GenratorProvider , public alertCtrl : AlertController) {
    config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
    this.getOffers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');
  }

  getOffers(){
    
    return this.genrator.getOffers().subscribe((data) => {
      this.offers = data['Advertisements'];
    
      console.log(this.offers);
     

    }, (err) => {

 
      let alert = this.alertCtrl.create({
        title: this.trans.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.trans.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      

    });
  }



  goResturantInfoFromAd(id) {

    this.genrator.getResturantInfoForAds(id).subscribe((data) => {
      let vendors = data['vendors'];
      let resturantInfo = vendors[0];

      switch (resturantInfo.Settings.ServiceTypeId) {
        case 1:

          this.app.getRootNav().push(ResturantInfoPage, {
            resid: id,
            branchId: null,
            serviceType: "1"
          });
          break;

        case 2:

          let branches = [];
          branches = resturantInfo['Branches'];
          let branch = branches[0];
          this.app.getRootNav().push(ResturantInfoPage, {
            resid: id,
            branchId: branch.id,
            distace : this.getDistance(branch.latitude,branch.longtitude) ,
            serviceType: "2"
          });
          break;

        case 3:
          this.app.getRootNav().push(ResturantInfoPage, {
            resid: id,
            branchId: null,
            serviceType: "1"
          });
          break;
      }

    }, (err) => {
      console.log(err);
    });

  }




  getDistance(lat,lng){


    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(parseFloat(localStorage.getItem("userLat")) - lat);  // deg2rad below
    var dLon = this.deg2rad(parseFloat(localStorage.getItem("userLng")) - lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat)) * Math.cos(this.deg2rad(parseFloat(localStorage.getItem("userLat")))) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Number(d).toFixed(2);
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)

  }

 
}
