import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Config, Events, App, ViewController } from 'ionic-angular';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountActivePage } from '../account-active/account-active';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  oriantation = "";
  data: any;

  public countriesList = [];
  public citiesList = [];
  public districtsList = [];

  email: any;
  fname: any;
  lname: any;
  password: any;
  rpassword: any;
  phonenum: any;
  addr: any;

  countryCode : string = "";
  City: string = "";
  district: string = "";
  countryid: any;
  cityId: any;
  

  public form: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public genrator: GenratorProvider,
    public loader: LoadingController,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public events : Events,
    public app : App,
    public viewCtrl :ViewController,
    private _FB: FormBuilder,
    config: Config) {
    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.form = _FB.group({
      firstName: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      countryCode : ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(11), Validators.required, Validators.minLength(9)])]
    });


    if (localStorage.getItem('lang') == "en") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }





  SaveChanges(val) {
    console.log(val);
    console.log(val.countryCode+val.phone)
     // Virify phone and go to activation page
   let loader = this.loader.create({
        content: this.translate.instant('LOADING'),
      });
      loader.present();
      this.genrator.VerifyPhon(val.countryCode,val.phone).subscribe((data) => {
        console.log(data);
        if (data.VerificationCode !== "") {
          loader.dismiss();
          this.navCtrl.push(AccountActivePage, {
            fname: val.firstName,
            lname: val.lastname,
            phone: val.phone,
          
          });
        } else {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: data.ErrorMessage,
            buttons: [this.translate.instant('BUTTONS.dissmiss')]
          });
          alert.present();

        }
      });



   }
  






 













}