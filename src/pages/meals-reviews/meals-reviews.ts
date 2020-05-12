import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Config } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GenratorProvider } from '../../providers/genrator/genrator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-meals-reviews',
  templateUrl: 'meals-reviews.html',
})
export class MealsReviewsPage {

  title = "";
  mealId ="";
  public form: FormGroup;
  oriantation = "";
  mealReviews = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loader: LoadingController,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public genrator: GenratorProvider,
    private _FB: FormBuilder,
    config: Config) {

      config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
      this.title = navParams.get("mealname");
      this.mealId = navParams.get("mealid");

      if(localStorage.getItem('lang')=="1"){
        this.oriantation="ltr";
      }else{
        this.oriantation="rtl";
      }

      this.form = _FB.group({
        reviewtxt: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
        review_value: ['', Validators.compose([Validators.required])],
      });

      this.getMealReviews();
  }


  public buttonClicked: boolean = false; //For Rating button
  public onButtonClick() {
    if (localStorage.getItem("customerid") === null) {
      this.navCtrl.push(LoginPage);
    } else {
      this.buttonClicked = !this.buttonClicked;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MealsReviewsPage');
  }



  addMealReview(value){

    let mealReview = {
      "product_rating": {
        "customer_id": localStorage.getItem("customerid"),
        "product_id": this.mealId,
        "review_text": value.reviewtxt + "",
        "rating": value.review_value + ""
      }
    }

    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });

    this.genrator.addMealReview(mealReview).then((result: any) => {
      loader.dismiss();
      console.log(result);
      if (result['product_ratings'] != null) {
        this.form.reset();
        this.getMealReviews();
        let alert = this.alertCtrl.create({
          title: this.translate.instant('PAGE_TITLE.dilog'),
          subTitle: this.translate.instant('reviewsucsess'),
          buttons: [this.translate.instant('BUTTONS.dissmiss')]
        });
        alert.present();
      } else {
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



   //Get resturant reviews 
   getMealReviews() {
    let loader = this.loader.create({
      content: this.translate.instant('LOADING'),
    });
    loader.present();
    return this.genrator.getMealReviews(this.mealId).subscribe((data) => {
      this.mealReviews = data['product_ratings'];
      loader.dismiss();
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
