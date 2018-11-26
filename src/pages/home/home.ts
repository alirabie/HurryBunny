import { OffersPage } from './../offers/offers';
import { LoginPage } from './../login/login';
import { IntroScreenPage } from './../intro-screen/intro-screen';
import { OrdersPage } from './../orders/orders';
import { GenratorProvider } from './../../providers/genrator/genrator';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, ViewController, Config, Platform, App, NavParams, ModalController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from 'ionic-angular';
import { MainScreenPage } from '../main-screen/main-screen';
import { TabsPage } from '../tabs/tabs';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UpdateLocationPage } from '../update-location/update-location';
import { ProfilePage } from '../profile/profile';


declare let google;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  google: any;
  oriantation;
  locationName = "";
  locationId = "0";
  customerLocations = [];
  selectedLocationForUser = ""
  isNoLocations = true;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  lat: any;
  lng: any;
  notes = "";
  flag = "";
  selected = true;
  loggedIn = false;
  isBusy = true;
  selectedLat: any;
  selectedLng: any;
  constructor(public navCtrl: NavController, public app: App, events: Events, public modelCtrl: ModalController, public navParams: NavParams, private diagnostic: Diagnostic, public genrator: GenratorProvider, public splashScreen: SplashScreen, public geo: Geolocation, public googleMaps: GoogleMaps, public altCtrl: AlertController, public menu: MenuController, public translate: TranslateService, public viewCtrl: ViewController, config: Config, public alertCrtl: AlertController, platform: Platform, public locationAccuracy: LocationAccuracy) {
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));

    this.flag = this.navParams.get('flag');

    if (localStorage.getItem('lang') == "en") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }


    if (localStorage.getItem("customerid")) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.getCustomerLastLocations();


    events.subscribe('location:locationUpdated', (recivedLocation, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`

      this.getCustomerLastLocations();

      this.goAndStoreLocation(recivedLocation);
      // let locat = JSON.parse(location+"") ;
      // let elemnt = JSON.parse(recivedLocation.location+"");
      // console.log("Event Listener : "+elemnt);
    });

    // Wait the native plugin is ready.
    platform.ready().then(() => {

      this.loadMap();






      diagnostic.isLocationEnabled().then((status: boolean) => {

        if (!status) {
          this.loadMap();
          this.enableLocation();
        } else {

          this.loadMap();
        }

      }, (err) => {
        console.log(err);
      });




    });




  }



  // ngOnInit() {
  //   this.loadMap();
  // }

  ionViewDidLeave() {
    this.menu.enable(true);
  }


  ionViewDidLoad() {
    this.menu.enable(false);
    // this.loadMap();

  }




  chekSelected() {
    if ((this.selectedLat == null && this.selectedLng == null)) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }



  enableLocation() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.loadMap();
            this.splashScreen.show();
            location.reload()
          },
          error => alert('Error requesting location permissions' + JSON.stringify(error))
        );
      }

    });
  }






  loadMap() {

    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.selectedLat = resp.coords.latitude;
      this.selectedLng = resp.coords.longitude;
      localStorage.setItem("userLat",resp.coords.latitude+"");
      localStorage.setItem("userLng",resp.coords.longitude+"");
      this.chekSelected();
      // this.checkCustomerLocation();
      this.locationName = "";
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
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

      this.locationId = "0";






      this.map.addListener('center_changed', () => {
        marker.setPosition(this.map.getCenter())

        this.selectedLat = marker.position.lat() + "";
        this.selectedLng = marker.position.lng() + "";

        console.log(this.selectedLat);
        console.log(this.selectedLng);

        // this.presentPrompt();

      })



      // google.maps.event.addListener(marker, 'dragend', () => {





      //   this.presentPrompt();


      //   console.log(this.selectedLat);
      //   console.log(this.selectedLng);

      // });



    }).catch((error) => {
      let alert = this.alertCrtl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('errorLocationDetict'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log('Error getting location', error);
    });


  }


  gomainsc() {

    if (this.locationName == "") {
      this.presentPrompt();
    } else {



      if (this.locationId == "0") {
        let locationdata = {
          location: {
            id: this.locationId,
            customer_id: localStorage.getItem("customerid"),
            location_name: this.locationName,
            latitude: this.selectedLat,
            longtitude: this.selectedLng,
            location_note: this.notes
          }

        }

        if (localStorage.getItem("customerid") != null) {
          this.genrator.addNewLocation(locationdata).then((result) => {
            // console.log(result);

            let locations = result['locations'];
            let location = locations[0];
            this.locationId = location.id + "";
            localStorage.setItem('locationId', JSON.stringify(location))
            console.log("Add Response : " + localStorage.getItem('locationId'));
            //Save location id to local storage 

          }, (err) => {
            console.log(err);

          });

        } else {
          localStorage.setItem('locationId', JSON.stringify(locationdata))
          console.log("notloggedIn : " + localStorage.getItem('locationId'));
        }



      }

      console.log(localStorage.getItem('locationId'));

      if (this.flag == "main") {
        this.navCtrl.pop();
      } else if (this.flag == "intro") {

        this.app.getRootNav().push(TabsPage).then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });


      }



    }












  }




  getCustomerLastLocations() {
    if (localStorage.getItem("customerid") != null) {
      this.genrator.getCustomerLocations(localStorage.getItem("customerid")).then((data) => {
        if (data['locations'] != null) {

          this.isBusy = false;
          this.customerLocations = [];
          this.customerLocations = data['locations'];

          // this.customerLocations = this.customerLocations.filter(function(item, index){
          //   return this.customerLocations.indexOf(item) >= index;
          // });

          if (this.customerLocations.length == 0) {
            this.isNoLocations = true;
          } else {
            this.isNoLocations = false;
            this.checkCustomerLocation();
          }
          console.log(this.customerLocations);
        }

      }, (err) => {
        // let alert = this.alertCrtl.create({
        //   title: this.translate.instant('PAGE_TITLE.dilog'),
        //   subTitle: err,
        //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
        // });
        // alert.present();
        console.log(err);
      });
    }
  }


  goAndStoreLocation(location) {

    //console.log("Recived from LOC "+location.Latitude + "")
    console.log(name);
    console.log(location.Latitude);
    console.log(location.Longtitude);

    this.locationName = location.LocationName + "";
    this.selectedLat = location.Latitude + "";
    this.selectedLng = location.Longtitude + "";
    this.locationId = location.Id + "";

    let locationData = {
      location: {
        id: location.Id + "",
        customer_id: location.CustomerId + "",
        latitude: location.Latitude + "",
        longtitude: location.Longtitude + "",
        location_name: location.LocationName + "",
        location_note: location.LocationNote + ""
      }
    }

    localStorage.setItem('locationId', JSON.stringify(locationData))
    console.log(localStorage.getItem('locationId'));

    this.chekSelected();

    let latLng = new google.maps.LatLng(location.Latitude, location.Longtitude);
    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {
        lat: parseFloat(location.Latitude),
        lng: parseFloat(location.Longtitude)
      }, icon: "./assets/imgs/marker.png",
      draggable: false

    });


  }

  presentPrompt() {
    let alert = this.alertCrtl.create({
      title: this.translate.instant('PAGE_TITLE.dilog'),
      inputs: [
        {
          name: 'locationName',
          placeholder: this.translate.instant('locationname')
        },
        {
          name: 'locationNote',
          placeholder: this.translate.instant('notes')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('save'),
          handler: data => {
            this.locationName = data.locationName + ""
            this.notes = data.locationNote + ""
            this.chekSelected();
          }


        }
      ]
    });
    alert.present();
  }



  getDistancebetweenLocations(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }


  checkCustomerLocation() {
    this.customerLocations.forEach(element => {
      console.log(element)
      console.log(this.getDistancebetweenLocations(this.selectedLat, this.selectedLng, element.Latitude, element.Longtitude))
      if (this.getDistancebetweenLocations(this.selectedLat, this.selectedLng, element.Latitude, element.Longtitude) < 100) {
        this.goAndStoreLocation(element);
        this.selectedLocationForUser = element.LocationName;
        return;
      }
    });
  }

  deleteLocation() {

    //Both Option
    let alert = this.alertCrtl.create({
      title: this.translate.instant('PAGE_TITLE.dilog'),
      subTitle: this.translate.instant('areyousure'),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant('yes'),
          handler: () => {
            this.genrator.deleteLcation(this.locationId + "").then((data) => {
              
              this.getCustomerLastLocations();

              this.locationId = "0";

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
        },
        {
          text: this.translate.instant('no'),
          handler: () => {


          }
        }
      ]
    });
    alert.present();



  }


  updateCustomerLocation() {
    let modal = this.modelCtrl.create(UpdateLocationPage, {}, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  goToMyOrders() {
    this.app.getRootNav().push(OrdersPage);
  }


  goToMyProfile() {
    this.navCtrl.push(ProfilePage);
  }



  goToOffers() {
    this.navCtrl.push(OffersPage);
  }
  signOut() {
    localStorage.removeItem('customerid');
    localStorage.removeItem('customerdata');
    localStorage.setItem('cartCount', "0");
    localStorage.removeItem("customerLocation");
    localStorage.removeItem("lastresturant");

    // this.navCtrl.setRoot();
    this.app.getRootNav().push(IntroScreenPage);
  }

  signIn() {
    this.navCtrl.push(LoginPage);
  }
}
