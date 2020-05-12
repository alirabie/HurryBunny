import { TabsPage } from './../tabs/tabs';
import { OrdersPage } from './../orders/orders';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Config, Platform, LoadingController, Form, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


declare let google;
@Component({
  selector: 'page-pickup-service',
  templateUrl: 'pickup-service.html',
})
export class PickupServicePage {
  google: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  lat: any;
  lng: any;
  branchLocationName = "";

  branchLocations = [];
  selected = true;
  selectedLat;
  selectedLng;
  oriantation = "";
  resturantId = "";
  servicID = "";
  locationName = "";
  notes = "";
  branchId;
  resturantName:"";
  resturantImg:"";

  tabBarElement: any;
  conversionResponse;

  public form;

  constructor(public navCtrl: NavController,public app : App ,public navParams: NavParams, private _FB: FormBuilder, public geo: Geolocation,  public altCtrl: AlertController, public translate: TranslateService, public viewCtrl: ViewController, config: Config, public alertCrtl: AlertController, public genrator: GenratorProvider, public loader: LoadingController, platform: Platform) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');


    this.resturantId = navParams.get('resId');
    this.resturantName = navParams.get('name');
    this.resturantImg = navParams.get('img');
    this.servicID = navParams.get('serviceId');


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

     
      this.getLocation();
      this.loadMap();
     

    });


  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';


  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
   
  }


  setFormElemnt(val) {
    this.form.controls['locationName'].setValue(val);
  }
 


  chekSelected() {
    if ((this.branchId == null)) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }



  getLocation(){
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      this.getBranchLocations(resp.coords.latitude,resp.coords.longitude);
      

    }).catch((error) => {
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: error,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log('Error getting location', error);
    });
  }



  loadMap() {
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      for (let i = 0; i < this.branchLocations.length; i++) {
        let branchLocation = this.branchLocations[i];
        let marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(branchLocation.longtitude, branchLocation.latitude),
          icon: "./assets/imgs/branchIcon.png",
          title: branchLocation.branch_name,
          draggable: false
        });
  
  
  
        marker.addListener('click', () => {
                    this.form.controls['locationName'].setValue(marker.title);
                    this.branchId=branchLocation.id;
                    this.chekSelected();

                    console.log(this.branchId);
        });
  
      }
  
  
      var latlngbounds = new google.maps.LatLngBounds();
      for (var i = 0; i < this.branchLocations.length; i++) {
        let customerLocation = this.branchLocations[i];
        latlngbounds.extend( new google.maps.LatLng(customerLocation.longtitude, customerLocation.latitude));
      }
     this.map.fitBounds(latlngbounds);


    }).catch((error) => {
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: error,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log('Error getting location', error);
    });




  









    }

   


  





 











  getBranchLocations(lat,lng){
    this.genrator.getResturantBranches(this.resturantId,lat,lng).then((data) => {

      if (data['branches'] != null) {

        this.branchLocations = data['branches']
        console.log(this.branchLocations);

          this.loadMap();
        
        
      }


    }, (err) => {
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log(err);
    });
  }




  //Confirm Order convert cart items to order
  confirmOrder(value) {
    let confirmationData;
   
      confirmationData = {
        "order_info": {
          "order_id": "0",
          "customer_id": localStorage.getItem("customerid"),
          "vendor_id": this.resturantId,
          "pickup_branch_id":this.branchId,
          "order_note" : this.navParams.get('notes'),
          "service_type_id": this.servicID,
          "location_id" : "0"
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
          name: this.resturantName,
          img: this.resturantImg,
        }
        localStorage.setItem("rated","0");
        console.log(localStorage.getItem("rated"));

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