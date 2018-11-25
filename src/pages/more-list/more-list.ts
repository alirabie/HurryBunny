import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../../pages/home/home';
import { MainScreenPage } from '../../pages/main-screen/main-screen';
import { IntroScreenPage } from '../../pages/intro-screen/intro-screen';
import { LoginPage } from '../../pages/login/login';
import { ProfilePage } from '../../pages/profile/profile';
import { SignUpPage } from '../../pages/sign-up/sign-up';
import { OffersPage } from '../offers/offers';
import { OrdersPage } from '../orders/orders';
import { SettingsPage } from '../settings/settings';
import { AboutusPage } from '../aboutus/aboutus';
import { ContactUsPage } from '../contact-us/contact-us';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';


@IonicPage()
@Component({
  selector: 'page-more-list',
  templateUrl: 'more-list.html',
})
export class MoreListPage {
  langName: string = "";
  mode = "";
  oriantation = "";
  loggedOut = false;
  loggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public splashScreen: SplashScreen, private translateService: TranslateService, events: Events, public app: App) {
    if (localStorage.getItem('customerid') === null) {
      this.loggedOut = true;
      this.loggedIn = false;
    } else {
      this.loggedOut = false;
      this.loggedIn = true;
    }

    if (localStorage.getItem('lang') == "en") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }

    
    
    if (localStorage.getItem('mode') == "development") {
      this.mode = "Production";
    } else {
      this.mode = "Development";
    }



    if (localStorage.getItem('lang') == "ar") {
      this.langName = "English";
    } else {
      this.langName = "اللغة العربية";

    }




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreListPage');

  }

  loginEvent() {
    this.loggedOut = false;
    this.loggedIn = true;
  }


  //Logout
  logout() {
    localStorage.removeItem('customerid');
    localStorage.removeItem('customerdata');
    localStorage.setItem('cartCount', "0");
    localStorage.removeItem("customerLocation");
    localStorage.removeItem("rated");

    // this.navCtrl.setRoot();
    this.app.getRootNav().push(IntroScreenPage);

  }

  //Login
  login() {

    this.app.getRootNav().push(LoginPage);
  }

  //go home page
  gohome() {

    this.navCtrl.push(MainScreenPage).then(() => {
      // first we find the index of the current view controller:
      let viewc: ViewController;
      const index = viewc.index;
      // then we remove it from the navigation stack
      this.navCtrl.remove(index);
    });

  }

  //Go signUp
  signUp() {
    this.app.getRootNav().push(SignUpPage);
  }


  //Go profile
  goProfile() {
    this.app.getRootNav().push(ProfilePage);
  }


  //Go Orders Page
  goOrdersPage() {
    this.app.getRootNav().push(OrdersPage);
  }



  //Go Offers Page
  goOffersPage() {
    this.app.getRootNav().push(OffersPage);
  }


  //Go settings Page
  goSettings() {
    this.app.getRootNav().push(SettingsPage);
  }



  //Go AboutUs Page 
  goAboutUs() {
    this.app.getRootNav().push(AboutusPage);
  }


  //Go ContactUs Page
  goContactUs() {
    this.app.getRootNav().push(ContactUsPage);
  }





  toggleIcon(getIcon: string) {
    if (this.langName === "English") {
      this.langName = "اللغة العربية";
      this.translateService.use("en");
      localStorage.setItem('lang', "en");
      this.splashScreen.show();
      location.reload();
    } else {

      this.translateService.use("ar");
      localStorage.setItem('lang', "ar");
      this.langName = "English";
      this.splashScreen.show();
      location.reload();
    }
  }


  checkLogin() {
    if (localStorage.getItem('customerid') === null) {
      return false;
    } else {
      return true;
    }
  }





  //Change App mode 
  appMode() {
    
    if (this.mode === "Production") {
      localStorage.setItem('mode', "Production");
      this.mode = "Development";
      this.logout();
      this.splashScreen.show();
      location.reload();

    } else if (this.mode === "Development") {
      localStorage.setItem('mode', "development");
      this.mode = "Production";
      this.logout();
      this.splashScreen.show();
      location.reload();




    }
  }




}
