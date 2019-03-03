import { TabsPage } from './../tabs/tabs';
import { OrdersPage } from './../orders/orders';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Config, Platform, LoadingController, Form, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare let google;
@IonicPage()
@Component({
  selector: 'page-order-data',
  templateUrl: 'order-data.html',
})
export class OrderDataPage {

  google: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  lat: any;
  lng: any;
  customerLocationName : any;

  customerLocations = [];
  selected = true;
  selectedLat;
  selectedLng;
  oriantation = "";
  resturantId = "";
  servicID = "";
  locationName = "";
  notes = "";

  tabBarElement: any;
  conversionResponse;

  public form;

  constructor(public navCtrl: NavController,public app: App ,public navParams: NavParams, private _FB: FormBuilder, public geo: Geolocation, public googleMaps: GoogleMaps, public altCtrl: AlertController, public translate: TranslateService, public viewCtrl: ViewController, config: Config, public alertCrtl: AlertController, public genrator: GenratorProvider, public loader: LoadingController, platform: Platform) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');


    this.resturantId = navParams.get('resId');
    this.servicID = navParams.get('serviceId');

    this.customerLocationName= JSON.parse(localStorage.getItem('customerLocation'));
    console.log(this.customerLocationName);


    this.form = _FB.group({
      locationName: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      notes: ['', Validators.compose([Validators.maxLength(20)])],
    });






    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    // Wait the native plugin is ready.
    platform.ready().then(() => {

      this.defaultloadMap();
     
    });


  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';

    this.defaultloadMap();

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDataPage');
  }


  setFormElemnt(val) {
    this.form.controls['locationName'].setValue(val);
  }









 




  defaultloadMap() {


    this.lat=parseFloat(this.customerLocationName.lat);
    this.lng=parseFloat(this.customerLocationName.lng);

      let latLng = new google.maps.LatLng(parseFloat(this.customerLocationName.lat),parseFloat(this.customerLocationName.lng));
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }


      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: {
          lat: this.lat,
          lng: this.lng
        }, icon: "./assets/imgs/marker.png",
        draggable: false

      });



      this.setFormElemnt(this.customerLocationName.locationName+"")



 


  }















  //Confirm Order convert cart items to order
  confirmOrder(value) {

    let confirmationData;


    if (this.form.valid) {
      confirmationData = {
        "order_info": {
          "order_id": "0",
          "customer_id": localStorage.getItem("customerid"),
          "vendor_id": this.resturantId,
          "pickup_branch_id":null,
          "order_note": value.notes,
          "service_type_id": this.servicID,
          "longtitude":  this.customerLocationName.lng,
          "latitude": this.customerLocationName.lat,
          "location_name": value.locationName
        }
      }

    } else {
      confirmationData = {
        "order_info": {
          "order_id": "0",
          "customer_id": localStorage.getItem("customerid"),
          "vendor_id": this.resturantId,
          "pickup_branch_id":null,
          "order_note": value.notes,
          "service_type_id": this.servicID,
          "longtitude": this.customerLocationName.lng ,
          "latitude":  this.customerLocationName.lat,
          "location_name": "UserLocation"
        }
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

        let alert = this.alertCrtl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('orderplaced'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(OrdersPage);
        

      }
      console.log(data);
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);
    })
  }









}