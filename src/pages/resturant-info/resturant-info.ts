import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, NavParams, LoadingController, AlertController, Config, Events, Platform } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { TranslateService } from '@ngx-translate/core';
import { MealInfoPage } from '../meal-info/meal-info'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { SuperTabs } from 'ionic2-super-tabs';
import { LoginPage } from '../login/login';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';




@IonicPage()
@Component({
  selector: 'page-resturant-info',
  templateUrl: 'resturant-info.html',
})
export class ResturantInfoPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  oriantation = "";
  SwipedTabsIndicator: any = null;
  tabs: any = [];

  badgeValue;
  resturantName: "";
  resturantId: "";
  resrate: 0;
  resImage;
  resSettings;
  openingHours;
  resDiscription;
  serviceTypeId;
  resturantInfo;
  branchId="";
  distance=0;

  categories = [];
  meals = [];
  resturantReviews = [];
  branches = [];
  userRatingInputValue = 0;
  public form: FormGroup;
  isBusy = false;
  customerLocation;
  categoryActive: any
  selectPickup(categoryActive) {
    this.categoryActive = categoryActive;
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public loader: LoadingController,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    private _FB: FormBuilder,
    public config: Config,
    public platform : Platform,
    public events: Events) {
    // , this.translate.instant('info')

    this.tabs = [this.translate.instant('menu'), this.translate.instant('reviews'), this.translate.instant('info')];
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));

    this.resturantId = this.navParams.get("resid");
    this.serviceTypeId = this.navParams.get("serviceType");
    this.branchId = navParams.get('branchId');
    this.distance=navParams.get('distace');

    this.customerLocation = JSON.parse(localStorage.getItem('locationId'));
    console.log(this.customerLocation);

    if (localStorage.getItem('lang') == "en") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }


    this.getResturantInfo(this.resturantId);
   
    



    this.form = _FB.group({
      reviewtxt: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
      review_value: ['', Validators.compose([Validators.required])],
    });

  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.events.subscribe('cart:updated', () => {
      this.setCartCount();
    });

    if (localStorage.getItem("customerid") != null) {

      this.getShoppingCartCount(localStorage.getItem("customerid"))

    }
  }


  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // this condition is to avoid passing to incorrect index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }

  }

  animateIndicator($event) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
  }

  public buttonClicked: boolean = false; //For Rating button
  public onButtonClick() {

    if (localStorage.getItem("customerid") === null) {
      this.navCtrl.push(LoginPage);
    } else {
      this.buttonClicked = !this.buttonClicked;
    }

  }



  //get resturant categories
  getResturantCategories() {
    // let loader = this.loader.create({
    //   content: this.translate.instant('LOADING'),
    // });
    // loader.present();
    return this.genrator.getCategories(this.resturantId).subscribe((data) => {

      this.categories = data['categories'];
      let category = this.categories['0'];
      this.getMealslist(category.id);
      this.selectPickup(category);
    
      // loader.dismiss();

    }, (err) => {

      // loader.dismiss();
      // let alert = this.alertCtrl.create({
      //   title: this.translate.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();
      console.log(err);

    });
  }

  show() {
    this.isBusy = true;
  }

  hide() {
    this.isBusy = false;
  }

  getMealslist(id) {
    // let loader = this.loader.create({
    //   content: this.translate.instant('LOADING'),
    // });
    // loader.present();
    this.show();
    return this.genrator.getMeals(id).subscribe((data) => {

      this.meals = data['products'];
      this.hide();

    }, (err) => {

      // this.hide();
      // let alert = this.alertCtrl.create({
      //   title: this.translate.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();

      console.log(err);

    });
  }



  //Get resturant reviews 
  getResturantReviews() {
    // let loader = this.loader.create({
    //   content: this.translate.instant('LOADING'),
    // });
    // loader.present();
    return this.genrator.getResturantReviews(this.resturantId).subscribe((data) => {
      this.resturantReviews = data['ratings'];
      // loader.dismiss();
    }, (err) => {
      // loader.dismiss();
      // let alert = this.alertCtrl.create({
      //   title: this.translate.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();

      console.log(err);
    });





  }


  //Add resturant review 
  addResturantReview(value) {


    let resturantReview = {
      "rating": {
        "customer_id": localStorage.getItem("customerid"),
        "expert_id": this.resturantId,
        "review_text": value.reviewtxt + "",
        "rating": value.review_value + ""
      }
    }

    // console.log(resturantReview);

    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });

    this.genrator.addResturantReview(resturantReview).then((result: any) => {
      loader.dismiss();
      console.log(result);

      if (result['ratings'] != null) {
        this.form.reset();
        this.getResturantReviews();
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('reviewsucsess'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: result.ErrorMessage,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();

      }

    }, (err) => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: err,
        buttons: ['Disms']
      });
      alert.present();
    });



  }




  setCartCount() {
    if (localStorage.getItem("cartCount") == "0") {
      this.badgeValue = null;
    } else if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {
      this.badgeValue = localStorage.getItem("cartCount");
    } else {
      this.badgeValue = null;
    }
  }




  getShoppingCartCount(custId) {
    if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {
      this.genrator.getShoppingCartItems(custId).subscribe((data) => {
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
  }


  compareResturantId() {


    if (this.branchId != null) {
      if (this.branchId== localStorage.getItem("branchId")) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.resturantId == localStorage.getItem("resId")) {
        return true;
      } else {
        return false;
      }
    }








   
  }


  loadCartPage() {
    if (localStorage.getItem("customerid") === null) {
      this.navCtrl.push(LoginPage);
    } else if (localStorage.getItem('cartCount') == '0' || localStorage.getItem("resId") != this.resturantId) {

      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('cartempty'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();

    } else {
      this.navCtrl.push(ShoppingCartPage, {
        resName: this.resturantName,
        resImage: this.resImage,
        resdescription: this.resDiscription,
        resServiceTypeId: this.serviceTypeId,
        menumunCharge: this.resSettings.MinimumOrderAmount,
        resturantId: this.resturantId
      });
    }
  }






















  goMealInfoPage(id, name) {

    this.navCtrl.push(MealInfoPage, {
      mealId: id,
      mealName: name,
      resImage: this.resImage,
      returantName: this.resturantName,
      resturantSettings: JSON.stringify(this.resSettings),
      resdescription: this.resDiscription,
      resServiceTypeId: this.serviceTypeId,
      menumunCharge: this.resSettings.MinimumOrderAmount,
      resturantId: this.resturantId,
      branchId : this.branchId
    });

  }



  //Get resturant info by id
  getResturantInfo(resId) {
    return this.genrator.getResturantInfo(resId).subscribe((data) => {
      let vendors = data['vendors'];
      this.resturantInfo = vendors[0];


      this.resturantName = this.resturantInfo.name;
      this.resrate = this.resturantInfo.rating;
      this.resImage = this.resturantInfo.profile_image;
      this.resSettings = this.resturantInfo.Settings;
      this.openingHours = this.resturantInfo.OpeningHours;
      this.resDiscription = this.resturantInfo.description;
      this.branches = this.resturantInfo.Branches;
      this.getResturantCategories();
      this.getResturantReviews();
      console.log(this.resturantInfo);
      // loader.dismiss();
    }, (err) => {
      console.log(err);
    });
  }


  goMap(lat, lng,name) {
    let destination = lat + ',' + lng;
    if(this.platform.is('ios')){
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI(name);
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }




 


}
