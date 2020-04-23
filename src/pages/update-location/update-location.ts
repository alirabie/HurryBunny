import { GenratorProvider } from './../../providers/genrator/genrator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

declare let google;


@IonicPage()
@Component({
  selector: 'page-update-location',
  templateUrl: 'update-location.html',
})
export class UpdateLocationPage {

  google: any;
  @ViewChild('map') mapElement: ElementRef;
  selectedLat: any;
  selectedLng: any;
  lat: any;
  lng: any;
  map: any;
  oriantation = ""
  public form: FormGroup;
  customerLocation: any;
  constructor(public navCtrl: NavController, private _FB: FormBuilder, public events: Events, public genrator: GenratorProvider, platform: Platform, public geo: Geolocation, public alertCtrl: AlertController, public translate: TranslateService, public navParams: NavParams) {
    this.form = _FB.group({
      locationName: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      locationNote: ['', Validators.compose([Validators.maxLength(20)])],
    });
    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }
    this.customerLocation = JSON.parse(localStorage.getItem('locationforupdate'));
    this.form.controls['locationName'].setValue(this.customerLocation.LocationName + "");
    this.form.controls['locationNote'].setValue(this.customerLocation.LocationNote + "");
    console.log(this.customerLocation);
    // Wait the native plugin is ready.
    platform.ready().then(() => {
      this.loadMap();
    });
  }



  getCurrentLocation() {

    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.selectedLat = resp.coords.latitude;
      this.selectedLng = resp.coords.longitude;
     
      // this.checkCustomerLocation();
      
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
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: error,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
      console.log('Error getting location', error);
    });


  }




  loadMap() {

    this.lat = parseFloat(this.customerLocation.Latitude + "");
    this.lng = parseFloat(this.customerLocation.Longtitude + "");
    let latLng = new google.maps.LatLng(parseFloat(this.customerLocation.Latitude + ""), parseFloat(this.customerLocation.Longtitude + ""));
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

    this.selectedLat = marker.position.lat() + "";
    this.selectedLng = marker.position.lng() + "";
    this.map.addListener('center_changed', () => {
      marker.setPosition(this.map.getCenter())


      this.selectedLat = marker.position.lat() + "";
      this.selectedLng = marker.position.lng() + "";

      console.log(this.selectedLat);
      console.log(this.selectedLng);

      // this.presentPrompt();

    })

  }

  updateLocation(val) {
    if (val.locationName == "") {
      return;
    } else {
      let locationdata = {
        location: {
          id: this.customerLocation.Id,
          customer_id: localStorage.getItem("customerid"),
          location_name: val.locationName,
          latitude: this.selectedLat,
          longtitude: this.selectedLng,
          location_note: val.locationNote
        }
      }

      console.log(locationdata);
      this.genrator.addNewLocation(locationdata).then((result) => {
        console.log(result);

        if (result['locations'] != null) {
          let locations = result['locations'];
          let location = locations['0'];

          // {"location":{"id":"74","customer_id":"934","latitude":"30.5468049","longtitude":"31.00940449999996","location_name":"Home","location_note":"بجوار محطة وقود التعاون"}}






          let locationData = {
            location: {
              Id: location.id + "",
              CustomerId: location.customer_id + "",
              Latitude: location.latitude + "",
              Longtitude: location.longtitude + "",
              LocationName: location.location_name + "",
              LocationNote: location.location_note + ""
            }

          }


       //   console.log("Start Event : " + JSON.stringify(locationData))
          this.navCtrl.pop();
          this.events.publish('location:locationUpdated', locationData.location, Date.now());
        }


      }, (err) => {
        console.log(err);

      });

    }


  }


  close(){
    this.navCtrl.pop();
  }

}
