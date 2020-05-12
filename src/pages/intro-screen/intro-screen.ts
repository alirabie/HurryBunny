import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , SegmentButton , ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {LoginPage} from '../login/login';
import {SignUpPage} from '../sign-up/sign-up';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'page-intro-screen',
  templateUrl: 'intro-screen.html',
})
export class IntroScreenPage {

 
  langName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams , public translate: TranslateService , public viewCtrl : ViewController) {
  
  
   
    if(localStorage.getItem('lang')=="1"){
      translate.use('en');
    }else{
      translate.use('ar');
    } 
    
    if(localStorage.getItem('lang')=="1"){
      this.langName="ع";
    }else{
      this.langName="E";
    }

  
  }


  ionViewDidEnter() {


    // this.checNetworkConnection();
    if (localStorage.getItem('customerid') === null) {

    } else {
      console.log("gooooo" + localStorage.getItem('customerid'));
      // if (localStorage.getItem('customerLocation') === null) {
        this.navCtrl.push(HomePage, {
          flag:"intro"}).then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });

      // } else {
      //   this.navCtrl.push(TabsPage).then(() => {
      //     // first we find the index of the current view controller:
      //     const index = this.viewCtrl.index;
      //     // then we remove it from the navigation stack
      //     this.navCtrl.remove(index);
      //   });
      // }


      
      


    }

}













  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroScreenPage');
  }


  login(){
    this.navCtrl.push(LoginPage);
  }


  signUp(){
    this.navCtrl.push(SignUpPage);
  }


  gust(){ 
    this.navCtrl.push(HomePage, {
      flag:"intro"});
  }


  onChange(segmentButton : SegmentButton) {
    this.translate.use(segmentButton.value);
    if(segmentButton.value=='ar'){
      localStorage.setItem('lang',"2");
    }else{
      localStorage.setItem('lang',"1");
}
}



toggleIcon(getIcon: string) {
    if (this.langName === 'ع') {
      this.langName = "E";
      this.translate.use("ar");
      localStorage.setItem('lang',"2");
    }else{
      this.langName = "ع";
      this.translate.use("en");
      localStorage.setItem('lang',"1");
    }
  }
}
