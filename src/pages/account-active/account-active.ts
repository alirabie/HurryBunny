import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, App, ViewController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Config } from 'ionic-angular';
import { LoginPage } from '../login/login'


@Component({
  selector: 'page-account-active',
  templateUrl: 'account-active.html',
})
export class AccountActivePage {

  public form: FormGroup;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public genrator: GenratorProvider, public loadingCtrl: LoadingController, private translate: TranslateService, private _FB: FormBuilder, public alertCtrl: AlertController, config: Config, public events: Events, public app: App, public viewCtrl: ViewController) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.form = _FB.group({
      code: ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });

  }

  ionViewDidLoad() {

    console.log(this.navParams.get("fname"));
    console.log(this.navParams.get("lname"));

  }



  SaveChanges(val) {
    console.log(val.code);
    let signUpdata = {
      customer:
      {
        billing_address: {
          address1: "any add",
          address2: "null,null,null",
          city: "5555",
          country_id: 69,
          email: this.navParams.get("fname") + "@gmail.com",
          first_name: this.navParams.get("fname") + "",
          last_name: this.navParams.get("lname") + "",
          phone_number: this.navParams.get("phone") + "",
          state_province_id: 40,
          zip_postal_code: "10021"
        },
        role_ids: [3],
        email: "",
        password: "",
        first_name: this.navParams.get("fname") + "",
        last_name: this.navParams.get("lname") + "",
        phone: this.navParams.get("phone") + "",
        verificationcode: val.code + "",

      }
    }

    console.log(signUpdata);


    let loader = this.loadingCtrl.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    this.genrator.signUp(signUpdata).then((result) => {

      loader.dismiss();
      console.log(result);
      this.data = result;
      if (this.data.customers != null) {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('ACTIVE.donecreated'),
          buttons: [
            {
              text: this.translate.instant('BUTTONS.dissmiss'),
              handler: () => {
                //ٌAutomatic login
                localStorage.setItem('customerid', this.data.customers[0].id);
                localStorage.setItem('customerdata', JSON.stringify(this.data.customers[0]));
                this.events.publish('user:login');
                //Send notification token to server 
                this.sendTokenToServer(this.data.customers[0].id, localStorage.getItem("notificationToken"));
                this.app.getRootNav().push(HomePage).then(() => {
                  // first we find the index of the current view controller:
                  const index = this.viewCtrl.index;
                  // then we remove it from the navigation stack
                  this.navCtrl.remove(index);
                });
              }

            }
          ]
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.data.errors.Account,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      }

    }, (err) => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: err,
        buttons: ['Dismss']
      });
      alert.present();

    });

  }



  sendTokenToServer(customerid, token) {
    this.genrator.sendNotificationToken(customerid, token).then((data: any) => {
      console.log(data);
    }, (err) => {
      console.log(err)
    });
  }

}
