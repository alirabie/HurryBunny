import { Component } from '@angular/core';
import { NavController, NavParams, Config, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public countriesList = [];
  public citiesList = [];
  public districtsList = [];
  customers = [];

  email: any;
  fname: any;
  lname: any;
  password: any;
  rpassword: any;
  phonenum: any;
  addr: any;

  cntry: string = "";
  state: string = "";
  district: string = "";
  countryid: any;
  cityId: any;
  _i: number;
  submitAttempt: boolean = false;
  public form: FormGroup;
  data: any;
  oriantation = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    config: Config,
    public genrator: GenratorProvider,
    public loader: LoadingController,
    private _FB: FormBuilder,
    public alertCtrl: AlertController) {

    config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
    this.getCustomerInfo();
    this.getCountries();
    this.form = _FB.group({
      firstName: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      phone : ['', Validators.compose([Validators.maxLength(20), Validators.required])]
    });


    if(localStorage.getItem('lang')=="1"){
      this.oriantation="ltr";
    }else{
      this.oriantation="rtl";
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


  getCountries() {
    return this.genrator.getCountries().subscribe((data) => {
      this.countriesList = data['countries'];
    });

  }


  getCities(id) {
    return this.genrator.getCities(id).subscribe((data) => {
      this.citiesList = data['states'];
    });
  }

  getDistricts() {
    return this.genrator.getDistructs(this.cntry, this.state).subscribe((data) => {
      this.districtsList = data['districts'];
    });
  }


  setCntryId(id) {
    this.countryid = id;
  }

  setCityid(id) {
    this.cityId = id;
  }

  //get Customer Info
  getCustomerInfo() {
    let custdata = JSON.parse(localStorage.getItem('customerdata'));


    this.fname = custdata.first_name;
    this.lname = custdata.last_name;
    this.phonenum = custdata.username;

  }


  SaveChanges(val) {

    let updatedData = {

      customer:
      {
          billing_address: {
            address1: "any add",
            address2: "null,null,null",
            city: "5555",
            country_id : 69,
            email : val.firstName+"@gmail.com",
            first_name :  val.firstName+"",
            last_name : val.lastname+"",
            phone_number : val.phone,
            state_province_id : 40,
            zip_postal_code: "10021"
          },
        role_ids: [3],
        email :"",
        password :"",
        first_name: val.firstName,
        last_name: val.lastname,
        phone: val.phone,
        verificationcode:"",
       
      }
  
    }




    console.log(updatedData);

    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();

    this.genrator.updateProfile(updatedData, localStorage.getItem('customerid')).then((data) => {
      console.log(data);
      loader.dismiss();
      if (data['customers'] != null) {
        this.data = data;
        localStorage.setItem('customerdata', JSON.stringify(this.data.customers[0]));
        this.navCtrl.pop();
      }

    }, (err) => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: this.translate.instant('PAGE_TITLE.dilog'),
        subTitle: err,
        buttons: [this.translate.instant('BUTTONS.dissmiss')]
      });
      alert.present();
    });

  }


}
