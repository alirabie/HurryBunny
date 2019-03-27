import { HomePage } from './../home/home';
import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App, Events, Platform, ViewController, ModalController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { TranslateService } from '@ngx-translate/core';
import { ResturantInfoPage } from '../../pages/resturant-info/resturant-info';
import { ShoppingCartPage } from '../../pages/shopping-cart/shopping-cart';
import { LoginPage } from '../login/login';
import { ResturantReviewPage } from '../resturant-review/resturant-review';
import { min } from 'rxjs/operators';

declare let google;

@IonicPage()
@Component({
  selector: 'page-main-screen',
  templateUrl: 'main-screen.html',
})
export class MainScreenPage {

  resturants = [];
  resturansCopy = [];
  ads = [];
  oriantation = "";
  badgeValue;
  searchTerm = "";
  noBranches;
  serviceType;
  userLat = 0;
  userLng = 0;

  isBusy = false;
  empty = false;
  customerLocation;


  public buttonClicked: boolean = false; //Whatever you want to initialise it as
  public onButtonClick() {

    this.buttonClicked = !this.buttonClicked;
  }


  constructor(public navCtrl: NavController, public modelCtrl: ModalController, public viewCtrl: ViewController, public platform: Platform, public navParams: NavParams, public genrator: GenratorProvider, public loadingCtrl: LoadingController, public alertCrtl: AlertController, public translate: TranslateService, public app: App, public events: Events) {

    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }


    this.customerLocation = JSON.parse(localStorage.getItem('locationId'));
    console.log(this.customerLocation);



    // if(localStorage.getItem("lastresturant")!=null){
    //   let modal = this.modelCtrl.create(ResturantReviewPage,{},{showBackdrop:true, enableBackdropDismiss:true  });
    //   modal.present();
    // }



