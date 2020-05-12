import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , public trans : TranslateService , public config : Config) {
    config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onChange(e) {
    this.trans.use(e);

    localStorage.setItem('lang',e+"");
    this.navCtrl.pop();
}

}
