import { OrdersPage } from './../orders/orders';
import { TabsPage } from './../tabs/tabs';
import { PickupServicePage } from './../pickup-service/pickup-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, LoadingController, AlertController, Alert } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OrderDataPage } from '../../pages/order-data/order-data';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  oriantation = "";
  cartItemsList = [];
  cartItemsIdsList = [];
  discountCopuns = [];
  deliveryees = 0;
  resturantName = "";
  resLable = "";
  resImage = "";
  resDescription = "";
  conversionResponse;
  serviceTypeId = "";
  menumumCharge = 0;
  resturantId = "";
  orderNotes = "";
  paymentType = "cod";
  payment_method = "Payments.CheckMoneyOrder";
  customerLocationName: any;
  public discountcouponclicked: boolean = false;
  public dicountbuttonclick() {
    this.discountcouponclicked = !this.discountcouponclicked;
  }
  public discountcopun: FormGroup;
  //constructor(public navCtrl: NavController, public navParams: NavParams) {

  //}



  tabBarElement: any;
  total = 0;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, private _FB: FormBuilder, public genrator: GenratorProvider, public loader: LoadingController, public alertCtrl: AlertController, config: Config, public translate: TranslateService) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.customerLocationName = JSON.parse(localStorage.getItem('locationId'));
    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }


    this.discountcopun = _FB.group({
      code: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
    });



    this.getCartItems();
    //  this.deliveryees = parseFloat(localStorage.getItem("deliveryFees"));
    this.resturantName = localStorage.getItem("resName");



    this.resLable = navParams.get("resName");
    this.resImage = navParams.get("resImage");
    this.resDescription = navParams.get("resdescription");
    this.menumumCharge = navParams.get("menumunCharge");
    this.serviceTypeId = navParams.get('resServiceTypeId');
    this.resturantId = navParams.get('resturantId');



  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }




  //Payment selection
  paymentMethod(type) {
    this.paymentType = type;
  }



  //Check Delivery method
  loadOrderData() {
    //Check payment method
    if (this.paymentType === "cod") {
      this.payment_method = "Payments.CheckMoneyOrder";
    } else {
      this.payment_method = "Payments.Manual";
    }
    this.confirmOrder();
  }


  confirmOrder() {
    if (this.serviceTypeId == "1") {
      //Devlivery Option

      //Check menumumCharge value
      if (this.total >= this.menumumCharge) {

        let confirmationData = {
          "order_info": {
            "order_id": "0",
            "customer_id": localStorage.getItem("customerid"),
            "vendor_id": this.resturantId,
            "branch_id": null,
            "order_note": this.orderNotes,
            "service_type_id": this.serviceTypeId,
            "location_id": this.customerLocationName.location.id,
            "payment_method": this.payment_method
          }
        }

        console.log(confirmationData);

        this.showLoading();
        return this.genrator.convertCartOrders(confirmationData).then((data) => {
          this.conversionResponse = data['orders'];
          if (data['orders'] != null) {

            let resData = {
              id: this.resturantId,
              name: this.resLable,
              img: this.resImage,
            }

            //Send Discount Code
            let orders = data['orders'];
            let order = orders['0'];
            console.log(order);
            this.sendDiscontCode(order.id);

            //PayOnlineIfSelected
            this.onlinePay(order);

            localStorage.setItem("rated", "0");
            console.log(localStorage.getItem("rated"));

            localStorage.removeItem("resId");
            localStorage.removeItem("branchId");

            if (this.paymentType === "cod") {
              let alert = this.alertCtrl.create({
                title: this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: this.translate.instant('orderplaced'),
                buttons: [this.translate.instant('BUTTONS.dissmiss')]
              });
              alert.present();
              this.navCtrl.setRoot(TabsPage);
              this.navCtrl.push(OrdersPage);
            }

          }


          let errorMessage: any = data;
          if (errorMessage.message != null) {
            this.dismissLoading();
            let alert = this.alertCtrl.create({
              title: this.translate.instant('PAGE_TITLE.dilog'),
              subTitle: errorMessage.message,
              buttons: [this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
          }




          this.dismissLoading();
        }, (err) => {
          this.dismissLoading();
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: err,
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();
          console.log(err);
        });


      } else {

        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('menumum') + this.menumumCharge,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      }

    } else if (this.serviceTypeId == "2") {

      //Pickup Option
      let confirmationData = {
        "order_info": {
          "order_id": "0",
          "customer_id": localStorage.getItem("customerid"),
          "vendor_id": this.resturantId,
          "branch_id": localStorage.getItem("branchId"),
          "order_note": this.orderNotes,
          "service_type_id": this.serviceTypeId,
          "location_id": "0",
          "payment_method": this.payment_method
        }
      }
      console.log(confirmationData);
      let loader = this.loader.create({
        content: this.translate.instant('LOADING'),
      });
      loader.present();
      return this.genrator.convertCartOrders(confirmationData).then((data) => {
        this.conversionResponse = data['orders'];
        if (data['orders'] != null) {
          let resData = {
            id: this.resturantId,
            name: this.resLable,
            img: this.resImage,
          }

          //Send Discount Code
          let orders = data['orders'];
          let order = orders['0'];
          console.log(order);
          //PayOnlineIfSelected
          this.onlinePay(order);
          this.sendDiscontCode(order.id);

          localStorage.setItem("rated", "0");
          console.log(localStorage.getItem("rated"));

          localStorage.removeItem("resId");
          localStorage.removeItem("branchId");


          if (this.paymentType === "cod") {
            let alert = this.alertCtrl.create({
              title: this.translate.instant('PAGE_TITLE.dilog'),
              subTitle: this.translate.instant('orderplaced'),
              buttons: [this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            this.navCtrl.setRoot(TabsPage);
            this.navCtrl.push(OrdersPage);
          }




        }


        let errorMessage: any = data;
        if (errorMessage.message != null) {
          this.dismissLoading();
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: errorMessage.message,
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();
        }

        loader.dismiss();
      }, (err) => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: err,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
        console.log(err);
      });



      // this.navCtrl.push(PickupServicePage, {
      //   resId: this.resturantId,
      //   serviceId: this.serviceTypeId,
      //   name:this.resLable,
      //   img:this.resImage,
      //   notes:this.orderNotes
      // });

    } else if (this.serviceTypeId == "3") {

      //Both Option
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('selectservice'),
        enableBackdropDismiss: false,
        buttons: [
          {
            text: this.translate.instant('pickup'),
            handler: () => {
              //Pickup Selection
              this.serviceTypeId = "2";
              let confirmationData = {
                "order_info": {
                  "order_id": "0",
                  "customer_id": localStorage.getItem("customerid"),
                  "vendor_id": this.resturantId,
                  "branch_id": localStorage.getItem("branchId"),
                  "order_note": this.orderNotes,
                  "service_type_id": this.serviceTypeId,
                  "location_id": "0",
                  "payment_method": this.payment_method
                }
              }
              console.log(confirmationData);
              let loader = this.loader.create({
                content: this.translate.instant('LOADING'),
              });
              loader.present();
              this.genrator.convertCartOrders(confirmationData).then((data) => {
                this.conversionResponse = data['orders'];
                if (data['orders'] != null) {
                  let resData = {
                    id: this.resturantId,
                    name: this.resLable,
                    img: this.resImage,
                  }

                  //Send Discount Code
                  let orders = data['orders'];
                  let order = orders['0'];
                  //PayOnlineIfSelected
                  this.onlinePay(order);
                  console.log(order);
                  this.sendDiscontCode(order.id);


                  localStorage.setItem("rated", "0");
                  console.log(localStorage.getItem("rated"));

                  localStorage.removeItem("resId");
                  localStorage.removeItem("branchId");

                  if (this.paymentType === "cod") {
                    let alert = this.alertCtrl.create({
                      title: this.translate.instant('PAGE_TITLE.dilog'),
                      subTitle: this.translate.instant('orderplaced'),
                      buttons: [this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert.present();
                    this.navCtrl.setRoot(TabsPage);
                    this.navCtrl.push(OrdersPage);
                  }
                }


                let errorMessage: any = data;
                if (errorMessage.message != null) {
                  this.dismissLoading();
                  let alert = this.alertCtrl.create({
                    title: this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: errorMessage.message,
                    buttons: [this.translate.instant('BUTTONS.dissmiss')]
                  });
                  alert.present();
                }


                loader.dismiss();
              }, (err) => {
                loader.dismiss();
                let alert = this.alertCtrl.create({
                  title: this.translate.instant('PAGE_TITLE.dilog'),
                  subTitle: err,
                  buttons: [this.translate.instant('BUTTONS.dissmiss')]
                });
                alert.present();
                console.log(err);
              });


              // this.navCtrl.push(PickupServicePage, {
              //   resId: this.resturantId,
              //   serviceId: this.serviceTypeId,
              //   name:this.resLable,
              //   img:this.resImage,
              //   notes:this.orderNotes
              // });

            }
          },
          {
            text: this.translate.instant('delivry'),
            handler: () => {
              //Devlivery Selection

              //Check menumumCharge value
              if (this.total >= this.menumumCharge) {


                this.serviceTypeId = "1";
                let confirmationData = {
                  "order_info": {
                    "order_id": "0",
                    "customer_id": localStorage.getItem("customerid"),
                    "vendor_id": this.resturantId,
                    "branch_id": null,
                    "order_note": this.orderNotes,
                    "service_type_id": this.serviceTypeId,
                    "location_id": this.customerLocationName.location.id,
                    "payment_method": this.payment_method
                  }
                }

                console.log(confirmationData);

                let loader = this.loader.create({
                  content: this.translate.instant('LOADING'),
                });
                loader.present();
                return this.genrator.convertCartOrders(confirmationData).then((data) => {
                  this.conversionResponse = data['orders'];
                  if (data['orders'] != null) {
                    let resData = {
                      id: this.resturantId,
                      name: this.resLable,
                      img: this.resImage,
                    }

                    //Send Discount Code
                    let orders = data['orders'];
                    let order = orders['0'];
                    //PayOnlineIfSelected
                    this.onlinePay(order);
                    console.log(order);
                    this.sendDiscontCode(order.id);

                    localStorage.setItem("rated", "0");
                    console.log(localStorage.getItem("rated"));

                    localStorage.removeItem("resId");
                    localStorage.removeItem("branchId");



                    
                  if (this.paymentType === "cod") {
                    let alert = this.alertCtrl.create({
                      title: this.translate.instant('PAGE_TITLE.dilog'),
                      subTitle: this.translate.instant('orderplaced'),
                      buttons: [this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert.present();
                    this.navCtrl.setRoot(TabsPage);
                    this.navCtrl.push(OrdersPage);
                  }


                   


                  }
                  console.log(data);

                  let errorMessage: any = data;
                  if (errorMessage.message != null) {
                    this.dismissLoading();
                    let alert = this.alertCtrl.create({
                      title: this.translate.instant('PAGE_TITLE.dilog'),
                      subTitle: errorMessage.message,
                      buttons: [this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert.present();
                  }

                  loader.dismiss();
                }, (err) => {
                  loader.dismiss();
                  let alert = this.alertCtrl.create({
                    title: this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: err,
                    buttons: [this.translate.instant('BUTTONS.dissmiss')]
                  });
                  alert.present();
                  console.log(err);
                });

              } else {

                let alert = this.alertCtrl.create({
                  title: this.translate.instant('PAGE_TITLE.dilog'),
                  subTitle: this.translate.instant('menumum') + this.menumumCharge,
                  buttons: [this.translate.instant('BUTTONS.dissmiss')]
                });
                alert.present();

              }
            }
          }
        ]
      });
      alert.present();

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  getCartItems() {
    this.showLoading();
    this.genrator.getShoppingCartItems(localStorage.getItem("customerid"), localStorage.getItem('lang')).subscribe((data) => {
      this.cartItemsList = data['shopping_carts'];
      this.discountCopuns = data['applied_codes'];
      let cartItem = this.cartItemsList[0];
      this.total = data.total_price;
      if (this.serviceTypeId == "1") {
        this.deliveryees = data.delivery_fees;
      }

      if (this.discountCopuns.length != 0) {
        let coupon = this.discountCopuns['0'];
        //Save discount code
        localStorage.setItem("discountcode", coupon.Key.toUpperCase());
        console.log(localStorage.getItem("discountcode"));
      } else {
        localStorage.removeItem("discountcode");
        console.log(localStorage.getItem("discountcode"));
      }


      console.log(data)
      this.dismissLoading();

    }, (err) => {
      // let alert = this.alertCtrl.create({
      //   title: this.translate.instant('PAGE_TITLE.dilog'),
      //   subTitle: err,
      //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
      // });
      // alert.present();
      console.log(err);
      this.dismissLoading();

    });
  }

  getShoppingCartCount(custId) {
    this.genrator.getShoppingCartItems(custId, localStorage.getItem('lang')).subscribe((data) => {
      let items = data['shopping_carts'];
      localStorage.setItem("cartCount", items.length + "");
      if (items.length == 0) {
        localStorage.removeItem("resId");
        localStorage.removeItem("branchId");
        localStorage.setItem("resName", "");
        this.navCtrl.pop();
      } else {
        let item = items[0];
        localStorage.setItem("resId", item.product.vendor_id);
        console.log(localStorage.getItem("resId"));
      }
    });
  }



  calcEachItemPrice(cartItem) {
    let total = 0;

    total = cartItem.product.price * cartItem.quantity;

    for (let i = 0; i < cartItem.additions.length; i++) {
      let addition = cartItem.additions[i];
      total += (addition.price * addition.quantity);
    }

    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customize = cartItem.customizations[i];
      total += (customize.price * customize.quantity)
    }

    return total;
  }










  delItem(id) {
    this.genrator.deleteFromShoppingCart(id).subscribe((data) => {
      this.getCartItems();
      this.getShoppingCartCount(localStorage.getItem("customerid"));

    });
  }



  //Up CartItem Count 
  upCartItemCount(cartItem) {

    cartItem.quantity = cartItem.quantity + 1;

    //Fill Additions after deleation
    let additions = [];
    for (let i = 0; i < cartItem.additions.length; i++) {
      let additionItem2 = cartItem.additions[i];
      additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
    }

    //Fill Customizations after deleation
    let customizations = []
    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customizationItem = cartItem.customizations[i];
      customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
    }


    //Fill request body with currunt updated cartItem
    let updatedCartItem = {
      "shopping_cart_item": {
        "id": cartItem.id,
        "customer_entered_price": cartItem.customer_entered_price,
        "quantity": cartItem.quantity,
        "created_on_utc": cartItem.created_on_utc,
        "updated_on_utc": cartItem.updated_on_utc,
        "shopping_cart_type": "1",
        "product_id": cartItem.product_id,
        "customer_id": cartItem.customer_id,
        "additions": additions,
        "customizations": customizations
      }
    }
    console.log(updatedCartItem);
    // Push request to the server
    this.genrator.updateCart(updatedCartItem, cartItem.id).then((result) => {
      if (result['shopping_carts'] != null) {
        console.log(result);
        this.getCartItems();
      }
    }, (err) => {
      console.log(err);
    });
  }





  //Down Cart Item count
  downCartItemCount(cartItem) {

    if (cartItem.quantity == 1) {
      return;
    } else {
      cartItem.quantity = cartItem.quantity - 1;
    }

    //Fill Additions after deleation
    let additions = [];
    for (let i = 0; i < cartItem.additions.length; i++) {
      let additionItem2 = cartItem.additions[i];
      additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
    }

    //Fill Customizations after deleation
    let customizations = []
    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customizationItem = cartItem.customizations[i];
      customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
    }


    //Fill request body with currunt updated cartItem
    let updatedCartItem = {
      "shopping_cart_item": {
        "id": cartItem.id,
        "customer_entered_price": cartItem.customer_entered_price,
        "quantity": cartItem.quantity,
        "created_on_utc": cartItem.created_on_utc,
        "updated_on_utc": cartItem.updated_on_utc,
        "shopping_cart_type": "1",
        "product_id": cartItem.product_id,
        "customer_id": cartItem.customer_id,
        "additions": additions,
        "customizations": customizations
      }
    }
    console.log(updatedCartItem);
    // Push request to the server
    this.genrator.updateCart(updatedCartItem, cartItem.id).then((result) => {
      if (result['shopping_carts'] != null) {
        console.log(result);
        this.getCartItems();
      }
    }, (err) => {
      console.log(err);
    });
  }






  // Up Addition Count
  upAdditionCount(cartItem, additionId, additionsList) {
    //Up Addition item count
    for (let i = 0; i < additionsList.length; i++) {
      let additionItem = additionsList[i];
      if (additionItem.id == additionId) {
        additionItem.quantity = additionItem.quantity + 1;
      }
    }
    console.log(cartItem);
    //Fill Additions after deleation
    let additions = [];
    for (let i = 0; i < cartItem.additions.length; i++) {
      let additionItem2 = cartItem.additions[i];
      additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
    }

    //Fill Customizations after deleation
    let customizations = []
    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customizationItem = cartItem.customizations[i];
      customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
    }


    //Fill request body with currunt updated cartItem
    let updatedCartItem = {
      "shopping_cart_item": {
        "id": cartItem.id,
        "customer_entered_price": cartItem.customer_entered_price,
        "quantity": cartItem.quantity,
        "created_on_utc": cartItem.created_on_utc,
        "updated_on_utc": cartItem.updated_on_utc,
        "shopping_cart_type": "1",
        "product_id": cartItem.product_id,
        "customer_id": cartItem.customer_id,
        "additions": additions,
        "customizations": customizations
      }
    }
    console.log(updatedCartItem);
    // Push request to the server
    this.genrator.updateCart(updatedCartItem, cartItem.id).then((result) => {
      if (result['shopping_carts'] != null) {
        console.log(result);
        this.getCartItems();
      }
    }, (err) => {
      console.log(err);
    });


  }







  // Down Addition Count
  downAdditionCount(cartItem, additionId, additionsList) {
    //Up Addition item count
    for (let i = 0; i < additionsList.length; i++) {
      let additionItem = additionsList[i];
      if (additionItem.id == additionId) {
        if (additionItem.quantity == 1) {
          return
        } else {
          additionItem.quantity = additionItem.quantity - 1;
        }
      }
    }
    //console.log(cartItem);
    //Fill Additions after deleation
    let additions = [];
    for (let i = 0; i < cartItem.additions.length; i++) {
      let additionItem2 = cartItem.additions[i];
      additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
    }

    //Fill Customizations after deleation
    let customizations = []
    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customizationItem = cartItem.customizations[i];
      customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
    }

    //Fill request body with currunt updated cartItem
    let updatedCartItem = {
      "shopping_cart_item": {
        "id": cartItem.id,
        "customer_entered_price": cartItem.customer_entered_price,
        "quantity": cartItem.quantity,
        "created_on_utc": cartItem.created_on_utc,
        "updated_on_utc": cartItem.updated_on_utc,
        "shopping_cart_type": "1",
        "product_id": cartItem.product_id,
        "customer_id": cartItem.customer_id,
        "additions": additions,
        "customizations": customizations
      }
    }
    console.log(updatedCartItem);
    // Push request to the server
    this.genrator.updateCart(updatedCartItem, cartItem.id).then((result) => {
      if (result['shopping_carts'] != null) {
        console.log(result);
        this.getCartItems();
      }
    }, (err) => {
      console.log(err);
    });

  }







  //Delete Addition method --------->
  delAddition(cartItem, additionId, additionsList) {

    //Delete Addition item Code
    for (let i = 0; i < additionsList.length; i++) {
      let additionItem = additionsList[i];
      if (additionItem.id == additionId) {
        additionsList.splice(i, 1);;
      }
      // console.log(cartItem);
    }

    //Fill Additions after deleation
    let additions = [];
    for (let i = 0; i < cartItem.additions.length; i++) {
      let additionItem2 = cartItem.additions[i];
      additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
    }


    //Fill Customizations after deleation
    let customizations = []
    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customizationItem = cartItem.customizations[i];
      customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
    }


    //Fill request body with currunt updated cartItem
    let updatedCartItem = {
      "shopping_cart_item": {
        "id": cartItem.id,
        "customer_entered_price": cartItem.customer_entered_price,
        "quantity": cartItem.quantity,
        "created_on_utc": cartItem.created_on_utc,
        "updated_on_utc": cartItem.updated_on_utc,
        "shopping_cart_type": "1",
        "product_id": cartItem.product_id,
        "customer_id": cartItem.customer_id,
        "additions": additions,
        "customizations": customizations
      }
    }
    console.log(updatedCartItem);
    // Push request to the server
    this.genrator.updateCart(updatedCartItem, cartItem.id).then((result) => {
      if (result['shopping_carts'] != null) {
        console.log(result);
        this.getCartItems();
      }
    }, (err) => {
      console.log(err);
    });


  }




  //Delete customization method --------->
  delCustomization(cartItem, customizationId, customizationsList) {

    //Delete customizations item Code
    for (let i = 0; i < customizationsList.length; i++) {
      let customizationItem = customizationsList[i];
      if (customizationItem.id == customizationId) {
        customizationsList.splice(i, 1);;
      }
      // console.log(cartItem);
    }
    //Fill additions after deleation
    let additions = [];
    for (let i = 0; i < cartItem.additions.length; i++) {
      let additionItem2 = cartItem.additions[i];
      additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
    }


    //Fill Customizations after deleation
    let customizations = []
    for (let i = 0; i < cartItem.customizations.length; i++) {
      let customizationItem = cartItem.customizations[i];
      customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
    }

    //Fill request body with currunt updated cartItem
    let updatedCartItem = {
      "shopping_cart_item": {
        "id": cartItem.id,
        "customer_entered_price": cartItem.customer_entered_price,
        "quantity": cartItem.quantity,
        "created_on_utc": cartItem.created_on_utc,
        "updated_on_utc": cartItem.updated_on_utc,
        "shopping_cart_type": "1",
        "product_id": cartItem.product_id,
        "customer_id": cartItem.customer_id,
        "additions": additions,
        "customizations": customizations
      }
    }

    console.log(updatedCartItem);
    //Push request to the server
    this.genrator.updateCart(updatedCartItem, cartItem.id).then((result) => {
      if (result['shopping_carts'] != null) {
        console.log(result);
        this.getCartItems();
      }
    }, (err) => {
      console.log(err);
    });





  }





  //Apply Discount Coupon
  applyDiscount(val) {

    this.genrator.ApplyDiscountCoupon(val.code.toUpperCase(), localStorage.getItem("customerid")).then((data: any) => {

      if (data['shopping_carts'] != null) {
        this.getCartItems();
        this.discountcopun.controls['code'].setValue("");
        //Save discount code
        localStorage.setItem("discountcode", val.code.toUpperCase());

        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('discountdone'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: data.errors.Coupon,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      }
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);
    });





  }



  removeDiscountCopun(key) {
    this.genrator.RemoveDiscountCoupon(key, localStorage.getItem("customerid")).then((data) => {

      if (data['shopping_carts'] != null) {
        localStorage.removeItem("discountcode");
        this.getCartItems()
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('coupoundeleted'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();

      }
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);
    });
  }


  //Send Discount code to server 
  sendDiscontCode(orderId) {
    if (localStorage.getItem("discountcode") != null) {
      this.genrator.sendDiscountCodeToServer(localStorage.getItem("discountcode"), orderId).then((result) => {
        console.log(result);
        localStorage.removeItem("discountcode");
      }, (err) => {
        console.log(err);
      });
    }
  }







  onlinePay(order) {

    if (this.paymentType != "cod") {
      let customerData = JSON.parse(localStorage.getItem('customerdata'));
      let orderItems = order['order_items'];
      let itemPrice = this.total / orderItems.length;
      let request = {
        "cc_info":
        {
          "title": "Customer",
          "cc_first_name": customerData.billing_address.first_name,
          "cc_last_name": customerData.billing_address.last_name,
          "cc_phone_number": customerData.billing_address.phone_number,
          "email": customerData.billing_address.email,
          "products_per_title": "NA",
          "unit_price": itemPrice,
          "quantity": orderItems.length,
          "amount": this.total + this.deliveryees,
          "other_charges": this.deliveryees,
          "discount": 0,
          "reference_no": order.id
        }
      }

      console.log(JSON.stringify(request));
      this.genrator.createPaymentPage(request).then((response: any) => {
        localStorage.setItem('p_id', response.p_id)
        let url = response.payment_url;
        console.log(response)
        const browser = this.iab.create(url, '_blank',
          { location: 'no', clearcache: 'yes', toolbar: 'no' });

        browser.on('loadstart').subscribe((eve) => {
          var closeUrl = 'http://localhost:8100/close';
          if (eve.url == closeUrl) {
            browser.close();
            //This will close InAppBrowser Automatically when closeUrl Started
            //Validate with refId
            this.genrator.verifyPayment(localStorage.getItem('p_id'), order.id).then((resp: any) => {
              if (resp.response_code === '100') {

                  let alert = this.alertCtrl.create({
                    title: this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: this.translate.instant('placedandpaid'),
                    buttons: [this.translate.instant('BUTTONS.dissmiss')]
                  });
                  alert.present();
                  this.navCtrl.setRoot(TabsPage);
                  this.navCtrl.push(OrdersPage);
               

              } else {
                localStorage.removeItem('p_id');
                let alert = this.alertCtrl.create({
                  title: this.translate.instant('PAGE_TITLE.dilog'),
                  subTitle:  this.translate.instant('placedandnotpaid'),
                  buttons: [this.translate.instant('BUTTONS.dissmiss')]
                });
                alert.present();
                this.navCtrl.setRoot(TabsPage);
                this.navCtrl.push(OrdersPage);
              }

            }, (err) => {
              localStorage.removeItem('p_id');
              let alert = this.alertCtrl.create({
                title: this.translate.instant('PAGE_TITLE.dilog'),
                subTitle:  this.translate.instant('placedandnotpaid'),
                buttons: [this.translate.instant('BUTTONS.dissmiss')]
              });
              alert.present();
              this.navCtrl.setRoot(TabsPage);
              this.navCtrl.push(OrdersPage);
            });

          }
        }, err => {
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle:  this.translate.instant('paymentnotavalib'),
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();
        });

        browser.on('loadstop').subscribe(() => {

        }, err => {

        })

        browser.on('loaderror').subscribe(() => {

        }, err => {

        })

        browser.on('exit').subscribe(() => {

        }, err => {

        })
      }, (err) => {

        console.log("PayErorr" + err)

      })

    }

  }
}