    this.serviceType = "1";
    this.getResturantsByDeliveryType(1);
    this.getAds();
    

  

  }

  


  show() {
    this.isBusy = true;
  }

  hide() {
    this.isBusy = false;
  }

  ionViewDidEnter() {

    this.serviceType = "1";
    this.getResturantsByDeliveryType(1);
    this.getAds();

    //*************************** */


    this.events.subscribe('cart:updated', () => {
      this.setCartCount();
      // this.serviceType="2";
      // this.getResturantsByDeliveryType(2);
    });

  
    if (localStorage.getItem("customerid") != null) {

      this.getShoppingCartCount(localStorage.getItem("customerid"))

    }



  }


  goToLocationPage() {

    this.app.getRootNav().push(HomePage, {
      flag: "main"
    }).then(() => {
      // first we find the index of the current view controller:
      const index = this.viewCtrl.index;
      // then we remove it from the navigation stack

    });;


  }

  ionViewDidLoad() {
    this.setCartCount();
    console.log('ionViewDidLoad MainScreenPage');
    this.events.subscribe('user:locationchangedaction', () => {
      this.customerLocation = JSON.parse(localStorage.getItem('locationId'));
      this.serviceType = "1";
      this.getResturantsByDeliveryType(1);
      this.getAds();
    });
  }



  loadCartPage() {
    if (localStorage.getItem("customerid") === null) {
      this.navCtrl.push(LoginPage);
    } else if (localStorage.getItem('cartCount') == '0') {

      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('cartempty'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();

    } else {
      this.navCtrl.push(ShoppingCartPage);
    }
  }




  //Delivery type segment control
  switchDeliveryType(event) {

    this.getResturantsByDeliveryType(event.value)
  }


  //Loading resturants from server service
  getResturants() {
    this.show();

    return this.genrator.getResturants(this.customerLocation.location.latitude, this.customerLocation.location.longtitude,localStorage.getItem('lang')).then((data) => {


      this.resturants = data['vendors'];
      this.resturansCopy = data['vendors'];

      console.log(this.resturants);
      this.hide();

    }, (err) => {

      this.hide();
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);

    })
  }


  //Loading resturants from server and filter by deliveryType
  getResturantsByDeliveryType(type) {
    this.show();

    this.resturants = [];
    this.resturansCopy = [];

    console.log("lat " + this.customerLocation.location.latitude);
    console.log("lng " + this.customerLocation.location.longtitude);
    return this.genrator.getResturants(this.customerLocation.location.latitude, this.customerLocation.location.longtitude,localStorage.getItem('lang')).then((data) => {
      this.resturants = [];
      this.resturansCopy = [];
      let vendors = data['vendors'];
      for (let i = 0; i < vendors.length; i++) {
        let vendor = vendors[i];
        if (vendor.Settings != null) {
          if (vendor.Settings.ServiceTypeId == type || vendor.Settings.ServiceTypeId == 3) {

            if (type == 2) {
              let branches = [];
              branches = vendor['Branches'];

              for (let branch of vendor['Branches']) {
                let updatedVendor = {
                  id: vendor.id,
                  name: vendor.name,
                  branchName: branch.branch_name,
                  branchid: branch.id,
                  lat: branch.latitude,
                  lng: branch.longtitude,
                  bounds: this.getDistance(branch.bounds),
                  addressid: vendor.addressid,
                  rating: vendor.rating,
                  address: vendor.address,
                  description: vendor.description,
                  PrictureId: vendor.PrictureId,
                  profile_image: vendor.profile_image,
                  Settings: vendor.Settings,
                  OpeningHours: vendor.OpeningHours,
                  Branches: []
                }
                this.resturants.push(updatedVendor);
              }


              // this.resturants.push(vendor);
            } else {
              this.resturants.push(vendor);
            }

            this.resturants.sort(function (a, b) {
              return a.bounds - b.bounds;
            });

          }

          if (this.resturants.length == 0) {
            this.empty = true;
          } else {
            this.empty = false;
          }
        }
      }

      console.log(this.resturants);

      this.resturansCopy = this.resturants;
      this.hide();

    }, (err) => {

      this.hide();
      // let alert = this.alertCrtl.create({
      //   title: this.translate.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();
      console.log(err);

    })
  }






  //Go resturant info Page 
  goResturantInfo(id, branchid, distance) {
    this.app.getRootNav().push(ResturantInfoPage, {
      resid: id,
      branchId: branchid,
      serviceType: this.serviceType,
      distace: distance
    });
  }



  setCartCount() {
    if (localStorage.getItem("cartCount") == "0") {
      this.badgeValue = null;
    } else {
      this.badgeValue = localStorage.getItem("cartCount");
    }
  }



  compareResturantId(resId) {
    if (resId == localStorage.getItem("resId")) {
      return true;
    } else {
      return false;
    }
  }

  comparebranchId(branchId) {
    if (branchId != null) {
      if (branchId == localStorage.getItem("branchId")) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }

  }



  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId,localStorage.getItem('lang')).subscribe((data) => {
      let items = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length);

      if (items.length == 0) {
        localStorage.removeItem("resId");
        localStorage.setItem("resName", "");
        localStorage.setItem("deliveryFees", "0");
      } else {
        let item = items[0];
        localStorage.setItem("resId", item.product.vendor_id);
        console.log(localStorage.getItem("resId"));
      }
      this.events.publish('cart:updated');
    });
  }






  setFilteredLocations() {


    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.resturants = this.resturants.filter(it => {
        return it.name.includes(this.searchTerm); // only filter country name
      });
      if (this.resturants.length == 0) {
        this.empty = true;
      } else {
        this.empty = false;
      }
    } else {
      this.resturants = this.resturansCopy;
      this.empty = false;

    }

  }

  onCancel() {
    this.serviceType = 1;
  }










  getAds() {
    return this.genrator.getAdds().subscribe((data) => {


      this.ads = data['Advertisements'];

      this.ads.length
      console.log(this.ads);


    }, (err) => {

      this.hide();
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();


    });
  }





  goResturantInfoFromAd(id) {

    this.genrator.getResturantInfoForAds(id,localStorage.getItem('lang')).subscribe((data) => {
      let vendors = data['vendors'];
      let resturantInfo = vendors[0];

      switch (resturantInfo.Settings.ServiceTypeId) {
        case 1:

          this.app.getRootNav().push(ResturantInfoPage, {
            resid: id,
            branchId: null,
            serviceType: "1",
            distace: 0
          });
          break;

        case 2:

          let branches = [];
          branches = resturantInfo['Branches'];
          let branch = branches[0];
          this.app.getRootNav().push(ResturantInfoPage, {
            resid: id,
            branchId: branch.id,
            distace: this.getDistance(branch.bounds),
            serviceType: "2"
          });
          break;

        case 3:

          let branches2 = [];
          branches2 = resturantInfo['Branches'];
          let branch2 = branches[0];
          this.app.getRootNav().push(ResturantInfoPage, {

            resid: id,
            branchId: branch2.id,
            distace: this.getDistance(branch.bounds),
            serviceType: this.serviceType
          });
          break;
      }

    }, (err) => {
      console.log(err);
    });

  }








  getDistance(bounds) {
    //Convert bounds to Array of lat/lng and get distance between current location and each item and get Min value
    if (bounds != null) {
      var coordsArray = bounds.split(",");
      var path = [];
      for (var i = 0; i < coordsArray.length; i++) {
        path.push(this.checkDistance(coordsArray[i], coordsArray[i + 1]));
        i++;
      }
      console.log(path);
      return Math.min.apply(Math, path)
    } else {
      return 0;
    }
  }



  //Get distance 
  checkDistance(lat, lng) {
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






