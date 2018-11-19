import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams  , public trans : TranslateService , public config : Config) {
    config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }



  goFacebook(){
    window.open('https://www.facebook.com/', '_blank', 'location=no,closebuttoncaption="close"');
  }

  goTwitter(){
    window.open('https://twitter.com/', '_blank', 'location=no,closebuttoncaption="close"');
  }

  goGooglePlus(){
    window.open('https://plus.google.com/', '_blank', 'location=no,closebuttoncaption="close"');
  }

  goInsta(){
    window.open('https://www.instagram.com/', '_blank', 'location=no,closebuttoncaption="close"');
  }
}
