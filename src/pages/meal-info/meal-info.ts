import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Config } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart'
import { MealsReviewsPage } from '../meals-reviews/meals-reviews';

@IonicPage()
@Component({
  selector: 'page-meal-info',
  templateUrl: 'meal-info.html',
})
export class MealInfoPage {

  oriantation = "";

  resturantId;
  resturantName = "";
  mealName = "";
  mealId = "";
  branchId = "";
  mealInfo = [];
  mealItem: any;
  rating = 0;
  imgaes = [];
  mealAdditions = [];
  mealAdditionsmap = {};
  mealAdditionPriceMap = {};
  mealAdditionsCountsMap = {};
  mealAddisionsStatus = {};

  resSettings;
  deliveryFees;

  resDiscription = "";
  serviceTypeId = "";
  menumumCharge = 0;
  resImage = "";

  mealAttr = [];
  mealAttrValues = [];
  count = 1;
  selectedoption = "";
  optionPrice = 0;
  additionPrice = 0;

  optionsmap = {};
  optinosPricesmap = {};

  selectedCustomizationsIds = [];
  selectedAdditions = [];
  loading;
  showLoading() {
    if (!this.loading) {
      this.loading = this.loader.create({
        content: this.translate.instant('LOADING')
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
    public loader: LoadingController,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public config: Config,
    public genrator: GenratorProvider,
    public events: Events) {
    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.mealName = navParams.get("mealName");
    this.mealId = navParams.get("mealId");
    this.resturantName = navParams.get("returantName");
    this.resImage = navParams.get("resImage");
    this.resDiscription = navParams.get("resdescription");
    this.menumumCharge = navParams.get("menumunCharge");
    this.serviceTypeId = navParams.get('resServiceTypeId');
    this.branchId = navParams.get('branchId');




    this.getMealInfoo();
    this.getAddistios();

  }


  public buttonClicked1: boolean = false; //For expand1
  public onButtonClick1() {
    this.buttonClicked1 = !this.buttonClicked1;
  }

  public buttonClicked2: boolean = false; //For expand2
  public onButtonClick2() {
    this.buttonClicked2 = !this.buttonClicked2;
  }



  getMealInfoo() {
    this.showLoading();
    return this.genrator.getMealInfo(this.mealId, localStorage.getItem('lang')).subscribe((data) => {

      this.dismissLoading();
      this.mealInfo = data['products'];
      this.mealItem = this.mealInfo['0'];
      this.rating = this.mealItem.rating;
      this.resturantId = this.mealItem.vendor_id;

      this.imgaes = this.mealItem['images'];
      this.mealAttr = this.mealItem['attributes'];
      console.log(this.mealItem);

    }, (err) => {

      this.dismissLoading();
      //   let alert = this.alertCtrl.create({
      //     title: this.translate.instant('PAGE_TITLE.dilog'),
      //     subTitle: err,
      //     buttons: [this.translate.instant('BUTTONS.dissmiss')]
      //   });
      //   alert.present();

      console.log(err);

    });


  }


  up() {
    this.count++;
  }

  dwon() {
    if (this.count <= 1) {
      return;
    } else {
      this.count--;
    }
  }

  getOptionPrice(id, price) {
    this.optionPrice = 0;
    this.optinosPricesmap[id] = price * this.count;
    for (var i in this.optinosPricesmap) {
      this.optionPrice += this.optinosPricesmap[i];
    }

  }



  // getAdditionPrice(id,price){
  //   this.additionPrice=0;
  //   this.mealAdditionPriceMap[id]=price;
  //   for(var i in this.mealAdditionPriceMap){
  //     this.additionPrice+=this.mealAdditionPriceMap[i];
  //   }
  // }



  getOptionId(attrId, id) {
    this.optionsmap[attrId] = id;
    // console.log(this.optionsmap);

  }





  getAddistios() {
    return this.genrator.getRelatedProducts(this.mealId, localStorage.getItem('lang')).subscribe((data) => {
      if (data != null) {
        this.mealAdditions = data['products']
      }

    }, (err) => {
      // let alert = this.alertCtrl.create({
      //   title: this.translate.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();
    });
  }






  toggleComponent(event, component) {

    if (event.value) {
      this.mealAddisionsStatus[component.name] = event.value;
      this.mealAdditionsmap[component.name] = component.id;
      this.additionPrice = 0;
      this.mealAdditionsCountsMap[component.name] = this.count;
      this.mealAdditionPriceMap[component.name] = component.price * this.count;
      for (var i in this.mealAdditionPriceMap) {
        this.additionPrice += this.mealAdditionPriceMap[i];
      }



    } else {
      delete this.mealAddisionsStatus[component.name];
      delete this.mealAdditionsmap[component.name];
      this.additionPrice = 0;
      delete this.mealAdditionPriceMap[component.name];
      delete this.mealAdditionsCountsMap[component.name];

      for (var i in this.mealAdditionPriceMap) {
        this.additionPrice += this.mealAdditionPriceMap[i];
      }
    }
  }


  incAdditionCount(addName, price) {
    this.mealAdditionsCountsMap[addName] += 1;
    this.mealAdditionPriceMap[addName] = price * this.mealAdditionsCountsMap[addName];
    this.additionPrice = 0;
    for (var i in this.mealAdditionPriceMap) {
      this.additionPrice += this.mealAdditionPriceMap[i];
    }

  }


  decAdditionCount(addName, price) {
    if (this.mealAdditionsCountsMap[addName] == 1) {
      return;
    } else {
      this.mealAdditionsCountsMap[addName] -= 1;
      this.mealAdditionPriceMap[addName] = price * this.mealAdditionsCountsMap[addName];
      this.additionPrice = 0;
      for (var i in this.mealAdditionPriceMap) {
        this.additionPrice += this.mealAdditionPriceMap[i];
      }
    }
  }





  addToCart() {
    this.selectedCustomizationsIds = [];
    for (var i in this.optionsmap) {
      this.selectedCustomizationsIds.push({ "customization_id": this.optionsmap[i], "product_id": this.mealId });
    }

    console.log(this.selectedCustomizationsIds);

    this.selectedAdditions = [];
    for (var i in this.mealAdditionsmap) {
      this.selectedAdditions.push({ "addition_id": this.mealAdditionsmap[i], "quantity": this.mealAdditionsCountsMap[i], "product_id": this.mealId });
    }




    if (localStorage.getItem("customerid") === null) {

      this.navCtrl.push(LoginPage);

    } else {




      if (this.selectedCustomizationsIds.length != this.mealAttr.length) {

        if (this.mealAttr.length != 0) {

          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: this.translate.instant('addcustomizationsdialog'),
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();

        } else {

          let cartItem = {
            "shopping_cart_item": {
              "id": "null",
              "customer_entered_price": "0",
              "quantity": this.count,
              "created_on_utc": "2018-06-13T16:15:47-04:00",
              "updated_on_utc": "2018-06-13T16:15:47-04:00",
              "shopping_cart_type": "1",
              "product_id": this.mealId,
              "customer_id": localStorage.getItem("customerid"),
              "additions": this.selectedAdditions,
              "customizations": this.selectedCustomizationsIds
            }
          }

          console.log(cartItem);


          if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {

            this.showLoading();

            this.addToShoppingCart(cartItem)


          } else {



            //One resturant dialog
            let alert = this.alertCtrl.create({
              title: this.translate.instant('PAGE_TITLE.dilog'),
              subTitle: this.translate.instant('oneResturant'),
              buttons: [{
                text: this.translate.instant('clearlastcart'),
                handler: () => {
                  this.clearCart(localStorage.getItem("customerid"));
                }
              }, {
                text: this.translate.instant('cancle'),
                handler: () => { }
              }]
            });
            alert.present();



            console.log(this.translate.instant('oneResturant') + localStorage.getItem("resName"));



          }







        }





      } else {




        let cartItem = {
          "shopping_cart_item": {
            "id": "null",
            "customer_entered_price": "0",
            "quantity": this.count,
            "created_on_utc": "2018-06-13T16:15:47-04:00",
            "updated_on_utc": "2018-06-13T16:15:47-04:00",
            "shopping_cart_type": "1",
            "product_id": this.mealId,
            "customer_id": localStorage.getItem("customerid"),
            "additions": this.selectedAdditions,
            "customizations": this.selectedCustomizationsIds
          }
        }

        console.log(cartItem);


        if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {

          this.showLoading();

          this.addToShoppingCart(cartItem);

        } else {



          //One resturant dialog
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: this.translate.instant('oneResturant'),
            buttons: [{
              text: this.translate.instant('clearlastcart'),
              handler: () => {
                this.clearCart(localStorage.getItem("customerid"));
              }
            }, {
              text: this.translate.instant('cancle'),
              handler: () => { }
            }]
          });
          alert.present();



          console.log(this.translate.instant('oneResturant') + localStorage.getItem("resName"));



        }

      }
    }


  }



  clearCart(customerId) {
    this.genrator.clearCart(customerId).then((reult) => {
      localStorage.removeItem("resId");
      localStorage.removeItem("branchId");
      localStorage.setItem("resName", "");
      localStorage.setItem("deliveryFees", "0");

      this.addToCart();
    }, (err) => {
      alert(err);
    });
  }


  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId, localStorage.getItem('lang')).subscribe((data) => {
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

  goMealReviews() {
    this.navCtrl.push(MealsReviewsPage, {
      mealid: this.mealId,
      mealname: this.mealName
    });
  }





  addToShoppingCart(cartItem) {

    if (this.branchId != null) {

      if (localStorage.getItem("branchId") == null || localStorage.getItem("branchId") == this.branchId) {

        this.genrator.addToCart(cartItem).then((result) => {
          if (result['shopping_carts'] != null) {
            console.log(result);

            localStorage.setItem("resName", this.resturantName);
            console.log("goooooooooooooooooooggg" + localStorage.getItem("resName"))

            localStorage.setItem("branchId", this.branchId);

            if (JSON.parse(this.navParams.get("resturantSettings")) != null) {
              let settings = JSON.parse(this.navParams.get("resturantSettings"));
              localStorage.setItem("deliveryFees", settings.DeliveryFees);
            } else {
              localStorage.setItem("deliveryFees", "0");
            }

            this.navCtrl.pop();

            let alert = this.alertCtrl.create({
              title: this.translate.instant('PAGE_TITLE.dilog'),
              subTitle: this.translate.instant('ADEDD'),
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: this.translate.instant('CONTINE'),
                  handler: () => {
                    //ٌResume Shopping


                    console.log(localStorage.getItem("cartCount"))
                    //Update cart count for badge
                    this.getShoppingCartCount(localStorage.getItem("customerid"));
                  }
                },
                {
                  text: this.translate.instant('END'),
                  handler: () => {

                    //Go to shopping cart

                    this.navCtrl.push(ShoppingCartPage, {
                      resName: this.resturantName,
                      resImage: this.resImage,
                      resdescription: this.resDiscription,
                      resServiceTypeId: this.serviceTypeId,
                      menumunCharge: this.menumumCharge,
                      resturantId: this.resturantId
                    });
                    this.getShoppingCartCount(localStorage.getItem("customerid"));

                  }
                }
              ]
            });
            alert.present();


            this.dismissLoading();
          }
        }, (err) => {
          this.dismissLoading();
          console.log(err._body);
          let errString = JSON.stringify(err._body);
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: errString,
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();
        });

      } else {
        this.dismissLoading();
                //One resturant dialog
                let alert = this.alertCtrl.create({
                  title: this.translate.instant('PAGE_TITLE.dilog'),
                  subTitle: this.translate.instant('oneResturant'),
                  buttons: [{
                    text: this.translate.instant('clearlastcart'),
                    handler: () => {
                      this.clearCart(localStorage.getItem("customerid"));
                    }
                  }, {
                    text: this.translate.instant('cancle'),
                    handler: () => { }
                  }]
                });
                alert.present();

      }

      this.dismissLoading();


    } else {



      this.genrator.addToCart(cartItem).then((result) => {
        if (result['shopping_carts'] != null) {
          console.log(result);

          localStorage.setItem("resName", this.resturantName);
          console.log("goooooooooooooooooooggg" + localStorage.getItem("resName"))

          localStorage.setItem("branchId", this.branchId);

          if (JSON.parse(this.navParams.get("resturantSettings")) != null) {
            let settings = JSON.parse(this.navParams.get("resturantSettings"));
            localStorage.setItem("deliveryFees", settings.DeliveryFees);
          } else {
            localStorage.setItem("deliveryFees", "0");
          }

          this.navCtrl.pop();

          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: this.translate.instant('ADEDD'),
            enableBackdropDismiss: false,
            buttons: [
              {
                text: this.translate.instant('CONTINE'),
                handler: () => {
                  //ٌResume Shopping


                  console.log(localStorage.getItem("cartCount"))
                  //Update cart count for badge
                  this.getShoppingCartCount(localStorage.getItem("customerid"));
                }
              },
              {
                text: this.translate.instant('END'),
                handler: () => {

                  //Go to shopping cart

                  this.navCtrl.push(ShoppingCartPage, {
                    resName: this.resturantName,
                    resImage: this.resImage,
                    resdescription: this.resDiscription,
                    resServiceTypeId: this.serviceTypeId,
                    menumunCharge: this.menumumCharge,
                    resturantId: this.resturantId
                  });
                  this.getShoppingCartCount(localStorage.getItem("customerid"));

                }
              }
            ]
          });
          alert.present();


          this.dismissLoading();
        }
      }, (err) => {
        this.dismissLoading();
        console.log(err._body);
        let errString = JSON.stringify(err._body);
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: errString,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      });
    }
  }
}
