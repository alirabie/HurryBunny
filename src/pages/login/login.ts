import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, LoadingController, AlertController, Config, ViewController, App } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data: any;
  public signIn: FormGroup;
  oriantation = "";
  cntryCode = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public loader: LoadingController,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    private _FB: FormBuilder,
    config: Config,
    public viewCtrl: ViewController,
    public events: Events,
    public app: App,
    platform: Platform) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }
    this.signIn = _FB.group({
      phone: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      countryCode: ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });

  }



  //Login Method
  doLogin(val) {


    let loginData = {
      Phone: val.phone, Password: val.phone
    }

    // alert(JSON.stringify(loginData))

    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();


    this.genrator.login(loginData).then((result) => {

      loader.dismiss();
      this.data = result;
      if (this.data.customers != null) {


        localStorage.setItem('customerid', this.data.customers[0].id);
        localStorage.setItem('customerdata', JSON.stringify(this.data.customers[0]));
        console.log(localStorage.getItem('customerdata'));
        //Send stored location
        // let location = JSON.parse(localStorage.getItem('locationId'));
        // location.id=this.data.customers[0].id
        // console.log(location);

        //Send notification token to server 
        this.sendTokenToServer(this.data.customers[0].id, localStorage.getItem("notificationToken"));

        this.events.publish('user:login');
        this.app.getRootNav().push(HomePage, {
          flag: "intro"
        }).then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });


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
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: this.translate.instant('invalidusername'),
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
    });
  }


  signUp() {
    this.navCtrl.push(SignUpPage);
  }



  sendTokenToServer(customerid, token) {
    this.genrator.sendNotificationToken(customerid, token).then((data: any) => {
      console.log("TOKEN SENT : "+JSON.stringify(data));
    }, (err) => {
      console.log("TOKEN SEND ERROR "+JSON.stringify(err));
    });
  }
}
