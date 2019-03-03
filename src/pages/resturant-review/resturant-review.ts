import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenratorProvider } from './../../providers/genrator/genrator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-resturant-review',
  templateUrl: 'resturant-review.html',
})
export class ResturantReviewPage {

  public form: FormGroup;
  resturantData: any;
  oriantation;

  constructor(public navCtrl: NavController, private _FB: FormBuilder, public loader: LoadingController, public translate: TranslateService, public genrator: GenratorProvider, public alertCtrl: AlertController, public navParams: NavParams) {

    this.form = _FB.group({
      reviewtxt: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
      review_value: ['', Validators.compose([Validators.required])],
    });

    if (localStorage.getItem('lang') == "1") {
      this.oriantation = "ltr";
    } else {
      this.oriantation = "rtl";
    }

    this.resturantData = JSON.parse(navParams.get("order"));
    console.log(navParams.get("order"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantReviewPage');
  }




  //Add resturant review 
  addResturantReview(value) {
    let resturantReview = {
      "rating": {
        "customer_id": localStorage.getItem("customerid"),
        "expert_id": this.resturantData.vendor_id,
        "review_text": value.reviewtxt + "",
        "rating": value.review_value + ""
      }
    }

    console.log(resturantReview);



    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });

    this.genrator.addResturantReview(resturantReview).then((result: any) => {
      loader.dismiss();
      console.log(result);

      if (result['ratings'] != null) {
        this.form.reset();
        localStorage.removeItem("rated");
        console.log(localStorage.getItem("rated"));
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('reviewsucsess'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();

      } else {
        this.navCtrl.pop();
        localStorage.removeItem("lastresturant");
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: result.ErrorMessage,
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();

      }

    }, (err) => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: err,
        buttons: ['Disms']
      });
      alert.present();
    });



  }
  closemodal() {
    this.navCtrl.pop();

  }
}
