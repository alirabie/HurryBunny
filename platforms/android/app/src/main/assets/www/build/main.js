webpackJsonp([21],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResturantInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__meal_info_meal_info__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shopping_cart_shopping_cart__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { SuperTabs } from 'ionic2-super-tabs';


var ResturantInfoPage = /** @class */ (function () {
    function ResturantInfoPage(navCtrl, navParams, genrator, loader, translate, alertCtrl, _FB, config, platform, events) {
        // , this.translate.instant('info')
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genrator = genrator;
        this.loader = loader;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this._FB = _FB;
        this.config = config;
        this.platform = platform;
        this.events = events;
        this.oriantation = "";
        this.SwipedTabsIndicator = null;
        this.tabs = [];
        this.branchId = "";
        this.distance = 0;
        this.categories = [];
        this.meals = [];
        this.resturantReviews = [];
        this.branches = [];
        this.userRatingInputValue = 0;
        this.isBusy = false;
        this.buttonClicked = false; //For Rating button
        this.tabs = [this.translate.instant('menu'), this.translate.instant('reviews'), this.translate.instant('info')];
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.resturantId = this.navParams.get("resid");
        this.serviceTypeId = this.navParams.get("serviceType");
        this.branchId = navParams.get('branchId');
        this.distance = navParams.get('distace');
        this.customerLocation = JSON.parse(localStorage.getItem('locationId'));
        console.log(this.customerLocation);
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.getResturantInfo(this.resturantId);
        this.getResturantCategories();
        this.getResturantReviews();
        this.form = _FB.group({
            reviewtxt: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].maxLength(500), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])],
            review_value: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])],
        });
    }
    ResturantInfoPage.prototype.selectPickup = function (categoryActive) {
        this.categoryActive = categoryActive;
    };
    ResturantInfoPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.SwipedTabsIndicator = document.getElementById("indicator");
        this.events.subscribe('cart:updated', function () {
            _this.setCartCount();
        });
        if (localStorage.getItem("customerid") != null) {
            this.getShoppingCartCount(localStorage.getItem("customerid"));
        }
    };
    ResturantInfoPage.prototype.selectTab = function (index) {
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
        this.SwipedTabsSlider.slideTo(index, 500);
    };
    ResturantInfoPage.prototype.updateIndicatorPosition = function () {
        // this condition is to avoid passing to incorrect index
        if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
            this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
        }
    };
    ResturantInfoPage.prototype.animateIndicator = function ($event) {
        if (this.SwipedTabsIndicator)
            this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
    };
    ResturantInfoPage.prototype.onButtonClick = function () {
        if (localStorage.getItem("customerid") === null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }
        else {
            this.buttonClicked = !this.buttonClicked;
        }
    };
    //get resturant categories
    ResturantInfoPage.prototype.getResturantCategories = function () {
        var _this = this;
        // let loader = this.loader.create({
        //   content: this.translate.instant('LOADING'),
        // });
        // loader.present();
        return this.genrator.getCategories(this.resturantId, localStorage.getItem('lang')).subscribe(function (data) {
            _this.categories = data['categories'];
            var category = _this.categories['0'];
            _this.getMealslist(category.id);
            _this.selectPickup(category);
            // loader.dismiss();
        }, function (err) {
            // loader.dismiss();
            // let alert = this.alertCtrl.create({
            //   title: this.translate.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
        });
    };
    ResturantInfoPage.prototype.show = function () {
        this.isBusy = true;
    };
    ResturantInfoPage.prototype.hide = function () {
        this.isBusy = false;
    };
    ResturantInfoPage.prototype.getMealslist = function (id) {
        var _this = this;
        // let loader = this.loader.create({
        //   content: this.translate.instant('LOADING'),
        // });
        // loader.present();
        this.show();
        return this.genrator.getMeals(id, localStorage.getItem('lang')).subscribe(function (data) {
            _this.meals = data['products'];
            _this.hide();
        }, function (err) {
            // this.hide();
            // let alert = this.alertCtrl.create({
            //   title: this.translate.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
        });
    };
    //Get resturant reviews 
    ResturantInfoPage.prototype.getResturantReviews = function () {
        var _this = this;
        // let loader = this.loader.create({
        //   content: this.translate.instant('LOADING'),
        // });
        // loader.present();
        return this.genrator.getResturantReviews(this.resturantId).subscribe(function (data) {
            _this.resturantReviews = data['ratings'];
            // loader.dismiss();
        }, function (err) {
            // loader.dismiss();
            // let alert = this.alertCtrl.create({
            //   title: this.translate.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
        });
    };
    //Add resturant review 
    ResturantInfoPage.prototype.addResturantReview = function (value) {
        var _this = this;
        var resturantReview = {
            "rating": {
                "customer_id": localStorage.getItem("customerid"),
                "expert_id": this.resturantId,
                "review_text": value.reviewtxt + "",
                "rating": value.review_value + ""
            }
        };
        // console.log(resturantReview);
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        this.genrator.addResturantReview(resturantReview).then(function (result) {
            loader.dismiss();
            console.log(result);
            if (result['ratings'] != null) {
                _this.form.reset();
                _this.getResturantReviews();
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('reviewsucsess'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: result.ErrorMessage,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_2.present();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: "",
                subTitle: err,
                buttons: ['Disms']
            });
            alert.present();
        });
    };
    ResturantInfoPage.prototype.setCartCount = function () {
        if (localStorage.getItem("cartCount") == "0") {
            this.badgeValue = null;
        }
        else if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {
            this.badgeValue = localStorage.getItem("cartCount");
        }
        else {
            this.badgeValue = null;
        }
    };
    ResturantInfoPage.prototype.getShoppingCartCount = function (custId) {
        var _this = this;
        if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {
            this.genrator.getShoppingCartItems(custId, localStorage.getItem('lang')).subscribe(function (data) {
                var items = data['shopping_carts'];
                localStorage.setItem("cartCount", items.length);
                if (items.length == 0) {
                    localStorage.removeItem("resId");
                    localStorage.setItem("resName", "");
                    localStorage.setItem("deliveryFees", "0");
                }
                else {
                    var item = items[0];
                    localStorage.setItem("resId", item.product.vendor_id);
                    console.log(localStorage.getItem("resId"));
                }
                _this.events.publish('cart:updated');
            });
        }
    };
    ResturantInfoPage.prototype.compareResturantId = function () {
        if (this.branchId != null) {
            if (this.branchId == localStorage.getItem("branchId")) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (this.resturantId == localStorage.getItem("resId")) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ResturantInfoPage.prototype.loadCartPage = function () {
        if (localStorage.getItem("customerid") === null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }
        else if (localStorage.getItem('cartCount') == '0' || localStorage.getItem("resId") != this.resturantId) {
            var alert_3 = this.alertCtrl.create({
                title: this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: this.translate.instant('cartempty'),
                buttons: [this.translate.instant('BUTTONS.dissmiss')]
            });
            alert_3.present();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__shopping_cart_shopping_cart__["a" /* ShoppingCartPage */], {
                resName: this.resturantName,
                resImage: this.resImage,
                resdescription: this.resDiscription,
                resServiceTypeId: this.serviceTypeId,
                menumunCharge: this.resSettings.MinimumOrderAmount,
                resturantId: this.resturantId
            });
        }
    };
    ResturantInfoPage.prototype.goMealInfoPage = function (id, name) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__meal_info_meal_info__["a" /* MealInfoPage */], {
            mealId: id,
            mealName: name,
            resImage: this.resImage,
            returantName: this.resturantName,
            resturantSettings: JSON.stringify(this.resSettings),
            resdescription: this.resDiscription,
            resServiceTypeId: this.serviceTypeId,
            menumunCharge: this.resSettings.MinimumOrderAmount,
            resturantId: this.resturantId,
            branchId: this.branchId
        });
    };
    //Get resturant info by id
    ResturantInfoPage.prototype.getResturantInfo = function (resId) {
        var _this = this;
        return this.genrator.getResturantInfo(resId, localStorage.getItem('lang')).subscribe(function (data) {
            var vendors = data['vendors'];
            _this.resturantInfo = vendors[0];
            _this.resturantName = _this.resturantInfo.name;
            _this.resrate = _this.resturantInfo.rating;
            _this.resImage = _this.resturantInfo.profile_image;
            _this.resSettings = _this.resturantInfo.Settings;
            _this.openingHours = _this.resturantInfo.OpeningHours;
            _this.resDiscription = _this.resturantInfo.about_us;
            _this.aboutRes = _this.resturantInfo.description;
            _this.branches = _this.resturantInfo.Branches;
            console.log(_this.resturantInfo);
            // loader.dismiss();
        }, function (err) {
            console.log(err);
        });
    };
    ResturantInfoPage.prototype.goMap = function (lat, lng, name) {
        var destination = lat + ',' + lng;
        if (this.platform.is('ios')) {
            window.open('maps://?q=' + destination, '_system');
        }
        else {
            var label = encodeURI(name);
            window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('SwipedTabsSlider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Slides */])
    ], ResturantInfoPage.prototype, "SwipedTabsSlider", void 0);
    ResturantInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-resturant-info',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\resturant-info\resturant-info.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <!--Shopping Cart button-->\n        <ion-buttons *ngIf="compareResturantId()" style="margin-right: 15px;  margin-left: 15px;"\n            (click)="loadCartPage()" start right>\n            <button ion-button icon-only>\n                <ion-icon color="light" name="md-cart"></ion-icon>\n                <ion-badge color="secondary">{{badgeValue}}</ion-badge>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n    <!-- info for resturant -->\n    <div dir="{{oriantation}}" class="resturantInfoHeader">\n        <ion-item no-lines>\n            <img *ngIf="resImage!=null" item-start padding width="80px" height="80px" [src]="resImage" />\n            <div class="group">\n                <h2>{{resturantName}}</h2>\n                <rating justify-content-center align-items-center style="height: 100%" readOnly="true"\n                    [(ngModel)]="resrate" max="5" emptyStarIconName="star-outline" halfStarIconName="star-half"\n                    starIconName="star" nullable="false">\n                </rating>\n            </div>\n            <p class="resInfo">\n                {{resDiscription}}\n            </p>\n\n            <!-- <p class="worktime"> {{resSettings.DeliveryTime}}</p> -->\n\n            <ion-row class="settingsrow" *ngIf="resSettings!=null">\n                <p class="settings" *ngIf="serviceTypeId==1">\n                    <small class="settingsname">{{\'mimimum\' | translate}}</small>\n                    <small>{{resSettings.MinimumOrderAmount}} {{resSettings.PrimaryStoreCurrencyCode}}</small>\n                </p>\n                <p class="settings" *ngIf="serviceTypeId==2">\n                    <small class="settingsname">{{\'distance\' | translate}}</small>\n                    <small>{{distance}} {{\'km\' | translate}}</small>\n                </p>\n                |\n                <p class="settings" *ngIf="serviceTypeId==1">\n                    <small class="settingsname">{{\'deliveryfees\' | translate}}</small>\n                    <small>{{resSettings.DeliveryFees}} {{resSettings.PrimaryStoreCurrencyCode}}</small>\n                </p>\n                <p class="settings" *ngIf="serviceTypeId==2">\n                    <small class="settingsname">{{\'mealpreparetime\' | translate}}</small>\n                    <small>{{resSettings.TimeToPrepareOrder}} min</small>\n                </p>\n                |\n                <p class="settings" *ngIf="serviceTypeId==1">\n                    <small class="settingsname">{{\'deliverytime\' | translate}}</small>\n                    <small>{{resSettings.DeliveryTime}} min</small>\n                </p>\n            </ion-row>\n\n        </ion-item>\n    </div>\n\n\n\n\n\n    <ion-segment class="SwipedTabs-tabs" dir="{{oriantation}}">\n        <ion-segment-button *ngFor=\'let tab of tabs ; let i = index \' value="IngoreMe" (click)="selectTab(i)"\n            [ngClass]=\'{ "SwipedTabs-activeTab" : ( this.SwipedTabsSlider  && ( this.SwipedTabsSlider.getActiveIndex() === i || (  tabs.length -1 === i&& this.SwipedTabsSlider.isEnd()))) }\'>\n            {{tab}}\n        </ion-segment-button>\n    </ion-segment>\n\n    <!-- here is our dynamic line  "indicator"-->\n    <div dir="{{oriantation}}" id=\'indicator\' class="SwipedTabs-indicatorSegment"\n        [ngStyle]="{\'width.%\': (100/this.tabs.length)}"></div>\n\n</ion-header>\n\n\n<ion-content class="has-header">\n    <ion-slides #SwipedTabsSlider dir="{{oriantation}}" (ionSlideDrag)="animateIndicator($event)"\n        (ionSlideWillChange)="updateIndicatorPosition()" (ionSlideDidChange)="updateIndicatorPosition()"\n        (pan)="updateIndicatorPosition()" [pager]="true">\n        <ion-slide dir="{{oriantation}}" class="menupage">\n            <!--The filter of categories-->\n            <ion-row class="filters">\n                <ion-col no-padding>\n                    <ion-slides dir="{{oriantation}}" class="categorieSlide" slidesPerView="4">\n                        <ion-slide class="categorieSlide" *ngFor="let category of categories"\n                            [ngClass]="{\'active\': category == categoryActive, \'not-selected-item\': category != categoryActive}"\n                            (tap)="selectPickup(category)">\n                            <div class="categIcon" (click)="getMealslist(category.id)">\n                                <h5 class="categoryTitle">{{category.name}}</h5>\n                            </div>\n                        </ion-slide>\n                    </ion-slides>\n                </ion-col>\n            </ion-row>\n            <ion-spinner *ngIf="isBusy" name="bubbles"></ion-spinner>\n            <ion-list no-lines>\n                <ion-item *ngFor="let meal of meals" (click)="goMealInfoPage(meal.id,meal.name)">\n                    <ion-thumbnail item-start>\n                        <img *ngIf="meal.images.length != 0" src="{{meal.images[0].src}}" />\n                        <img *ngIf="meal.images.length === 0"\n                            src="./assets/imgs/categories-filters/meal-placeholder.png" />\n                    </ion-thumbnail>\n                    <h2 class="mealNametxt">{{meal.name}}</h2>\n                    <p class="mealdictxt">{{meal.short_description}}</p>\n                    <h3>\n                        <ion-icon md="md-cash"></ion-icon> {{meal.price}}\n                        <small>{{meal.currency_code}} SR</small>\n                    </h3>\n                </ion-item>\n            </ion-list>\n\n        </ion-slide>\n\n\n        <!--contents of tab#2 \'The Reviews\'-->\n        <ion-slide class="ratingpage">\n            <!-- <ion-item class="addRating" dir="{{oriantation}}"> -->\n            <!--Row of Rating form-->\n            <!-- <button ion-button full (click)="onButtonClick()" class="style2">\n                    <ion-icon name="add"></ion-icon>{{\'addrating\' | translate}}</button>\n                <form [formGroup]="form" (ngSubmit)="addResturantReview(form.value)" *ngIf="buttonClicked">\n                    <rating justify-content-center align-items-center max="5" formControlName="review_value" emptyStarIconName="star-outline"\n                        halfStarIconName="star-half" starIconName="star"></rating>\n                    <textarea formControlName="reviewtxt" type="text" placeholder="{{\'addyourreview\' | translate}}"></textarea>\n                    <button ion-button round [disabled]="!form.valid">{{\'send\' | translate}}</button>\n                </form>\n            </ion-item> -->\n\n            <ion-list dir="{{oriantation}}">\n                <!--Users Rating Part-->\n                <ion-item *ngFor="let review of resturantReviews">\n                    <h3>{{review.customer_name}}</h3>\n                    <p>{{review.review_text}}</p>\n                    <rating justify-content-center align-items-center max="5" readOnly="true"\n                        [(ngModel)]="review.rating"></rating>\n                </ion-item>\n            </ion-list>\n        </ion-slide>\n\n\n        <ion-slide dir="{{oriantation}}" class="menupage">\n            <p *ngIf="aboutRes!=null">{{aboutRes}}</p>\n            <!-- <br> -->\n            <ion-item no-lines class="ptitle" *ngIf="openingHours!=null">\n                <h6 class="hours">{{\'workinghours\' | translate}}</h6>\n                <small>{{openingHours.TimeFrom}} {{openingHours.TimeTo}}</small>\n            </ion-item>\n\n\n            <!-- <ion-item no-lines *ngIf="branches.length!=0" class="branhesList">\n                <h1 class="branchestitle">{{\'resturantbranches\' | translate}}</h1>\n               \n                    <ion-item class="locationitem" no-lines *ngFor="let branch of branches" (click)="goMap(branch.latitude,branch.longtitude,branch.branch_name)">\n                        <img class="pin" item-start src="./assets/imgs/branchIcon.png">\n                        <h1 class="pname">{{branch.branch_name}} -->\n            <!-- <small end>10Km</small> -->\n            <!-- </h1>\n                    </ion-item>\n\n            </ion-item> -->\n\n\n\n\n        </ion-slide>\n    </ion-slides>\n\n\n\n\n    <!-- <ion-list>\n          <ion-item *ngFor="let category of categories">\n            <ion-thumbnail item-start>\n              <img [src]="category.image.src">\n            </ion-thumbnail>\n            <h2>{{category.name}}</h2>\n            <button ion-button clear item-end>View</button>\n          </ion-item>\n        </ion-list> -->\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\resturant-info\resturant-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], ResturantInfoPage);
    return ResturantInfoPage;
}());

//# sourceMappingURL=resturant-info.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_resturant_info_resturant_info__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_shopping_cart_shopping_cart__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MainScreenPage = /** @class */ (function () {
    function MainScreenPage(navCtrl, geo, modelCtrl, viewCtrl, platform, navParams, genrator, loadingCtrl, alertCrtl, translate, app, events) {
        this.navCtrl = navCtrl;
        this.geo = geo;
        this.modelCtrl = modelCtrl;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.genrator = genrator;
        this.loadingCtrl = loadingCtrl;
        this.alertCrtl = alertCrtl;
        this.translate = translate;
        this.app = app;
        this.events = events;
        this.resturants = [];
        this.resturansCopy = [];
        this.ads = [];
        this.oriantation = "";
        this.searchTerm = "";
        this.userLat = 0;
        this.userLng = 0;
        this.isBusy = false;
        this.empty = false;
        this.buttonClicked = false; //Whatever you want to initialise it as
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.customerLocation = JSON.parse(localStorage.getItem('locationId'));
        console.log(this.customerLocation);
        //this.getCurrentLocation();
        // if(localStorage.getItem("lastresturant")!=null){
        //   let modal = this.modelCtrl.create(ResturantReviewPage,{},{showBackdrop:true, enableBackdropDismiss:true  });
        //   modal.present();
        // }
        this.serviceType = "1";
        this.getResturantsByDeliveryType(1);
        this.getAds();
    }
    MainScreenPage.prototype.onButtonClick = function () {
        this.buttonClicked = !this.buttonClicked;
    };
    MainScreenPage.prototype.show = function () {
        this.isBusy = true;
    };
    MainScreenPage.prototype.hide = function () {
        this.isBusy = false;
    };
    MainScreenPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.serviceType = "1";
        this.getResturantsByDeliveryType(1);
        this.getAds();
        //*************************** */
        this.events.subscribe('cart:updated', function () {
            _this.setCartCount();
            // this.serviceType="2";
            // this.getResturantsByDeliveryType(2);
        });
        if (localStorage.getItem("customerid") != null) {
            this.getShoppingCartCount(localStorage.getItem("customerid"));
        }
    };
    MainScreenPage.prototype.goToLocationPage = function () {
        var _this = this;
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */], {
            flag: "main"
        }).then(function () {
            // first we find the index of the current view controller:
            var index = _this.viewCtrl.index;
            // then we remove it from the navigation stack
        });
        ;
    };
    MainScreenPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setCartCount();
        console.log('ionViewDidLoad MainScreenPage');
        this.events.subscribe('user:locationchangedaction', function () {
            _this.customerLocation = JSON.parse(localStorage.getItem('locationId'));
            _this.serviceType = "1";
            _this.getResturantsByDeliveryType(1);
            _this.getAds();
        });
    };
    MainScreenPage.prototype.loadCartPage = function () {
        if (localStorage.getItem("customerid") === null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
        }
        else if (localStorage.getItem('cartCount') == '0') {
            var alert_1 = this.alertCrtl.create({
                title: this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: this.translate.instant('cartempty'),
                buttons: [this.translate.instant('BUTTONS.dissmiss')]
            });
            alert_1.present();
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_shopping_cart_shopping_cart__["a" /* ShoppingCartPage */]);
        }
    };
    //Delivery type segment control
    MainScreenPage.prototype.switchDeliveryType = function (event) {
        this.getResturantsByDeliveryType(event.value);
    };
    //Loading resturants from server service
    MainScreenPage.prototype.getResturants = function () {
        var _this = this;
        this.show();
        return this.genrator.getResturants(this.customerLocation.location.latitude, this.customerLocation.location.longtitude, localStorage.getItem('lang')).then(function (data) {
            _this.resturants = data['vendors'];
            _this.resturansCopy = data['vendors'];
            console.log(_this.resturants);
            _this.hide();
        }, function (err) {
            _this.hide();
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    //Loading resturants from server and filter by deliveryType
    MainScreenPage.prototype.getResturantsByDeliveryType = function (type) {
        var _this = this;
        this.show();
        this.resturants = [];
        this.resturansCopy = [];
        console.log("lat " + this.customerLocation.location.latitude);
        console.log("lng " + this.customerLocation.location.longtitude);
        return this.genrator.getResturants(this.customerLocation.location.latitude, this.customerLocation.location.longtitude, localStorage.getItem('lang')).then(function (data) {
            _this.resturants = [];
            _this.resturansCopy = [];
            var vendors = data['vendors'];
            for (var i = 0; i < vendors.length; i++) {
                var vendor = vendors[i];
                if (vendor.Settings != null) {
                    if (vendor.Settings.ServiceTypeId == type || vendor.Settings.ServiceTypeId == 3) {
                        if (type == 2) {
                            var branches = [];
                            branches = vendor['Branches'];
                            for (var _i = 0, _a = vendor['Branches']; _i < _a.length; _i++) {
                                var branch = _a[_i];
                                var updatedVendor = {
                                    id: vendor.id,
                                    name: vendor.name,
                                    branchName: branch.branch_name,
                                    branchid: branch.id,
                                    lat: branch.latitude,
                                    lng: branch.longtitude,
                                    bounds: _this.getDistance(branch.bounds),
                                    addressid: vendor.addressid,
                                    rating: vendor.rating,
                                    address: vendor.address,
                                    description: vendor.description,
                                    PrictureId: vendor.PrictureId,
                                    online: branch.online,
                                    profile_image: vendor.profile_image,
                                    Settings: vendor.Settings,
                                    OpeningHours: vendor.OpeningHours,
                                    Branches: []
                                };
                                _this.resturants.push(updatedVendor);
                            }
                            // this.resturants.push(vendor);
                        }
                        else {
                            _this.resturants.push(vendor);
                        }
                        _this.resturants.sort(function (a, b) {
                            return a.bounds - b.bounds;
                        });
                    }
                }
            }
            if (_this.resturants.length == 0) {
                _this.empty = true;
            }
            else {
                _this.empty = false;
            }
            console.log(_this.resturants);
            _this.resturansCopy = _this.resturants;
            _this.hide();
        }, function (err) {
            _this.hide();
            // let alert = this.alertCrtl.create({
            //   title: this.translate.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
        });
    };
    //Go resturant info Page 
    MainScreenPage.prototype.goResturantInfo = function (id, branchid, distance) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__pages_resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
            resid: id,
            branchId: branchid,
            serviceType: this.serviceType,
            distace: distance
        });
    };
    MainScreenPage.prototype.setCartCount = function () {
        if (localStorage.getItem("cartCount") == "0") {
            this.badgeValue = null;
        }
        else {
            this.badgeValue = localStorage.getItem("cartCount");
        }
    };
    MainScreenPage.prototype.compareResturantId = function (resId) {
        if (resId == localStorage.getItem("resId")) {
            return true;
        }
        else {
            return false;
        }
    };
    MainScreenPage.prototype.comparebranchId = function (branchId) {
        if (branchId != null) {
            if (branchId == localStorage.getItem("branchId")) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    MainScreenPage.prototype.getShoppingCartCount = function (custId) {
        var _this = this;
        this.genrator.getShoppingCartItems(custId, localStorage.getItem('lang')).subscribe(function (data) {
            var items = data['shopping_carts'];
            localStorage.setItem("cartCount", items.length);
            if (items.length == 0) {
                localStorage.removeItem("resId");
                localStorage.setItem("resName", "");
                localStorage.setItem("deliveryFees", "0");
            }
            else {
                var item = items[0];
                localStorage.setItem("resId", item.product.vendor_id);
                console.log(localStorage.getItem("resId"));
            }
            _this.events.publish('cart:updated');
        });
    };
    MainScreenPage.prototype.setFilteredLocations = function () {
        var _this = this;
        if (this.searchTerm && this.searchTerm.trim() !== '') {
            this.resturants = this.resturants.filter(function (it) {
                return it.name.includes(_this.searchTerm); // only filter country name
            });
            if (this.resturants.length == 0) {
                this.empty = true;
            }
            else {
                this.empty = false;
            }
        }
        else {
            this.resturants = this.resturansCopy;
            this.empty = false;
        }
    };
    MainScreenPage.prototype.onCancel = function () {
        this.serviceType = 1;
    };
    MainScreenPage.prototype.getAds = function () {
        var _this = this;
        return this.genrator.getAdds().subscribe(function (data) {
            _this.ads = data['Advertisements'];
            _this.ads.length;
            console.log(_this.ads);
        }, function (err) {
            _this.hide();
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: "We were unable to show ads. Please try again",
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
        });
    };
    MainScreenPage.prototype.goResturantInfoFromAd = function (id) {
        var _this = this;
        this.genrator.getResturantInfoForAds(id, localStorage.getItem('lang')).subscribe(function (data) {
            var vendors = data['vendors'];
            var resturantInfo = vendors[0];
            switch (resturantInfo.Settings.ServiceTypeId) {
                case 1:
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__pages_resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
                        resid: id,
                        branchId: null,
                        serviceType: "1",
                        distace: 0
                    });
                    break;
                case 2:
                    var branches = [];
                    branches = resturantInfo['Branches'];
                    var branch = branches[0];
                    if (branch.online) {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__pages_resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
                            resid: id,
                            branchId: branch.id,
                            distace: _this.getDistance(branch.bounds),
                            serviceType: "2"
                        });
                    }
                    break;
                case 3:
                    var branches2 = [];
                    branches2 = resturantInfo['Branches'];
                    var branch2 = branches[0];
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__pages_resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
                        resid: id,
                        branchId: branch2.id,
                        distace: _this.getDistance(branch.bounds),
                        serviceType: _this.serviceType
                    });
                    break;
            }
        }, function (err) {
            console.log(err);
        });
    };
    MainScreenPage.prototype.getDistance = function (bounds) {
        //Convert bounds to Array of lat/lng and get distance between current location and each item and get Min value
        if (bounds != null) {
            var coordsArray = bounds.split(",");
            var path = [];
            for (var i = 0; i < coordsArray.length; i++) {
                path.push(this.checkDistance(coordsArray[i], coordsArray[i + 1]));
                i++;
            }
            console.log(path);
            return Math.min.apply(Math, path);
        }
        else {
            return 0;
        }
    };
    //Get distance 
    MainScreenPage.prototype.checkDistance = function (lat, lng) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(parseFloat(localStorage.getItem("userLat")) - lat); // deg2rad below
        var dLon = this.deg2rad(parseFloat(localStorage.getItem("userLng")) - lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat)) * Math.cos(this.deg2rad(parseFloat(localStorage.getItem("userLat")))) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Number(d).toFixed(2);
    };
    MainScreenPage.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    MainScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'page-main-screen',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\main-screen\main-screen.html"*/'​\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">\n\n\n<ion-header>\n\n\n  <ion-navbar hideBackButton="true">\n    <!--Shopping Cart button-->\n    <!-- <ion-buttons (click)="loadCartPage()" start left>\n      <button ion-button icon-only>\n        <ion-icon name="md-cart"></ion-icon>\n        <ion-badge color="secondary">{{badgeValue}}</ion-badge>\n      </button>\n    </ion-buttons> -->\n\n    <!--<ion-buttons (click)="goShoppingCartPage()" start>\n        <button ion-button icon-only>\n            <ion-icon name="md-cart"></ion-icon>\n            <ion-badge color="danger">{{badgeValue}}</ion-badge>\n        </button>\n    </ion-buttons>-->\n\n    <!--Title of Page-->\n    <ion-title>\n      {{ \'PAGE_TITLE.home\' | translate }}\n    </ion-title>\n\n    <!--Search Bar button-->\n    <!-- <ion-buttons (click)="onButtonClick()" left> -->\n    <ion-buttons (click)="onButtonClick()" left>\n      <button ion-button icon-only>\n        <ion-icon color="light" name="ios-search"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons (click)="goToLocationPage()" right>\n      <button ion-button icon-only >\n        <ion-icon color="light" name=\'ios-navigate-outline\'></ion-icon>\n      </button>\n    </ion-buttons>\n\n\n\n\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar *ngIf="buttonClicked" placeholder="{{\'search\' | translate}}" [(ngModel)]="searchTerm" (ionInput)="setFilteredLocations($event)" (ionCancel)="onCancel()">\n  </ion-searchbar>\n\n  \n  \n\n  <!--Start Advertisements Slider-->\n  <ion-slides pager options="{pagination: true}" autoplay="5000" loop="true" speed="500" dir="{{oriantation}}">\n\n      <ion-slide *ngIf="ads.length==0" style="background-color: bisque; color: #555;">\n          <img class="img" height="100 px" width="100 px" src="./assets/imgs/addsPlaceholder.png" />\n        </ion-slide>\n\n    <ion-slide *ngFor="let ad of ads" style="background-color: bisque; color: #555;"  (click)="goResturantInfoFromAd(ad.vendor_id)">\n      <img class="img" height="100 px" width="100 px" [src]="ad.image.src" />\n      <!-- <h2>Advertising 1</h2> -->\n    </ion-slide>\n\n  </ion-slides>\n\n\n\n\n\n  <!-- Delivery type selection segment  -->\n  <!-- <ion-segment  (ionChange)="switchDeliveryType($event)" full="true"  assertive>\n    <ion-segment-button value="2">\n        <i class=" fa fa-gift" style="font-size:18px;  text-align: center;"></i>\n        <label>{{\'pickup\' | translate}}</label>\n        \n    </ion-segment-button>\n    <ion-segment-button value="1">\n        <i class="fa fa-truck" style="font-size:18px;  text-align: center;"></i>\n        <label>{{\'delivry\' | translate}}</label>\n    </ion-segment-button>\n  </ion-segment> -->\n\n\n\n\n  <!--Segment Tabs-->\n  <div class="seg-tabs" dir="{{oriantation}}">\n    <ion-segment (ionChange)="switchDeliveryType($event)" [(ngModel)]="serviceType">\n      <ion-segment-button value="1">\n        <img src="./assets/imgs/delivery-icon.png" />{{\'delivry\' | translate}}</ion-segment-button>\n      <ion-segment-button value="2">\n        <img src="./assets/imgs/pickup-icon.png" />{{\'pickup\' | translate}}</ion-segment-button>\n    </ion-segment>\n  </div>\n\n\n\n\n\n\n\n\n  <ion-label class="emptylbl" *ngIf="empty">{{ \'EMPTY\' | translate }}</ion-label>\n  <ion-spinner class="spin" *ngIf="isBusy" name="bubbles"></ion-spinner>\n\n\n  <!--Start The List Of Resturants-->\n  <ion-list *ngIf="serviceType==1">\n\n    <ion-item [color]="even? \'light\' : \'whiteer\'" dir="{{oriantation}}" *ngFor="let resturant of resturants ; let even = even"\n      (click)="goResturantInfo(resturant.id,resturant.branchid)">\n      <ion-thumbnail item-start>\n        <!--<img [src]="resturant.profile_image">-->\n        <img *ngIf="resturant.profile_image !=null" [src]="resturant.profile_image" />\n        <img *ngIf="resturant.profile_image ==null" src="http://www.adbazar.pk/frontend/images/default-image.jpg" />\n      </ion-thumbnail>\n\n      <div class="group">\n        <h2>{{resturant.name}} <h3>{{resturant.branchName}}</h3> </h2>\n        &nbsp;|&nbsp;\n        <rating justify-content-center align-items-center style="height: 100%" [(ngModel)]="resturant.rating" readOnly="true" max="5"\n          emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false">\n        </rating>\n        <ion-badge class="badge" start left *ngIf="compareResturantId(resturant.id)" color="primary">{{badgeValue}}</ion-badge>\n      </div>\n\n\n      <!-- <small style="white-space: initial;">{{resturant.description}}</small> -->\n\n      <ion-row  class="settingsrow" *ngIf="resturant.Settings!=null">\n        <p class="settings" *ngIf="serviceType==1">\n          <small class="settingsname">{{\'mimimum\' | translate}}</small>\n          <small>{{resturant.Settings.MinimumOrderAmount}} {{resturant.Settings.PrimaryStoreCurrencyCode}}</small>\n        </p>\n        |\n        <p class="settings" *ngIf="serviceType==1">\n          <small class="settingsname">{{\'deliveryfees\' | translate}}</small>\n          <small>{{resturant.Settings.DeliveryFees}} {{resturant.Settings.PrimaryStoreCurrencyCode}}</small>\n        </p>\n        |\n        <p class="settings" *ngIf="serviceType==1">\n          <small class="settingsname">{{\'deliverytime\' | translate}}</small>\n          <small>{{resturant.Settings.DeliveryTime}} min</small>\n        </p>\n      </ion-row>\n\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf="serviceType==2">\n\n      <ion-item [color]="even? \'light\' : \'whiteer\'" dir="{{oriantation}}" *ngFor="let resturant of resturants ; let even = even"\n        (click)="goResturantInfo(resturant.id,resturant.branchid,resturant.bounds)" [ngClass]="{\'disabled\' : !resturant.online}">\n        <ion-thumbnail item-start>\n          <!--<img [src]="resturant.profile_image">-->\n          <img *ngIf="resturant.profile_image !=null" [src]="resturant.profile_image" />\n          <img *ngIf="resturant.profile_image ==null" src="http://www.adbazar.pk/frontend/images/default-image.jpg" />\n        </ion-thumbnail>\n  \n        <div class="group">\n          <h2>{{resturant.name}} <h3>{{resturant.branchName}}</h3> </h2>\n  \n          <rating justify-content-center align-items-center style="height: 100%" [(ngModel)]="resturant.rating" readOnly="true" max="5"\n            emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false">\n          </rating>\n          <ion-badge  class="badge" start left *ngIf="comparebranchId(resturant.branchid)" color="primary">{{badgeValue}}</ion-badge>\n        </div>\n  \n        <!-- <small style="white-space: initial;">{{resturant.description}}</small> -->\n  \n        <ion-row  class="settingsrow" *ngIf="resturant.Settings!=null">\n        \n          <p class="settings" *ngIf="serviceType==2">\n            <small class="settingsname">{{\'distance\' | translate}}</small>\n            <small>{{resturant.bounds}} {{\'km\' | translate}}</small>\n          </p>\n          |\n          <p class="settings" *ngIf="serviceType==2">\n            <small class="settingsname">{{\'mealpreparetime\' | translate}}</small>\n            <small>{{resturant.Settings.TimeToPrepareOrder}} min</small>\n          </p>\n\n          <p class="settings" *ngIf="serviceType==2">\n            <small class="online" *ngIf="resturant.online">{{\'online\' | translate}}</small>\n            <small class="offline" *ngIf="!resturant.online">{{\'offline\' | translate}}</small>\n          </p>\n\n        </ion-row>\n  \n      </ion-item>\n    </ion-list>\n</ion-content>\n\n<!-- <ion-footer>\n  <div class="header-banner">\n    <ion-slides pager="true" options="{pagination: true}" autoplay="5000" loop="true" speed="500" *ngFor="let product of productInfo">\n      <ion-slide *ngFor="let image of product.images">\n        <img class="img" height="100 px" width="100 px" [src]="image.src">\n      </ion-slide>\n    </ion-slides>\n  </div>\n</ion-footer> -->'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\main-screen\main-screen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["s" /* Platform */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */]])
    ], MainScreenPage);
    return MainScreenPage;
}());

//# sourceMappingURL=main-screen.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, translate, config, genrator, loader, _FB, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.genrator = genrator;
        this.loader = loader;
        this._FB = _FB;
        this.alertCtrl = alertCtrl;
        this.countriesList = [];
        this.citiesList = [];
        this.districtsList = [];
        this.customers = [];
        this.cntry = "";
        this.state = "";
        this.district = "";
        this.submitAttempt = false;
        this.oriantation = "";
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.getCustomerInfo();
        this.getCountries();
        this.form = _FB.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])]
        });
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.getCountries = function () {
        var _this = this;
        return this.genrator.getCountries().subscribe(function (data) {
            _this.countriesList = data['countries'];
        });
    };
    ProfilePage.prototype.getCities = function (id) {
        var _this = this;
        return this.genrator.getCities(id).subscribe(function (data) {
            _this.citiesList = data['states'];
        });
    };
    ProfilePage.prototype.getDistricts = function () {
        var _this = this;
        return this.genrator.getDistructs(this.cntry, this.state).subscribe(function (data) {
            _this.districtsList = data['districts'];
        });
    };
    ProfilePage.prototype.setCntryId = function (id) {
        this.countryid = id;
    };
    ProfilePage.prototype.setCityid = function (id) {
        this.cityId = id;
    };
    //get Customer Info
    ProfilePage.prototype.getCustomerInfo = function () {
        var custdata = JSON.parse(localStorage.getItem('customerdata'));
        this.fname = custdata.first_name;
        this.lname = custdata.last_name;
        this.phonenum = custdata.username;
    };
    ProfilePage.prototype.SaveChanges = function (val) {
        var _this = this;
        var updatedData = {
            customer: {
                billing_address: {
                    address1: "any add",
                    address2: "null,null,null",
                    city: "5555",
                    country_id: 69,
                    email: val.firstName + "@gmail.com",
                    first_name: val.firstName + "",
                    last_name: val.lastname + "",
                    phone_number: val.phone,
                    state_province_id: 40,
                    zip_postal_code: "10021"
                },
                role_ids: [3],
                email: "",
                password: "",
                first_name: val.firstName,
                last_name: val.lastname,
                phone: val.phone,
                verificationcode: "",
            }
        };
        console.log(updatedData);
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        this.genrator.updateProfile(updatedData, localStorage.getItem('customerid')).then(function (data) {
            console.log(data);
            loader.dismiss();
            if (data['customers'] != null) {
                _this.data = data;
                localStorage.setItem('customerdata', JSON.stringify(_this.data.customers[0]));
                _this.navCtrl.pop();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\profile\profile.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n        <ion-title>{{ \'SIDEMENU.account\' | translate }}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content dir="{{oriantation}}">\n\n        <div class="pageLogo">\n                <img src="./assets/imgs/login-logo.png" />\n            </div>\n\n    <form [formGroup]="form" (ngSubmit)="SaveChanges(form.value)">\n        <ion-list no-line>\n\n\n\n            <ion-item class="colr">\n                <ion-label color="primary" floating>{{\'SIgNUP.fname\' | translate}}</ion-label>\n                <ion-input value="{{fname}}" formControlName="firstName" type="text"></ion-input>\n            </ion-item>\n\n            <ion-item class="colr">\n                <ion-label color="primary" floating>{{\'SIgNUP.lname\' | translate}}</ion-label>\n                <ion-input value="{{lname}}" formControlName="lastname" type="text"></ion-input>\n            </ion-item>\n\n\n            <ion-item class="colr">\n                <ion-label color="primary" floating>{{\'SIgNUP.phone\' | translate}}</ion-label>\n                <ion-input value="{{phonenum}}" formControlName="phone" [disabled]="true" type="text"></ion-input>\n            </ion-item>\n\n\n        </ion-list>\n        <div class="btn">\n            <button ion-button color="primary" [disabled]="!form.valid" block>\n                <span class="fontColor">{{\'update\' | translate}}</span>\n            </button>\n        </div>\n    </form>\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenratorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_cache__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GenratorProvider = /** @class */ (function () {
    function GenratorProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        this.ProductionURL = "https://www.hurrybunny.com/";
        this.devlomentURL = "http://hurrybunny.appsmatic.net/";
        console.log('Hello GenratorProvider Provider');
        // if (localStorage.getItem('mode') == null) {
        //   this.url = this.devlomentURL;
        //   localStorage.setItem('mode', "development");
        // }
        // if (localStorage.getItem('mode') == "development") {
        //   this.url = this.devlomentURL;
        // } else if (localStorage.getItem('mode') == "Production") {
        //   this.url = this.ProductionURL;
        // }
        this.url = this.ProductionURL;
    }
    //Registeration
    GenratorProvider.prototype.signUp = function (registrData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/customers/', JSON.stringify(registrData), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get Customer Info
    GenratorProvider.prototype.getCustomerInfo = function (id) {
        return this.http.get(this.url + "api/customers/" + id).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Update Profile data
    GenratorProvider.prototype.updateProfile = function (credentials, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.put(_this.url + 'api/customers/' + id, JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Login
    GenratorProvider.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/customers/login', JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get Countries
    GenratorProvider.prototype.getCountries = function () {
        return this.http.get(this.url + "api/countries?ids=52,69").pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Cites
    GenratorProvider.prototype.getCities = function (id) {
        return this.http.get(this.url + "api/states/" + id).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Districts
    GenratorProvider.prototype.getDistructs = function (country, state) {
        return this.http.get(this.url + "api/districts/country/" + country + "/state/" + state).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Resturants 
    GenratorProvider.prototype.getResturants = function (lat, lng, langId) {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // let request = this.http.post(this.url + "api/restaurants?Longtitude=" + lng + "&Latitude=" + lat+"&language_id="+langId, { headers: headers });
        // let delayType = 'all'; // this indicates that it should send a new request to the server every time, you can also set it to 'none' which indicates that it should only send a new request when it's expired
        // let cacheKey = "vendors"+langId;
        // return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(
        //   map(res => res.json()  )  );
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + "api/restaurants?Longtitude=" + lng + "&Latitude=" + lat + "&language_id=" + langId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get resturant Info
    GenratorProvider.prototype.getResturantInfo = function (resId, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/vendor?VendorId=" + resId + "&language_id=" + langId);
        var cacheKey = "resInfo" + resId + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get resturant Info
    GenratorProvider.prototype.getResturantInfoForAds = function (resId, langId) {
        return this.http.get(this.url + "api/vendor?VendorId=" + resId + "&language_id=" + langId).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Categories of resturant 
    GenratorProvider.prototype.getCategories = function (id, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/restaurant/categories?vendorid=" + id + "&language_id=" + langId + "&fields=id,name,description,image");
        var cacheKey = "categores" + id + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get categorie meals 
    GenratorProvider.prototype.getMeals = function (catId, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/restaurant/meals?CategoryId=" + catId + "&fields=vendor_id,id,name,short_description,full_description,price,attributes,images&language_id=" + langId);
        var cacheKey = "meals" + catId + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get meals info
    GenratorProvider.prototype.getMealInfo = function (id, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/restaurant/meal/info?id=" + id + "&language_id=" + langId);
        var cacheKey = "mealsinfo" + id + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Verify Phone Number
    GenratorProvider.prototype.VerifyPhon = function (countryCode, phoneNum) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + "api/customers/PhoneVerification?countrycode=" + countryCode + "&phoneno=" + phoneNum, { headers: headers }).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Addisions 
    GenratorProvider.prototype.getRelatedProducts = function (id, langId) {
        var request = this.http.get(this.url + "api/products/related?id=" + id + "&language_id=" + langId);
        var cacheKey = "additionscash" + id + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Add to shopping cart
    GenratorProvider.prototype.addToCart = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/shopping_cart_items/', JSON.stringify(item), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get shopping cart items
    GenratorProvider.prototype.getShoppingCartItems = function (customerId, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/shopping_cart_items?customerId=" + customerId + "&language_id=" + langId);
        var cacheKey = "shoppingcart" + customerId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey, 60 * 60, delayType).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Delete from shopping Cart 
    GenratorProvider.prototype.deleteFromShoppingCart = function (id) {
        return this.http.delete(this.url + "api/shopping_cart_items/" + id).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Update Cart
    GenratorProvider.prototype.updateCart = function (item, cartItemId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.put(_this.url + 'api/shopping_cart_items/' + cartItemId, JSON.stringify(item), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get Resturant reviews 
    GenratorProvider.prototype.getResturantReviews = function (id) {
        return this.http.get(this.url + "api/restaurant/rating/" + id).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Add Resturant review
    GenratorProvider.prototype.addResturantReview = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/restaurant/rating', JSON.stringify(item), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Add meal review 
    GenratorProvider.prototype.addMealReview = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/product/rating', JSON.stringify(item), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get Meal reviews 
    GenratorProvider.prototype.getMealReviews = function (id) {
        return this.http.get(this.url + "api/product/rating/" + id).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Convert Cart to Order
    GenratorProvider.prototype.convertCartOrders = function (orderInfo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/shoppingcart/confirmorder', JSON.stringify(orderInfo), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get customer Orders
    GenratorProvider.prototype.getCustomerOrder = function (id, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/orders/customer?customer_id=" + id + "&language_id=" + langId);
        var cacheKey = "customerorders" + id + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get customer Orders
    GenratorProvider.prototype.getCustomerOrderNoCashing = function (id, langId) {
        return this.http.get(this.url + "api/orders/customer?customer_id=" + id + "&language_id=" + langId).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Order details
    GenratorProvider.prototype.getOrderDetails = function (orderId, langId) {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/orders?id=" + orderId + "&language_id=" + langId);
        var cacheKey = "orderdetails" + orderId + "lang" + langId;
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Convert Cart to Order
    GenratorProvider.prototype.changeOrderStatus = function (customerId, orderId, statusId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/v2/order/status?CustomerId=' + customerId + "&OrderId=" + orderId + "&StatusId=" + statusId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get customer locations 
    GenratorProvider.prototype.getCustomerLocations = function (customerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/customer/addresses?CustomerId=' + customerId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get Resturant branches
    GenratorProvider.prototype.getResturantBranches = function (vendorId, lat, lng) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/restaurant/branches/pickup?VendorId=' + vendorId + '&Longtitude=' + lng + '&Latitude=' + lat, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Apply Discount Copaun
    GenratorProvider.prototype.ApplyDiscountCoupon = function (discountCode, customerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + '/api/cart/coupon/apply?discountcouponcode=' + discountCode + '&customerId=' + customerId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Remove Discount Copaun
    GenratorProvider.prototype.RemoveDiscountCoupon = function (discountCode, customerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + '/api/cart/coupon/remove?discountcouponcode=' + discountCode + '&customerId=' + customerId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    // Delete Location
    GenratorProvider.prototype.deleteLcation = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/customer/addresses/remove?LocationId=' + id, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Add new Location
    GenratorProvider.prototype.addNewLocation = function (location) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/customer/addresses/add', JSON.stringify(location), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Get Adds 
    GenratorProvider.prototype.getAdds = function () {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/ads");
        var cacheKey = "adds";
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Get Offers
    GenratorProvider.prototype.getOffers = function () {
        var delayType = 'all';
        var request = this.http.get(this.url + "api/offers");
        var cacheKey = "offers";
        return this.cache.loadFromDelayedObservable(cacheKey, request, cacheKey).pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators__["map"])(function (res) { return res.json(); }));
    };
    //Send Discount Coupon to server 
    GenratorProvider.prototype.sendDiscountCodeToServer = function (discountCode, orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/order/savediscount?orderId=' + orderId + '&discountCouponCode=' + discountCode, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    //Clear Cart
    GenratorProvider.prototype.clearCart = function (customerId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/shopping_cart_items/clear?customerId=' + customerId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    // Reorder
    GenratorProvider.prototype.reorder = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/order/reorder?OrderId=' + orderId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    // send notification push token
    GenratorProvider.prototype.sendNotificationToken = function (customerId, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + 'api/customer/notification/maptoken?customerId=' + customerId + '&userToken=' + token, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    GenratorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_0_ionic_cache__["b" /* CacheService */]])
    ], GenratorProvider);
    return GenratorProvider;
}());

//# sourceMappingURL=genrator.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UpdateLocationPage = /** @class */ (function () {
    function UpdateLocationPage(navCtrl, _FB, events, genrator, platform, geo, alertCtrl, translate, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this._FB = _FB;
        this.events = events;
        this.genrator = genrator;
        this.geo = geo;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.navParams = navParams;
        this.oriantation = "";
        this.form = _FB.group({
            locationName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            locationNote: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(20)])],
        });
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.customerLocation = JSON.parse(localStorage.getItem('locationforupdate'));
        this.form.controls['locationName'].setValue(this.customerLocation.LocationName + "");
        this.form.controls['locationNote'].setValue(this.customerLocation.LocationNote + "");
        console.log(this.customerLocation);
        // Wait the native plugin is ready.
        platform.ready().then(function () {
            _this.loadMap();
        });
    }
    UpdateLocationPage.prototype.getCurrentLocation = function () {
        var _this = this;
        this.geo.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lng = resp.coords.longitude;
            _this.selectedLat = resp.coords.latitude;
            _this.selectedLng = resp.coords.longitude;
            // this.checkCustomerLocation();
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var marker = new google.maps.Marker({
                map: _this.map,
                animation: google.maps.Animation.DROP,
                position: {
                    lat: _this.lat,
                    lng: _this.lng
                }, icon: "./assets/imgs/marker.png",
                draggable: false
            });
            _this.map.addListener('center_changed', function () {
                marker.setPosition(_this.map.getCenter());
                _this.selectedLat = marker.position.lat() + "";
                _this.selectedLng = marker.position.lng() + "";
                console.log(_this.selectedLat);
                console.log(_this.selectedLng);
                // this.presentPrompt();
            });
            // google.maps.event.addListener(marker, 'dragend', () => {
            //   this.presentPrompt();
            //   console.log(this.selectedLat);
            //   console.log(this.selectedLng);
            // });
        }).catch(function (error) {
            var alert = _this.alertCtrl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: error,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log('Error getting location', error);
        });
    };
    UpdateLocationPage.prototype.loadMap = function () {
        var _this = this;
        this.lat = parseFloat(this.customerLocation.Latitude + "");
        this.lng = parseFloat(this.customerLocation.Longtitude + "");
        var latLng = new google.maps.LatLng(parseFloat(this.customerLocation.Latitude + ""), parseFloat(this.customerLocation.Longtitude + ""));
        var mapOptions = {
            center: latLng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: this.lat,
                lng: this.lng
            }, icon: "./assets/imgs/marker.png",
            draggable: false
        });
        this.selectedLat = marker.position.lat() + "";
        this.selectedLng = marker.position.lng() + "";
        this.map.addListener('center_changed', function () {
            marker.setPosition(_this.map.getCenter());
            _this.selectedLat = marker.position.lat() + "";
            _this.selectedLng = marker.position.lng() + "";
            console.log(_this.selectedLat);
            console.log(_this.selectedLng);
            // this.presentPrompt();
        });
    };
    UpdateLocationPage.prototype.updateLocation = function (val) {
        var _this = this;
        if (val.locationName == "") {
            return;
        }
        else {
            var locationdata = {
                location: {
                    id: this.customerLocation.Id,
                    customer_id: localStorage.getItem("customerid"),
                    location_name: val.locationName,
                    latitude: this.selectedLat,
                    longtitude: this.selectedLng,
                    location_note: val.locationNote
                }
            };
            console.log(locationdata);
            this.genrator.addNewLocation(locationdata).then(function (result) {
                console.log(result);
                if (result['locations'] != null) {
                    var locations = result['locations'];
                    var location_1 = locations['0'];
                    // {"location":{"id":"74","customer_id":"934","latitude":"30.5468049","longtitude":"31.00940449999996","location_name":"Home","location_note":"بجوار محطة وقود التعاون"}}
                    var locationData = {
                        location: {
                            Id: location_1.id + "",
                            CustomerId: location_1.customer_id + "",
                            Latitude: location_1.latitude + "",
                            Longtitude: location_1.longtitude + "",
                            LocationName: location_1.location_name + "",
                            LocationNote: location_1.location_note + ""
                        }
                    };
                    //   console.log("Start Event : " + JSON.stringify(locationData))
                    _this.navCtrl.pop();
                    _this.events.publish('location:locationUpdated', locationData.location, Date.now());
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    UpdateLocationPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ElementRef */])
    ], UpdateLocationPage.prototype, "mapElement", void 0);
    UpdateLocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
            selector: 'page-update-location',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\update-location\update-location.html"*/'\n<ion-header>\n    <ion-navbar color="primary" hideBackButton="true">\n    \n  \n      <!--Search Bar button-->\n      <ion-buttons (click)="getCurrentLocation()" left>\n        <button ion-button icon-only>\n          <ion-icon name="pin"></ion-icon>\n        </button>\n      </ion-buttons>\n\n     \n      <ion-buttons (click)="close()" right>\n        <button ion-button icon-only>\n          <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-buttons>\n  \n\n    </ion-navbar>\n  \n  \n  \n  </ion-header>\n\n\n\n<ion-content >\n    <div #map id="map"></div>\n    <form [formGroup]="form" (ngSubmit)="updateLocation(form.value)">\n  \n\n            <ion-item class="colr">\n                <!-- <ion-label floating>{{\'SIgNUP.fname\' | translate}}</ion-label> -->\n                <ion-input dir="{{oriantation}}" placeholder="{{\'locationname\' | translate}}" formControlName="locationName" type="text"></ion-input>\n            </ion-item>\n            <ion-item class="colr">\n                <!-- <ion-label floating>{{\'SIgNUP.lname\' | translate}}</ion-label> -->\n                <ion-input dir="{{oriantation}}" placeholder="{{\'notes\' | translate}}" formControlName="locationNote" type="text"></ion-input>\n            </ion-item>\n  \n            <button class="butn" padding ion-button color="softDark" round block  [disabled]="false">{{\'save\' | translate }}</button>\n    </form>\n\n</ion-content>\n<ion-footer>\n    <ion-row class="buttonsrow">\n      \n    </ion-row>\n \n</ion-footer>\n'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\update-location\update-location.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["s" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["r" /* NavParams */]])
    ], UpdateLocationPage);
    return UpdateLocationPage;
}());

//# sourceMappingURL=update-location.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutusPage = /** @class */ (function () {
    function AboutusPage(navCtrl, navParams, trans, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trans = trans;
        this.config = config;
        config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
    }
    AboutusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutusPage');
    };
    AboutusPage.prototype.goFacebook = function () {
        window.open('https://www.facebook.com/', '_blank', 'location=no,closebuttoncaption="close"');
    };
    AboutusPage.prototype.goTwitter = function () {
        window.open('https://twitter.com/', '_blank', 'location=no,closebuttoncaption="close"');
    };
    AboutusPage.prototype.goGooglePlus = function () {
        window.open('https://plus.google.com/', '_blank', 'location=no,closebuttoncaption="close"');
    };
    AboutusPage.prototype.goInsta = function () {
        window.open('https://www.instagram.com/', '_blank', 'location=no,closebuttoncaption="close"');
    };
    AboutusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-aboutus',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\aboutus\aboutus.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SIDEMENU.aboutus\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-row>\n    <img src="./assets/imgs/sidemenu-logo.png" />\n  </ion-row>\n\n  <ion-row>\n    <p>\n      {{\'abouthurrybunny\' | translate}}\n    </p>\n  </ion-row>\n  <!-- dsdsd -->\n  <div class="social-group">\n    <h5>{{\'youcanjoinus\' | translate}}</h5>\n    <img (click)="goFacebook()" src="./assets/imgs/social/face.png" />\n    <img (click)="goTwitter()" src="./assets/imgs/social/tw.png" />\n    <img (click)="goGooglePlus()" src="./assets/imgs/social/google.png" />\n    <img (click)="goInsta()" src="./assets/imgs/social/instg.png" />\n    <!-- Change this every time updated app -->\n    <h5 class="contactus">{{\'version\' | translate}} 0.2.0</h5>\n  </div>\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\aboutus\aboutus.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */]])
    ], AboutusPage);
    return AboutusPage;
}());

//# sourceMappingURL=aboutus.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactUsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactUsPage = /** @class */ (function () {
    function ContactUsPage(navCtrl, navParams, trans, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trans = trans;
        this.config = config;
        config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
    }
    ContactUsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactUsPage');
    };
    ContactUsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-contact-us',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\contact-us\contact-us.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SIDEMENU.contactus\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <form>\n        <div class="social-group">\n            <h5>You Can Join Us On</h5>\n            <img src="./assets/imgs/social/face.png" />\n            <img src="./assets/imgs/social/tw.png" />\n            <img src="./assets/imgs/social/google.png" />\n            <img src="./assets/imgs/social/instg.png" />\n        </div>\n        <br />\n       <h5>Or Send Your Message Here</h5> \n        <ion-item>\n            <ion-input type="text" name="name" placeholder="Your Name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-input type="text" name="title" placeholder="Subject Title"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-textarea name="description" placeholder="Your Message"></ion-textarea>\n        </ion-item>\n        <br />\n        <button ion-button type="submit" block>Submit</button>\n    </form>\n</ion-content>\n'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\contact-us\contact-us.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */]])
    ], ContactUsPage);
    return ContactUsPage;
}());

//# sourceMappingURL=contact-us.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountActivePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AccountActivePage = /** @class */ (function () {
    function AccountActivePage(navCtrl, navParams, genrator, loadingCtrl, translate, _FB, alertCtrl, config, events, app, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genrator = genrator;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this._FB = _FB;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.app = app;
        this.viewCtrl = viewCtrl;
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.form = _FB.group({
            code: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])]
        });
    }
    AccountActivePage.prototype.ionViewDidLoad = function () {
        console.log(this.navParams.get("fname"));
        console.log(this.navParams.get("lname"));
    };
    AccountActivePage.prototype.SaveChanges = function (val) {
        var _this = this;
        console.log(val.code);
        var signUpdata = {
            customer: {
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
        };
        console.log(signUpdata);
        var loader = this.loadingCtrl.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        this.genrator.signUp(signUpdata).then(function (result) {
            loader.dismiss();
            console.log(result);
            _this.data = result;
            if (_this.data.customers != null) {
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('ACTIVE.donecreated'),
                    buttons: [
                        {
                            text: _this.translate.instant('BUTTONS.dissmiss'),
                            handler: function () {
                                //ٌAutomatic login
                                localStorage.setItem('customerid', _this.data.customers[0].id);
                                localStorage.setItem('customerdata', JSON.stringify(_this.data.customers[0]));
                                _this.events.publish('user:login');
                                //Send notification token to server 
                                _this.sendTokenToServer(_this.data.customers[0].id, localStorage.getItem("notificationToken"));
                                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]).then(function () {
                                    // first we find the index of the current view controller:
                                    var index = _this.viewCtrl.index;
                                    // then we remove it from the navigation stack
                                    _this.navCtrl.remove(index);
                                });
                            }
                        }
                    ]
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.data.errors.Account,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_2.present();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: "",
                subTitle: err,
                buttons: ['Dismss']
            });
            alert.present();
        });
    };
    AccountActivePage.prototype.sendTokenToServer = function (customerid, token) {
        this.genrator.sendNotificationToken(customerid, token).then(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    AccountActivePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'page-account-active',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\account-active\account-active.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{\'PAGE_TITLE.active\' | translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h6 class="title">{{\'ACTIVE.title\' | translate}}</h6>\n\n  <form [formGroup]="form" (ngSubmit)="SaveChanges(form.value)">\n  <ion-item class="colr">\n      <ion-label color="primary" floating>{{\'ACTIVE.code\' | translate}}</ion-label>\n      <ion-input formControlName="code" type="text"></ion-input>\n    </ion-item>\n    <span *ngIf="form.controls[\'code\'].hasError(\'required\') && form.controls[\'code\'].touched">\n        <span [hidden]="!form.controls[\'code\'].errors.required">\n            <ion-label style="color: red; margin-left: 16px;">*</ion-label>\n        </span>\n    </span>\n    <div>\n        <button ion-button color="primary" [disabled]="!form.valid" block>\n          <span class="fontColor">{{\'ACTIVE.create\' | translate}}</span>\n        </button>\n      </div>\n</form>\n</ion-content>\n'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\account-active\account-active.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["w" /* ViewController */]])
    ], AccountActivePage);
    return AccountActivePage;
}());

//# sourceMappingURL=account-active.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MealInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shopping_cart_shopping_cart__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__meals_reviews_meals_reviews__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MealInfoPage = /** @class */ (function () {
    function MealInfoPage(navCtrl, navParams, loader, translate, alertCtrl, config, genrator, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.config = config;
        this.genrator = genrator;
        this.events = events;
        this.oriantation = "";
        this.resturantName = "";
        this.mealName = "";
        this.mealId = "";
        this.branchId = "";
        this.mealInfo = [];
        this.rating = 0;
        this.imgaes = [];
        this.mealAdditions = [];
        this.mealAdditionsmap = {};
        this.mealAdditionPriceMap = {};
        this.mealAdditionsCountsMap = {};
        this.mealAddisionsStatus = {};
        this.resDiscription = "";
        this.serviceTypeId = "";
        this.menumumCharge = 0;
        this.resImage = "";
        this.mealAttr = [];
        this.mealAttrValues = [];
        this.count = 1;
        this.selectedoption = "";
        this.optionPrice = 0;
        this.additionPrice = 0;
        this.optionsmap = {};
        this.optinosPricesmap = {};
        this.selectedCustomizationsIds = [];
        this.selectedAdditions = [];
        this.buttonClicked1 = false; //For expand1
        this.buttonClicked2 = false; //For expand2
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.mealName = navParams.get("mealName");
        this.mealId = navParams.get("mealId");
        this.resturantName = navParams.get("returantName");
        this.resImage = navParams.get("resImage");
        this.resDiscription = navParams.get("resdescription");
        this.menumumCharge = navParams.get("menumunCharge");
        this.serviceTypeId = navParams.get('resServiceTypeId');
        this.branchId = navParams.get('branchId');
        this.getMealInfoo();
        this.getAddistios();
    }
    MealInfoPage.prototype.showLoading = function () {
        if (!this.loading) {
            this.loading = this.loader.create({
                content: this.translate.instant('LOADING')
            });
            this.loading.present();
        }
    };
    MealInfoPage.prototype.dismissLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    MealInfoPage.prototype.onButtonClick1 = function () {
        this.buttonClicked1 = !this.buttonClicked1;
    };
    MealInfoPage.prototype.onButtonClick2 = function () {
        this.buttonClicked2 = !this.buttonClicked2;
    };
    MealInfoPage.prototype.getMealInfoo = function () {
        var _this = this;
        this.showLoading();
        return this.genrator.getMealInfo(this.mealId, localStorage.getItem('lang')).subscribe(function (data) {
            _this.dismissLoading();
            _this.mealInfo = data['products'];
            _this.mealItem = _this.mealInfo['0'];
            _this.rating = _this.mealItem.rating;
            _this.resturantId = _this.mealItem.vendor_id;
            _this.imgaes = _this.mealItem['images'];
            _this.mealAttr = _this.mealItem['attributes'];
            console.log(_this.mealItem);
        }, function (err) {
            _this.dismissLoading();
            //   let alert = this.alertCtrl.create({
            //     title: this.translate.instant('PAGE_TITLE.dilog'),
            //     subTitle: err,
            //     buttons: [this.translate.instant('BUTTONS.dissmiss')]
            //   });
            //   alert.present();
            console.log(err);
        });
    };
    MealInfoPage.prototype.up = function () {
        this.count++;
    };
    MealInfoPage.prototype.dwon = function () {
        if (this.count <= 1) {
            return;
        }
        else {
            this.count--;
        }
    };
    MealInfoPage.prototype.getOptionPrice = function (id, price) {
        this.optionPrice = 0;
        this.optinosPricesmap[id] = price * this.count;
        for (var i in this.optinosPricesmap) {
            this.optionPrice += this.optinosPricesmap[i];
        }
    };
    // getAdditionPrice(id,price){
    //   this.additionPrice=0;
    //   this.mealAdditionPriceMap[id]=price;
    //   for(var i in this.mealAdditionPriceMap){
    //     this.additionPrice+=this.mealAdditionPriceMap[i];
    //   }
    // }
    MealInfoPage.prototype.getOptionId = function (attrId, id) {
        this.optionsmap[attrId] = id;
        // console.log(this.optionsmap);
    };
    MealInfoPage.prototype.getAddistios = function () {
        var _this = this;
        return this.genrator.getRelatedProducts(this.mealId, localStorage.getItem('lang')).subscribe(function (data) {
            if (data != null) {
                _this.mealAdditions = data['products'];
            }
        }, function (err) {
            // let alert = this.alertCtrl.create({
            //   title: this.translate.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
        });
    };
    MealInfoPage.prototype.toggleComponent = function (event, component) {
        if (event.value) {
            this.mealAddisionsStatus[component.name] = event.value;
            this.mealAdditionsmap[component.name] = component.id;
            this.additionPrice = 0;
            this.mealAdditionsCountsMap[component.name] = this.count;
            this.mealAdditionPriceMap[component.name] = component.price * this.count;
            for (var i in this.mealAdditionPriceMap) {
                this.additionPrice += this.mealAdditionPriceMap[i];
            }
        }
        else {
            delete this.mealAddisionsStatus[component.name];
            delete this.mealAdditionsmap[component.name];
            this.additionPrice = 0;
            delete this.mealAdditionPriceMap[component.name];
            delete this.mealAdditionsCountsMap[component.name];
            for (var i in this.mealAdditionPriceMap) {
                this.additionPrice += this.mealAdditionPriceMap[i];
            }
        }
    };
    MealInfoPage.prototype.incAdditionCount = function (addName, price) {
        this.mealAdditionsCountsMap[addName] += 1;
        this.mealAdditionPriceMap[addName] = price * this.mealAdditionsCountsMap[addName];
        this.additionPrice = 0;
        for (var i in this.mealAdditionPriceMap) {
            this.additionPrice += this.mealAdditionPriceMap[i];
        }
    };
    MealInfoPage.prototype.decAdditionCount = function (addName, price) {
        if (this.mealAdditionsCountsMap[addName] == 1) {
            return;
        }
        else {
            this.mealAdditionsCountsMap[addName] -= 1;
            this.mealAdditionPriceMap[addName] = price * this.mealAdditionsCountsMap[addName];
            this.additionPrice = 0;
            for (var i in this.mealAdditionPriceMap) {
                this.additionPrice += this.mealAdditionPriceMap[i];
            }
        }
    };
    MealInfoPage.prototype.addToCart = function () {
        var _this = this;
        this.selectedCustomizationsIds = [];
        for (var i in this.optionsmap) {
            this.selectedCustomizationsIds.push({ "customization_id": this.optionsmap[i], "product_id": this.mealId });
        }
        console.log(this.selectedCustomizationsIds);
        this.selectedAdditions = [];
        for (var i in this.mealAdditionsmap) {
            this.selectedAdditions.push({ "addition_id": this.mealAdditionsmap[i], "quantity": this.mealAdditionsCountsMap[i], "product_id": this.mealId });
        }
        if (localStorage.getItem("customerid") === null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
        else {
            if (this.selectedCustomizationsIds.length != this.mealAttr.length) {
                if (this.mealAttr.length != 0) {
                    var alert_1 = this.alertCtrl.create({
                        title: this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: this.translate.instant('addcustomizationsdialog'),
                        buttons: [this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert_1.present();
                }
                else {
                    var cartItem = {
                        "shopping_cart_item": {
                            "id": "null",
                            "customer_entered_price": "0",
                            "quantity": this.count,
                            "created_on_utc": "2018-06-13T16:15:47-04:00",
                            "updated_on_utc": "2018-06-13T16:15:47-04:00",
                            "shopping_cart_type": "1",
                            "product_id": this.mealId,
                            "customer_id": localStorage.getItem("customerid"),
                            "additions": this.selectedAdditions,
                            "customizations": this.selectedCustomizationsIds
                        }
                    };
                    console.log(cartItem);
                    if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {
                        this.showLoading();
                        this.addToShoppingCart(cartItem);
                    }
                    else {
                        //One resturant dialog
                        var alert_2 = this.alertCtrl.create({
                            title: this.translate.instant('PAGE_TITLE.dilog'),
                            subTitle: this.translate.instant('oneResturant'),
                            buttons: [{
                                    text: this.translate.instant('clearlastcart'),
                                    handler: function () {
                                        _this.clearCart(localStorage.getItem("customerid"));
                                    }
                                }, {
                                    text: this.translate.instant('cancle'),
                                    handler: function () { }
                                }]
                        });
                        alert_2.present();
                        console.log(this.translate.instant('oneResturant') + localStorage.getItem("resName"));
                    }
                }
            }
            else {
                var cartItem = {
                    "shopping_cart_item": {
                        "id": "null",
                        "customer_entered_price": "0",
                        "quantity": this.count,
                        "created_on_utc": "2018-06-13T16:15:47-04:00",
                        "updated_on_utc": "2018-06-13T16:15:47-04:00",
                        "shopping_cart_type": "1",
                        "product_id": this.mealId,
                        "customer_id": localStorage.getItem("customerid"),
                        "additions": this.selectedAdditions,
                        "customizations": this.selectedCustomizationsIds
                    }
                };
                console.log(cartItem);
                if (localStorage.getItem("resId") == null || localStorage.getItem("resId") == this.resturantId) {
                    this.showLoading();
                    this.addToShoppingCart(cartItem);
                }
                else {
                    //One resturant dialog
                    var alert_3 = this.alertCtrl.create({
                        title: this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: this.translate.instant('oneResturant'),
                        buttons: [{
                                text: this.translate.instant('clearlastcart'),
                                handler: function () {
                                    _this.clearCart(localStorage.getItem("customerid"));
                                }
                            }, {
                                text: this.translate.instant('cancle'),
                                handler: function () { }
                            }]
                    });
                    alert_3.present();
                    console.log(this.translate.instant('oneResturant') + localStorage.getItem("resName"));
                }
            }
        }
    };
    MealInfoPage.prototype.clearCart = function (customerId) {
        var _this = this;
        this.genrator.clearCart(customerId).then(function (reult) {
            localStorage.removeItem("resId");
            localStorage.removeItem("branchId");
            localStorage.setItem("resName", "");
            localStorage.setItem("deliveryFees", "0");
            _this.addToCart();
        }, function (err) {
            alert(err);
        });
    };
    MealInfoPage.prototype.getShoppingCartCount = function (custId) {
        var _this = this;
        this.genrator.getShoppingCartItems(custId, localStorage.getItem('lang')).subscribe(function (data) {
            var items = data['shopping_carts'];
            localStorage.setItem("cartCount", items.length);
            if (items.length == 0) {
                localStorage.removeItem("resId");
                localStorage.setItem("resName", "");
                localStorage.setItem("deliveryFees", "0");
            }
            else {
                var item = items[0];
                localStorage.setItem("resId", item.product.vendor_id);
                console.log(localStorage.getItem("resId"));
            }
            _this.events.publish('cart:updated');
        });
    };
    MealInfoPage.prototype.goMealReviews = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__meals_reviews_meals_reviews__["a" /* MealsReviewsPage */], {
            mealid: this.mealId,
            mealname: this.mealName
        });
    };
    MealInfoPage.prototype.addToShoppingCart = function (cartItem) {
        var _this = this;
        if (this.branchId != null) {
            if (localStorage.getItem("branchId") == null || localStorage.getItem("branchId") == this.branchId) {
                this.genrator.addToCart(cartItem).then(function (result) {
                    if (result['shopping_carts'] != null) {
                        console.log(result);
                        localStorage.setItem("resName", _this.resturantName);
                        console.log("goooooooooooooooooooggg" + localStorage.getItem("resName"));
                        localStorage.setItem("branchId", _this.branchId);
                        if (JSON.parse(_this.navParams.get("resturantSettings")) != null) {
                            var settings = JSON.parse(_this.navParams.get("resturantSettings"));
                            localStorage.setItem("deliveryFees", settings.DeliveryFees);
                        }
                        else {
                            localStorage.setItem("deliveryFees", "0");
                        }
                        _this.navCtrl.pop();
                        var alert_4 = _this.alertCtrl.create({
                            title: _this.translate.instant('PAGE_TITLE.dilog'),
                            subTitle: _this.translate.instant('ADEDD'),
                            enableBackdropDismiss: false,
                            buttons: [
                                {
                                    text: _this.translate.instant('CONTINE'),
                                    handler: function () {
                                        //ٌResume Shopping
                                        console.log(localStorage.getItem("cartCount"));
                                        //Update cart count for badge
                                        _this.getShoppingCartCount(localStorage.getItem("customerid"));
                                    }
                                },
                                {
                                    text: _this.translate.instant('END'),
                                    handler: function () {
                                        //Go to shopping cart
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__shopping_cart_shopping_cart__["a" /* ShoppingCartPage */], {
                                            resName: _this.resturantName,
                                            resImage: _this.resImage,
                                            resdescription: _this.resDiscription,
                                            resServiceTypeId: _this.serviceTypeId,
                                            menumunCharge: _this.menumumCharge,
                                            resturantId: _this.resturantId
                                        });
                                        _this.getShoppingCartCount(localStorage.getItem("customerid"));
                                    }
                                }
                            ]
                        });
                        alert_4.present();
                        _this.dismissLoading();
                    }
                }, function (err) {
                    _this.dismissLoading();
                    console.log(err._body);
                    var errString = JSON.stringify(err._body);
                    var alert = _this.alertCtrl.create({
                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: errString,
                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert.present();
                });
            }
            else {
                this.dismissLoading();
                //One resturant dialog
                var alert_5 = this.alertCtrl.create({
                    title: this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: this.translate.instant('oneResturant'),
                    buttons: [{
                            text: this.translate.instant('clearlastcart'),
                            handler: function () {
                                _this.clearCart(localStorage.getItem("customerid"));
                            }
                        }, {
                            text: this.translate.instant('cancle'),
                            handler: function () { }
                        }]
                });
                alert_5.present();
            }
            this.dismissLoading();
        }
        else {
            this.genrator.addToCart(cartItem).then(function (result) {
                if (result['shopping_carts'] != null) {
                    console.log(result);
                    localStorage.setItem("resName", _this.resturantName);
                    console.log("goooooooooooooooooooggg" + localStorage.getItem("resName"));
                    localStorage.setItem("branchId", _this.branchId);
                    if (JSON.parse(_this.navParams.get("resturantSettings")) != null) {
                        var settings = JSON.parse(_this.navParams.get("resturantSettings"));
                        localStorage.setItem("deliveryFees", settings.DeliveryFees);
                    }
                    else {
                        localStorage.setItem("deliveryFees", "0");
                    }
                    _this.navCtrl.pop();
                    var alert_6 = _this.alertCtrl.create({
                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: _this.translate.instant('ADEDD'),
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: _this.translate.instant('CONTINE'),
                                handler: function () {
                                    //ٌResume Shopping
                                    console.log(localStorage.getItem("cartCount"));
                                    //Update cart count for badge
                                    _this.getShoppingCartCount(localStorage.getItem("customerid"));
                                }
                            },
                            {
                                text: _this.translate.instant('END'),
                                handler: function () {
                                    //Go to shopping cart
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__shopping_cart_shopping_cart__["a" /* ShoppingCartPage */], {
                                        resName: _this.resturantName,
                                        resImage: _this.resImage,
                                        resdescription: _this.resDiscription,
                                        resServiceTypeId: _this.serviceTypeId,
                                        menumunCharge: _this.menumumCharge,
                                        resturantId: _this.resturantId
                                    });
                                    _this.getShoppingCartCount(localStorage.getItem("customerid"));
                                }
                            }
                        ]
                    });
                    alert_6.present();
                    _this.dismissLoading();
                }
            }, function (err) {
                _this.dismissLoading();
                console.log(err._body);
                var errString = JSON.stringify(err._body);
                var alert = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: errString,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert.present();
            });
        }
    };
    MealInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-meal-info',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\meal-info\meal-info.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{mealName}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <div class="header-banner" *ngFor="let meal of mealInfo">\n    <!--The Slider-->\n    <ion-slides pager="true" options="{pagination: true}" autoplay="5000" loop="true" speed="500">\n      <ion-slide *ngFor="let image of meal.images">\n        <img class="img" [src]="image.src" />\n      </ion-slide>\n\n      <ion-slide *ngIf="meal.images.length == 0">\n        <img class="img" src="./assets/imgs/categories-filters/meal-placeholder.png" />\n      </ion-slide>\n\n\n\n    </ion-slides>\n    <!--The Rating Bar-->\n    <div class="rating-bar" (click)="goMealReviews()">\n      <rating justify-content-center align-items-center style="height: 100%" [(ngModel)]="meal.rating" readOnly="true" max="5"\n        emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star" nullable="false">\n      </rating>\n      <ion-icon name="ios-arrow-forward"></ion-icon>\n    </div>\n  </div>\n\n\n  <!--The escription bar-->\n  <div class="info-bar" *ngFor="let meal of mealInfo">\n    <p class="infotxt">{{meal.short_description}} </p>\n\n    <!-- (ngModelChange)="onModelChange($event)" -->\n    <!--<h1 class="pricestyle">{{count*meal.price+count*optionPrice}}\n              <small>{{meal.currency_code}}</small>\n          </h1>-->\n  </div>\n\n\n  <!--The QTY part-->\n  <ion-row dir="{{oriantation}}" justify-content-center align-items-center class="qty">\n    <label>{{\'count\' | translate}}</label>\n    <div class="box" dir="rtl">\n      <button class="cartbutton" ion-button icon-only (click)="up()">\n        <ion-icon name="md-add"></ion-icon>\n      </button>\n      {{count}}\n      <button class="cartbutton" ion-button icon-only (click)="dwon()">\n        <ion-icon name="remove"></ion-icon>\n      </button>\n    </div>\n  </ion-row>\n\n\n\n  <ion-row class="addition">\n    <button *ngIf="mealAdditions.length != 0" ion-button outline (click)="onButtonClick1()" class="style2">{{\'Additions\' | translate}}</button>\n    <div *ngIf="buttonClicked1" class="options" dir="{{oriantation}}">\n      <!-- (ionChange)="print()" -->\n      <ion-list no-lines>\n        <ion-row justify-content-center align-items-center style="height: 100%" *ngFor="let addition of mealAdditions">\n          <ion-checkbox style="padding-left:8px ; padding-right:8px " color="primary" (ionChange)="toggleComponent($event, addition)"></ion-checkbox>\n          <ion-label>{{addition.name}}\n\n\n            <label *ngIf="addition.price!=0">({{addition.price}}<small>{{mealItem.currency_code}}</small>)&#x200E;</label>\n            <label color="primary" *ngIf="addition.price==0">({{\'free\' | translate}})&#x200E;</label>\n\n\n\n          </ion-label>\n\n          <button *ngIf="mealAddisionsStatus[addition.name]" class="cartbutton" ion-button icon-only (click)="incAdditionCount(addition.name,addition.price)">\n            <ion-icon color="primary" name="arrow-dropup"></ion-icon>\n          </button>\n          {{mealAdditionsCountsMap[addition.name]}}\n          <button *ngIf="mealAddisionsStatus[addition.name]" class="cartbutton" ion-button icon-only (click)="decAdditionCount(addition.name,addition.price)">\n            <ion-icon color="primary" name="arrow-dropdown"></ion-icon>\n          </button>\n        </ion-row>\n      </ion-list>\n    </div>\n  </ion-row>\n\n\n\n  <ion-row class="customization">\n    <button *ngIf="mealAttr.length != 0" ion-button outline (click)="onButtonClick2()" class="style2">{{\'Customization\' | translate}}</button>\n    <div *ngIf="buttonClicked2">\n\n      <div class="group" *ngFor="let attr of mealAttr" dir="{{oriantation}}">\n        <!-- (ionChange)="print()" -->\n        <ion-list no-lines radio-group>\n          <ion-list-header no-lines>\n            {{attr.product_attribute_name}}\n          </ion-list-header>\n          <ion-item *ngFor="let option of attr.attribute_values">\n            <ion-label>{{option.name}} \n\n              <label *ngIf="option.price_adjustment!=0">(+{{option.price_adjustment}}<small>{{mealItem.currency_code}}</small>)&#x200E;</label>  \n              <label color="primary" *ngIf="option.price_adjustment==0">({{\'free\' | translate}})&#x200E;</label>  \n\n            </ion-label>\n            <ion-radio item-start (click)="getOptionPrice(attr.id,option.price_adjustment)" (click)="getOptionId(attr.id,option.id)"></ion-radio>\n          </ion-item>\n        </ion-list>\n      </div>\n    </div>\n  </ion-row>\n\n</ion-content>\n\n<ion-footer class="footer" no-lines>\n\n  <!-- <ion-row justify-content-center align-items-center style="height: 100%">\n    <button class="cartbutton" ion-button icon-only (click)="up()">\n      <ion-icon color="primary" name="ios-arrow-dropup"></ion-icon>\n    </button>\n    {{count}}\n    <button class="cartbutton" ion-button icon-only (click)="dwon()">\n      <ion-icon color="primary" name="ios-arrow-dropdown"></ion-icon>\n    </button>\n  </ion-row>\n  <button color="secondary" ion-button round block (click)="printIds()">{{\'addtocart\' | translate}}</button> -->\n  <ion-row dir="{{oriantation}}" class="footer">\n\n    <button color="secondary" ion-button round block (click)="addToCart()">{{\'addtocart\' | translate}}</button>\n    <h2 *ngFor="let meal of mealInfo" class="pricestyle">\n      <ion-icon name="md-cash"></ion-icon> {{count*meal.price+optionPrice+additionPrice | number :\'2.1-2\'}}\n      <small>{{meal.currency_code}}</small>\n    </h2>\n\n  </ion-row>\n\n</ion-footer>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\meal-info\meal-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], MealInfoPage);
    return MealInfoPage;
}());

//# sourceMappingURL=meal-info.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_launch_navigator__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ViewOrderPage = /** @class */ (function () {
    function ViewOrderPage(navCtrl, navParams, genrator, trans, alertCtrl, launchNavigator, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genrator = genrator;
        this.trans = trans;
        this.alertCtrl = alertCtrl;
        this.launchNavigator = launchNavigator;
        this.loadingCtrl = loadingCtrl;
        this.oriantation = "";
        this.orderDetalis = [];
        this.orderItems = [];
        this.order = "";
        this.status1 = { stImage: "./assets/imgs/view-order/step-1.png" };
        this.status2 = { stImage: "./assets/imgs/view-order/step-2.png" };
        this.status3 = { stImage: "./assets/imgs/view-order/step-3.png" };
        this.pickUpstatus1 = { stImage: "./assets/imgs/view-order/Pickup/step-1.png" };
        this.pickUpstatus2 = { stImage: "./assets/imgs/view-order/Pickup/step-2.png" };
        this.pickUpstatus3 = { stImage: "./assets/imgs/view-order/Pickup/step-3.png" };
        this.statusActive = "step active";
        this.statusDisActive = "step";
        this.orderId = "";
        this.serviceTypeId = "";
        this.status = "";
        this.active1 = "";
        this.active2 = "";
        this.active3 = "";
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.vieworder = "details";
        this.orderId = navParams.get("orderid");
        this.getOrderDetails(this.orderId);
    }
    ViewOrderPage.prototype.showLoading = function () {
        if (!this.loading) {
            this.loading = this.loadingCtrl.create({
                content: this.trans.instant('LOADING')
            });
            this.loading.present();
        }
    };
    ViewOrderPage.prototype.dismissLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    ViewOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewOrderPage');
    };
    //Get Order Details
    ViewOrderPage.prototype.getOrderDetails = function (orderId) {
        var _this = this;
        this.showLoading();
        return this.genrator.getOrderDetails(orderId, localStorage.getItem('lang')).subscribe(function (data) {
            _this.orderDetalis = data['orders'];
            var orderItem = _this.orderDetalis[0];
            _this.serviceTypeId = orderItem.service_type_id;
            //Order status by service type id
            if (orderItem.service_type_id == 1) {
                _this.changeOrderStatus(orderItem.order_status_id);
            }
            else if (orderItem.service_type_id == 2) {
                _this.changeOrderStatusPickup(orderItem.order_status_id);
            }
            _this.order = orderItem;
            _this.orderItems = orderItem['order_items'];
            console.log(_this.order);
            _this.dismissLoading();
        }, function (err) {
            _this.dismissLoading();
            // let alert = this.alertCtrl.create({
            //   title: this.trans.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.trans.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
        });
    };
    ViewOrderPage.prototype.calcEachItemPrice = function (orderItem) {
        var total = 0;
        total = orderItem.product.price * orderItem.quantity;
        for (var i = 0; i < orderItem.additions.length; i++) {
            var addition = orderItem.additions[i];
            total += (addition.price * addition.quantity);
        }
        for (var i = 0; i < orderItem.customizations.length; i++) {
            var customize = orderItem.customizations[i];
            total += (customize.price * customize.quantity);
        }
        return total;
    };
    //Control order status method 
    ViewOrderPage.prototype.changeOrderStatus = function (statusId) {
        switch (statusId) {
            case 70:
                this.status = this.status1.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusDisActive;
                this.active3 = this.statusDisActive;
                break;
            case 20:
                this.status = this.status2.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusDisActive;
                break;
            case 30:
                this.status = this.status3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
            case 40:
                this.status = this.status1.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusDisActive;
                this.active3 = this.statusDisActive;
                break;
            case 50:
                this.status = this.status3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
            case 60:
                this.status = this.status3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
            case 80:
                this.status = this.status3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
        }
    };
    //Control order status method when Pickup
    ViewOrderPage.prototype.changeOrderStatusPickup = function (statusId) {
        switch (statusId) {
            case 70:
                this.status = this.pickUpstatus1.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusDisActive;
                this.active3 = this.statusDisActive;
                break;
            case 20:
                this.status = this.pickUpstatus2.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusDisActive;
                break;
            case 30:
                this.status = this.pickUpstatus3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
            case 40:
                this.status = this.pickUpstatus1.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusDisActive;
                this.active3 = this.statusDisActive;
                break;
            case 50:
                this.status = this.pickUpstatus3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
            case 60:
                this.status = this.pickUpstatus3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
            case 80:
                this.status = this.pickUpstatus3.stImage;
                this.active1 = this.statusActive;
                this.active2 = this.statusActive;
                this.active3 = this.statusActive;
                break;
        }
    };
    ViewOrderPage.prototype.cancelOrder = function () {
        var _this = this;
        this.showLoading();
        this.genrator.changeOrderStatus(localStorage.getItem("customerid"), this.orderId, 40).then(function (data) {
            var alert = _this.alertCtrl.create({
                title: _this.trans.instant('PAGE_TITLE.dilog'),
                subTitle: _this.trans.instant('ordercanceld'),
                buttons: [_this.trans.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            _this.navCtrl.pop();
            _this.dismissLoading();
        }, function (err) {
            _this.dismissLoading();
            var alert = _this.alertCtrl.create({
                title: _this.trans.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.trans.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    ViewOrderPage.prototype.reOrder = function () {
        var _this = this;
        this.showLoading();
        this.genrator.reorder(this.orderId).then(function (data) {
            if (data['orders'] != null) {
                var alert_1 = _this.alertCtrl.create({
                    title: _this.trans.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.trans.instant('reorderdone'),
                    buttons: [_this.trans.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
                _this.navCtrl.pop();
            }
            _this.dismissLoading();
        }, function (err) {
            _this.dismissLoading();
            var alert = _this.alertCtrl.create({
                title: _this.trans.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.trans.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    ViewOrderPage.prototype.goBranchLocation = function (bounds) {
        if (bounds != null) {
            var coordsArray = bounds.split(",");
            var lat = localStorage.getItem("userLat");
            var lng = localStorage.getItem("userLng");
            console.log(lat, lng);
            this.launchNavigator.navigate([parseFloat(coordsArray[0]), parseFloat(coordsArray[1])], {
                start: lat + "," + lng
            });
        }
        else {
            alert("No Location");
        }
    };
    ViewOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'page-view-order',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\view-order\view-order.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{\'orderdetails\'|translate}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding dir="{{oriantation}}">\n    <!--Restaurant name and logo-->\n    <ion-row class="rest-info">\n        <img *ngIf="order.vendor_logo!=null" [src]="order.vendor_logo">\n        <div>\n            <h3>{{order.vendor_name}}</h3>\n            <!-- <h1>{{\'orderno\' | translate}}#{{orderId}}</h1> -->\n            <small>{{order.branch_name}} <br></small>\n            <span>{{ order.created_on_utc | date :\'MM/dd/yyyy hh:mm a\'}}</span>\n        </div>\n    </ion-row>\n\n\n\n    <div class="seg-tabs">\n        <ion-segment [(ngModel)]="vieworder">\n            <ion-segment-button [hidden]="false" value="details">{{\'orderdetails\'|translate}} #{{orderId}}\n            </ion-segment-button>\n            <ion-segment-button\n                [hidden]="order.order_status_id==10 || order.order_status_id==40 || order.order_status_id==60"\n                value="status">{{\'orderstatus\'|translate}}</ion-segment-button>\n        </ion-segment>\n    </div>\n\n\n\n\n    <div class="seg-content" [ngSwitch]="vieworder">\n        <ion-list class="status" *ngSwitchCase="\'status\'">\n            <div class="steps-img">\n                <img class="steps" src="{{status}}">\n            </div>\n            <ion-item-group>\n                <div class="{{active1}}">\n                    <p>{{\'pending\' | translate}}</p>\n                    <small>{{\'pendingdetails\' | translate}}</small>\n                </div>\n                <div class="{{active2}}">\n                    <p>{{\'processing\' | translate}}</p>\n                    <small>{{\'processingdetals\' | translate}}</small>\n                </div>\n                <div *ngIf="order.service_type_id==1" class="{{active3}}">\n                    <p>{{\'completed\' | translate}}</p>\n                    <small>{{\'completeddetails\' | translate}}</small>\n                </div>\n\n                <div *ngIf="order.service_type_id==2" class="{{active3}}">\n                    <p>{{\'orderreaady\' | translate}}</p>\n                    <small>{{\'orderreaadydetails\' | translate}}</small>\n                </div>\n            </ion-item-group>\n\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'details\'">\n\n\n\n            <!--The Order Details Table-->\n            <table class="details" full>\n                <thead>\n                    <tr>\n                        <th class="order">{{\'order\' | translate}}</th>\n                        <th class="qty">{{\'qty\' | translate}}</th>\n                        <th class="price">{{\'pricc\' | translate}}</th>\n                    </tr>\n                </thead>\n\n                <tbody>\n                    <tr *ngFor="let item of orderItems">\n                        <td class="order">\n                            <!--The Main Meal-->\n                            <div class="main-order">\n                                <h6 class="ordname">{{item.product.name}} ({{item.product.price*item.quantity | number :\'2.1-2\'}})\n                                    &#x200E;</h6>\n                            </div>\n                            <!--The List of Addition-->\n                            <ion-list no-lines class="add" *ngIf="item.additions.length != 0">\n                                <p>{{\'Additions\' | translate}}</p>\n                                <ion-item *ngFor="let addition of item.additions">{{addition.addition_name}}\n\n                                    <label\n                                        *ngIf="addition.price!=0">({{addition.price*addition.quantity | number :\'2.1-2\'}})&#x200E;</label>\n                                    <label color="primary"\n                                        *ngIf="addition.price==0">({{\'free\' | translate}})&#x200E;</label>\n\n                                </ion-item>\n                            </ion-list>\n                            <!--The List of Customisation-->\n                            <ion-list no-lines class="cust" *ngIf="item.customizations.length != 0">\n                                <p>{{\'Customization\' | translate}}</p>\n                                <ion-item *ngFor="let customiz of item.customizations">{{customiz.customization_name}}\n\n                                    <label\n                                        *ngIf="customiz.price!=0">(+{{customiz.price*customiz.quantity | number :\'2.1-2\'}})&#x200E;</label>\n                                    <label color="primary"\n                                        *ngIf="customiz.price==0">({{\'free\' | translate}})&#x200E;</label>\n\n                                </ion-item>\n                            </ion-list>\n                        </td>\n                        <td class="qty">\n                            <!--The List of Quantity for The Main Meal-->\n                            <ion-item class="main-order">\n\n                                {{item.quantity}}\n\n                            </ion-item>\n                            <!--The List of Quantity for Addition-->\n                            <ion-list no-lines class="add">\n                                <ion-item *ngFor="let addition of item.additions">\n\n                                    {{addition.quantity}}\n\n                                </ion-item>\n                            </ion-list>\n                        </td>\n                        <td class="price">{{calcEachItemPrice(item) | number :\'2.1-2\'}}</td>\n                    </tr>\n\n                </tbody>\n\n                <tfoot>\n\n                    <tr *ngIf="serviceTypeId== 1">\n                        <td>{{\'deliveryfees\' | translate}}</td>\n                        <td></td>\n                        <td class="price">{{order.delivery_fees}}</td>\n                    </tr>\n                    <tr>\n                        <td>{{\'total\' | translate}}</td>\n                        <td></td>\n                        <td class="price">{{order.order_total | number :\'2.1-2\'}}</td>\n                    </tr>\n                    <tr *ngIf="order.order_discount!=0">\n                        <td>{{\'dicount\' | translate}}</td>\n                        <td></td>\n                        <td class="price">{{order.order_discount}}</td>\n                    </tr>\n                </tfoot>\n\n\n\n\n            </table>\n\n\n            <!-- <ion-item class="item" *ngFor="let item of orderItems">\n          \n          <h2>{{item.product.name}} {{item.quantity}}x</h2>\n          <p class="qty" *ngFor="let add of item.additions">#{{add.addition_name}} {{add.quantity}}x</p>\n          <p class="qty" *ngFor="let cust of item.customizations">#{{cust.customization_name}}</p>\n          <p class="price">{{item.price_incl_tax}}{{order.customer_currency_code}}</p>\n        </ion-item> -->\n\n            <!-- <ion-item>\n                <p>{{\'deliveryfees\' | translate}} {{order.delivery_fees}}\n                    <small>{{order.customer_currency_code}}</small>\n                </p>\n                <p>{{\'discount\' | translate}} 00.00 SR</p>\n                <p>{{\'total\' | translate}} {{order.order_total}}\n                    <small>{{order.customer_currency_code}}</small>\n                </p> -->\n\n\n            <!-- <p>SubTotal {{order.order_subtotal_incl_tax}}{{order.customer_currency_code}}</p> -->\n            <!-- </ion-item> -->\n            \n            <ion-row class="notes" *ngIf="order.order_note!=\'\'">\n                <h2>{{\'ordernotes\' | translate}}<br></h2>\n                <p>\n                    <small>{{order.order_note}}</small>\n                </p>\n            </ion-row>\n\n            <ion-row class="allcash">\n                <p *ngIf="order.order_discount!=0">\n                    <small>{{\'amountreq\' | translate}}</small> {{order.order_total_after_discount}}\n                    <small>{{order.customer_currency_code}}</small>\n                </p>\n                <p *ngIf="order.order_discount==0">\n                    <small>{{\'amountreq\' | translate}}</small> {{order.order_total | number :\'2.1-2\'}}\n                    <small>{{order.customer_currency_code}}</small>\n                </p>\n            </ion-row>\n\n\n\n\n        </ion-list>\n\n    </div>\n\n\n    <!-- Branch Location Button -->\n    <button *ngIf="order.service_type_id==2" class="butn" ion-button round block color="secondary"\n        (click)="goBranchLocation(order.branch_bounds)">\n        <ion-icon padding name="pin"></ion-icon>\n        {{\'branchlocatio\' | translate}}\n    </button>\n    <button class="butn" padding ion-button color="primary" round block *ngIf="order.order_status_id==10"\n        (click)="cancelOrder()">{{\'cancleorder\' | translate }}</button>\n    <button class="butn" padding ion-button color="primary" round block *ngIf="order.order_status_id==40"\n        (click)="reOrder()">{{\'reorder\' | translate }}</button>\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\view-order\view-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* LoadingController */]])
    ], ViewOrderPage);
    return ViewOrderPage;
}());

//# sourceMappingURL=view-order.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoreListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_main_screen_main_screen__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_intro_screen_intro_screen__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__offers_offers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_settings__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__aboutus_aboutus__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__contact_us_contact_us__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_cache__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var MoreListPage = /** @class */ (function () {
    function MoreListPage(navCtrl, navParams, cacheService, generator, splashScreen, translateService, events, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cacheService = cacheService;
        this.generator = generator;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.app = app;
        this.langName = "";
        this.mode = "";
        this.oriantation = "";
        this.loggedOut = false;
        this.loggedIn = false;
        if (localStorage.getItem('customerid') === null) {
            this.loggedOut = true;
            this.loggedIn = false;
        }
        else {
            this.loggedOut = false;
            this.loggedIn = true;
        }
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        if (localStorage.getItem('mode') == "development") {
            this.mode = "Production";
        }
        else {
            this.mode = "Development";
        }
        if (localStorage.getItem('lang') == "2") {
            this.langName = "English";
        }
        else {
            this.langName = "اللغة العربية";
        }
    }
    MoreListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MoreListPage');
    };
    MoreListPage.prototype.loginEvent = function () {
        this.loggedOut = false;
        this.loggedIn = true;
    };
    //Logout
    MoreListPage.prototype.logout = function () {
        localStorage.removeItem('customerid');
        localStorage.removeItem('customerdata');
        localStorage.setItem('cartCount', "0");
        localStorage.removeItem("customerLocation");
        localStorage.removeItem("rated");
        // this.navCtrl.setRoot();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__pages_intro_screen_intro_screen__["a" /* IntroScreenPage */]);
    };
    //Login
    MoreListPage.prototype.login = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
    };
    //go home page
    MoreListPage.prototype.gohome = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_main_screen_main_screen__["a" /* MainScreenPage */]).then(function () {
            // first we find the index of the current view controller:
            var viewc;
            var index = viewc.index;
            // then we remove it from the navigation stack
            _this.navCtrl.remove(index);
        });
    };
    //Go signUp
    MoreListPage.prototype.signUp = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__pages_sign_up_sign_up__["a" /* SignUpPage */]);
    };
    //Go profile
    MoreListPage.prototype.goProfile = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__pages_profile_profile__["a" /* ProfilePage */]);
    };
    //Go Orders Page
    MoreListPage.prototype.goOrdersPage = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__orders_orders__["a" /* OrdersPage */]);
    };
    //Go Offers Page
    MoreListPage.prototype.goOffersPage = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_8__offers_offers__["a" /* OffersPage */]);
    };
    //Go settings Page
    MoreListPage.prototype.goSettings = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__settings_settings__["a" /* SettingsPage */]);
    };
    //Go AboutUs Page 
    MoreListPage.prototype.goAboutUs = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_11__aboutus_aboutus__["a" /* AboutusPage */]);
    };
    //Go ContactUs Page
    MoreListPage.prototype.goContactUs = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_12__contact_us_contact_us__["a" /* ContactUsPage */]);
    };
    MoreListPage.prototype.toggleIcon = function (getIcon) {
        if (this.langName === "English") {
            this.langName = "اللغة العربية";
            this.translateService.use("en");
            localStorage.setItem('lang', "1");
            this.splashScreen.show();
            location.reload();
        }
        else {
            this.translateService.use("ar");
            localStorage.setItem('lang', "2");
            this.langName = "English";
            this.splashScreen.show();
            location.reload();
        }
    };
    MoreListPage.prototype.checkLogin = function () {
        if (localStorage.getItem('customerid') === null) {
            return false;
        }
        else {
            return true;
        }
    };
    //Change App mode 
    MoreListPage.prototype.appMode = function () {
        if (this.mode === "Production") {
            localStorage.setItem('mode', "Production");
            this.mode = "Development";
            this.logout();
            this.splashScreen.show();
            location.reload();
        }
        else if (this.mode === "Development") {
            localStorage.setItem('mode', "development");
            this.mode = "Production";
            this.logout();
            this.splashScreen.show();
            location.reload();
        }
    };
    MoreListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-more-list',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\more-list\more-list.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'more\' | translate}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content dir="{{oriantation}}">\n  <ion-list>\n    <div class="logo">\n      <img src="./assets/imgs/sidemenu-logo.png" />\n    </div>\n\n\n    <button ion-item detail-none class="sidemenu" (click)="toggleIcon()">\n      <ion-icon name="md-globe"></ion-icon>\n      <!-- <ion-icon color="primary" name="ios-pricetags" item-end></ion-icon> -->\n      <h2>{{langName}}</h2>\n    </button>\n\n    <!-- <button ion-item detail-none class="sidemenu" (click)="gohome()">\n      <ion-icon name="ios-home"></ion-icon>\n      <h2> {{ \'SIDEMENU.home\' | translate }}</h2>\n    </button> -->\n\n    <button *ngIf="loggedIn" ion-item detail-none class="sidemenu" (click)="goProfile()">\n      <ion-icon name="ios-contact"></ion-icon>\n      <h2>{{ \'SIDEMENU.account\' | translate }}</h2>\n    </button>\n\n    <button *ngIf="loggedOut" ion-item detail-none class="sidemenu" (click)="signUp()">\n      <ion-icon name="ios-contact"></ion-icon>\n      <h2>{{ \'PAGE_TITLE.signup\' | translate }}</h2>\n    </button>\n\n\n    <!-- <button ion-item detail-none class="sidemenu" (click)="goOrdersPage()" *ngIf="checkLogin()" >\n      <ion-icon name="ios-basket"></ion-icon>\n      <h2>{{ \'SIDEMENU.basket\' | translate }}</h2>\n    </button> -->\n\n\n    <!-- <button ion-item detail-none class="sidemenu" (click)="goOffersPage()">\n      <ion-icon name="md-pricetag"></ion-icon>\n      <h2>{{ \'SIDEMENU.discounted\' | translate }}</h2>\n    </button> -->\n\n\n    <button ion-item detail-none class="sidemenu" (click)="goAboutUs()">\n      <ion-icon name="ios-people"></ion-icon>\n      <h2>{{ \'SIDEMENU.aboutus\' | translate }}</h2>\n    </button>\n\n\n    <button *ngIf="loggedIn" ion-item detail-none class="sidemenu" (click)="logout()">\n      <ion-icon name="md-log-out"></ion-icon>\n      <h2>{{ \'SIDEMENU.logout\' | translate }}</h2>\n    </button>\n\n    <button *ngIf="loggedOut" ion-item detail-none class="sidemenu" (click)="login()">\n      <ion-icon name="md-log-in"></ion-icon>\n      <h2>{{ \'SIDEMENU.login\' | translate }}</h2>\n    </button>\n\n\n<!-- \n    <button  ion-item detail-none class="sidemenu" (click)="appMode()">\n      <ion-icon name="md-cog"></ion-icon>\n      <h2>{{mode}}</h2>\n    </button> -->\n\n\n\n\n\n\n  </ion-list>\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\more-list\more-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_15_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_14__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], MoreListPage);
    return MoreListPage;
}());

//# sourceMappingURL=more-list.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, trans, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trans = trans;
        this.config = config;
        config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.onChange = function (e) {
        this.trans.use(e);
        localStorage.setItem('lang', e + "");
        this.navCtrl.pop();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SIDEMENU.settings\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-list>\n        <ion-item>\n            <ion-label>Notification Sound</ion-label>\n            <ion-toggle></ion-toggle>\n        </ion-item>\n\n        <!--<ion-item>\n            <ion-select placeholder="{{ \'LANG\' | translate }}" [(ngModel)]="language" (ionChange)="onChange($event)">\n                <ion-option value="ar">عربي</ion-option>\n                <ion-option value="en">English</ion-option>\n            </ion-select>\n        </ion-item>-->\n\n        <ion-item>\n            <ion-label>{{ \'LANG\' | translate }}</ion-label>\n            <ion-select [(ngModel)]="language" (ionChange)="onChange($event)">\n                <ion-option value="ar">عربي</ion-option>\n                <ion-option value="en">English</ion-option>\n            </ion-select>\n        </ion-item>        \n\n    </ion-list>\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MealsReviewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MealsReviewsPage = /** @class */ (function () {
    function MealsReviewsPage(navCtrl, navParams, loader, translate, alertCtrl, genrator, _FB, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loader = loader;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.genrator = genrator;
        this._FB = _FB;
        this.title = "";
        this.mealId = "";
        this.oriantation = "";
        this.mealReviews = [];
        this.buttonClicked = false; //For Rating button
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.title = navParams.get("mealname");
        this.mealId = navParams.get("mealid");
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.form = _FB.group({
            reviewtxt: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(500), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            review_value: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
        });
        this.getMealReviews();
    }
    MealsReviewsPage.prototype.onButtonClick = function () {
        if (localStorage.getItem("customerid") === null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }
        else {
            this.buttonClicked = !this.buttonClicked;
        }
    };
    MealsReviewsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MealsReviewsPage');
    };
    MealsReviewsPage.prototype.addMealReview = function (value) {
        var _this = this;
        var mealReview = {
            "product_rating": {
                "customer_id": localStorage.getItem("customerid"),
                "product_id": this.mealId,
                "review_text": value.reviewtxt + "",
                "rating": value.review_value + ""
            }
        };
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        this.genrator.addMealReview(mealReview).then(function (result) {
            loader.dismiss();
            console.log(result);
            if (result['product_ratings'] != null) {
                _this.form.reset();
                _this.getMealReviews();
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('reviewsucsess'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: result.ErrorMessage,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_2.present();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: "",
                subTitle: err,
                buttons: ['Disms']
            });
            alert.present();
        });
    };
    //Get resturant reviews 
    MealsReviewsPage.prototype.getMealReviews = function () {
        var _this = this;
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        return this.genrator.getMealReviews(this.mealId).subscribe(function (data) {
            _this.mealReviews = data['product_ratings'];
            loader.dismiss();
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
        });
    };
    MealsReviewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-meals-reviews',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\meals-reviews\meals-reviews.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="ratingpage">\n\n  <ion-item class="addRating"  dir="{{oriantation}}">\n       <!--Row of Rating form-->\n       <button ion-button full (click)="onButtonClick()" class="style2">\n        <ion-icon name="add"></ion-icon>{{\'addrating\' | translate}}</button>\n    <form [formGroup]="form" (ngSubmit)="addMealReview(form.value)" *ngIf="buttonClicked">\n        <rating justify-content-center align-items-center max="5" formControlName="review_value" emptyStarIconName="star-outline" halfStarIconName="star-half" starIconName="star"></rating>\n        <textarea formControlName="reviewtxt" type="text" placeholder="{{\'addyourreview\' | translate}}"></textarea>\n        <button ion-button round [disabled]="!form.valid">{{\'send\' | translate}}</button>\n    </form>\n  </ion-item>\n\n  <ion-list dir="{{oriantation}}">\n    <!--Users Rating Part-->\n    <ion-item *ngFor="let review of mealReviews">\n      <h3>{{review.customer_name}}</h3>\n      <p>{{review.review_text}}</p>\n      <rating justify-content-center align-items-center max="5" readOnly="true" [(ngModel)]="review.rating" ></rating>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\meals-reviews\meals-reviews.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */]])
    ], MealsReviewsPage);
    return MealsReviewsPage;
}());

//# sourceMappingURL=meals-reviews.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResturantReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResturantReviewPage = /** @class */ (function () {
    function ResturantReviewPage(navCtrl, _FB, loader, translate, genrator, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this._FB = _FB;
        this.loader = loader;
        this.translate = translate;
        this.genrator = genrator;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.form = _FB.group({
            reviewtxt: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].maxLength(500), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required])],
            review_value: ['', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required])],
        });
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.resturantData = JSON.parse(navParams.get("order"));
        console.log(navParams.get("order"));
    }
    ResturantReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResturantReviewPage');
    };
    //Add resturant review 
    ResturantReviewPage.prototype.addResturantReview = function (value) {
        var _this = this;
        var resturantReview = {
            "rating": {
                "customer_id": localStorage.getItem("customerid"),
                "expert_id": this.resturantData.vendor_id,
                "review_text": value.reviewtxt + "",
                "rating": value.review_value + ""
            }
        };
        console.log(resturantReview);
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        this.genrator.addResturantReview(resturantReview).then(function (result) {
            loader.dismiss();
            console.log(result);
            if (result['ratings'] != null) {
                _this.form.reset();
                localStorage.removeItem("rated");
                console.log(localStorage.getItem("rated"));
                _this.navCtrl.pop();
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('reviewsucsess'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
            }
            else {
                _this.navCtrl.pop();
                localStorage.removeItem("lastresturant");
                var alert_2 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: result.ErrorMessage,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_2.present();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: "",
                subTitle: err,
                buttons: ['Disms']
            });
            alert.present();
        });
    };
    ResturantReviewPage.prototype.closemodal = function () {
        this.navCtrl.pop();
    };
    ResturantReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'page-resturant-review',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\resturant-review\resturant-review.html"*/'<ion-content padding class="ratingpage">\n\n  <button class="cartbutton" ion-button icon-only (click)="closemodal()" start>\n    <ion-icon color=primary name="close"></ion-icon>\n  </button>\n\n  <!--Restaurant name and logo-->\n  <ion-label class="lbll">{{\'reviewrestursant\' | translate}}</ion-label>\n\n  <ion-item class="rest-info">\n    <img *ngIf="resturantData.vendor_logo!=null" [src]="resturantData.vendor_logo">\n    <div>\n      <h3>{{resturantData.vendor_name}}</h3>\n    </div>\n  </ion-item>\n\n  <ion-item class="addRating" dir="{{oriantation}}">\n    <!--Row of Rating form-->\n    <form [formGroup]="form" (ngSubmit)="addResturantReview(form.value)">\n      <rating justify-content-center align-items-center max="5" formControlName="review_value" emptyStarIconName="star-outline"\n        halfStarIconName="star-half" starIconName="star"></rating>\n      <textarea formControlName="reviewtxt" type="text" placeholder="{{\'addyourreview\' | translate}}"></textarea>\n      <button ion-button round [disabled]="!form.valid">{{\'send\' | translate}}</button>\n    </form>\n  </ion-item>\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\resturant-review\resturant-review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* NavParams */]])
    ], ResturantReviewPage);
    return ResturantReviewPage;
}());

//# sourceMappingURL=resturant-review.js.map

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 214;

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/aboutus/aboutus.module": [
		520,
		20
	],
	"../pages/account-active/account-active.module": [
		522,
		19
	],
	"../pages/contact-us/contact-us.module": [
		521,
		18
	],
	"../pages/intro-screen/intro-screen.module": [
		523,
		17
	],
	"../pages/login/login.module": [
		524,
		16
	],
	"../pages/main-screen/main-screen.module": [
		525,
		15
	],
	"../pages/meal-info/meal-info.module": [
		526,
		14
	],
	"../pages/meals-reviews/meals-reviews.module": [
		527,
		13
	],
	"../pages/more-list/more-list.module": [
		528,
		12
	],
	"../pages/offers/offers.module": [
		529,
		11
	],
	"../pages/order-data/order-data.module": [
		530,
		10
	],
	"../pages/orders/orders.module": [
		532,
		9
	],
	"../pages/pickup-service/pickup-service.module": [
		531,
		8
	],
	"../pages/resturant-info/resturant-info.module": [
		534,
		7
	],
	"../pages/resturant-review/resturant-review.module": [
		535,
		6
	],
	"../pages/settings/settings.module": [
		533,
		5
	],
	"../pages/shopping-cart/shopping-cart.module": [
		536,
		4
	],
	"../pages/sign-up/sign-up.module": [
		537,
		3
	],
	"../pages/update-location/update-location.module": [
		538,
		2
	],
	"../pages/view-order/view-order.module": [
		539,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 262;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var OrderDataPage = /** @class */ (function () {
    function OrderDataPage(navCtrl, app, navParams, _FB, geo, googleMaps, altCtrl, translate, viewCtrl, config, alertCrtl, genrator, loader, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.navParams = navParams;
        this._FB = _FB;
        this.geo = geo;
        this.googleMaps = googleMaps;
        this.altCtrl = altCtrl;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.alertCrtl = alertCrtl;
        this.genrator = genrator;
        this.loader = loader;
        this.markers = [];
        this.customerLocations = [];
        this.selected = true;
        this.oriantation = "";
        this.resturantId = "";
        this.servicID = "";
        this.locationName = "";
        this.notes = "";
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.resturantId = navParams.get('resId');
        this.servicID = navParams.get('serviceId');
        this.customerLocationName = JSON.parse(localStorage.getItem('customerLocation'));
        console.log(this.customerLocationName);
        this.form = _FB.group({
            locationName: ['', __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].required])],
            notes: ['', __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].maxLength(20)])],
        });
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        // Wait the native plugin is ready.
        platform.ready().then(function () {
            _this.defaultloadMap();
        });
    }
    OrderDataPage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = 'none';
        this.defaultloadMap();
    };
    OrderDataPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    OrderDataPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderDataPage');
    };
    OrderDataPage.prototype.setFormElemnt = function (val) {
        this.form.controls['locationName'].setValue(val);
    };
    OrderDataPage.prototype.defaultloadMap = function () {
        this.lat = parseFloat(this.customerLocationName.lat);
        this.lng = parseFloat(this.customerLocationName.lng);
        var latLng = new google.maps.LatLng(parseFloat(this.customerLocationName.lat), parseFloat(this.customerLocationName.lng));
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: this.lat,
                lng: this.lng
            }, icon: "./assets/imgs/marker.png",
            draggable: false
        });
        this.setFormElemnt(this.customerLocationName.locationName + "");
    };
    //Confirm Order convert cart items to order
    OrderDataPage.prototype.confirmOrder = function (value) {
        var _this = this;
        var confirmationData;
        if (this.form.valid) {
            confirmationData = {
                "order_info": {
                    "order_id": "0",
                    "customer_id": localStorage.getItem("customerid"),
                    "vendor_id": this.resturantId,
                    "pickup_branch_id": null,
                    "order_note": value.notes,
                    "service_type_id": this.servicID,
                    "longtitude": this.customerLocationName.lng,
                    "latitude": this.customerLocationName.lat,
                    "location_name": value.locationName
                }
            };
        }
        else {
            confirmationData = {
                "order_info": {
                    "order_id": "0",
                    "customer_id": localStorage.getItem("customerid"),
                    "vendor_id": this.resturantId,
                    "pickup_branch_id": null,
                    "order_note": value.notes,
                    "service_type_id": this.servicID,
                    "longtitude": this.customerLocationName.lng,
                    "latitude": this.customerLocationName.lat,
                    "location_name": "UserLocation"
                }
            };
        }
        console.log(confirmationData);
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        return this.genrator.convertCartOrders(confirmationData).then(function (data) {
            _this.conversionResponse = data['orders'];
            if (data['orders'] != null) {
                var alert_1 = _this.alertCrtl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('orderplaced'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */]);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__orders_orders__["a" /* OrdersPage */]);
            }
            console.log(data);
            loader.dismiss();
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ElementRef */])
    ], OrderDataPage.prototype, "mapElement", void 0);
    OrderDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'page-order-data',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\order-data\order-data.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{\'delivery\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content dir="{{oriantation}}">\n     \n   \n    <div #map id="map"></div>\n    <form [formGroup]="form" (ngSubmit)="confirmOrder(form.value)">\n        <ion-list no-line>\n\n            <ion-item class="colr">\n                <ion-label floating>{{\'locationname\' | translate}}</ion-label>\n                <ion-input type="text" formControlName="locationName"></ion-input>\n            </ion-item>\n\n            <ion-item class="colr">\n                <ion-label floating>{{\'note\' | translate}}</ion-label>\n                <ion-input type="text" formControlName="notes"></ion-input>\n            </ion-item>\n\n\n            <!-- <ion-item class="colr">\n                <ion-label floating>{{\'places\' | translate}}</ion-label>\n                <ion-select interface="popover">\n                    <ion-option (click)="chekSelected()" *ngFor="let location of customerLocations">{{location.LocationName}}</ion-option>\n                </ion-select>\n            </ion-item> -->\n\n        </ion-list>\n        <button ion-button block round [disabled]="!form.valid">{{\'makeorder\' | translate}}</button>\n    </form>\n\n\n\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\order-data\order-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["b" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* Platform */]])
    ], OrderDataPage);
    return OrderDataPage;
}());

//# sourceMappingURL=order-data.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PickupServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs_tabs__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PickupServicePage = /** @class */ (function () {
    function PickupServicePage(navCtrl, app, navParams, _FB, geo, googleMaps, altCtrl, translate, viewCtrl, config, alertCrtl, genrator, loader, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.app = app;
        this.navParams = navParams;
        this._FB = _FB;
        this.geo = geo;
        this.googleMaps = googleMaps;
        this.altCtrl = altCtrl;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.alertCrtl = alertCrtl;
        this.genrator = genrator;
        this.loader = loader;
        this.markers = [];
        this.branchLocationName = "";
        this.branchLocations = [];
        this.selected = true;
        this.oriantation = "";
        this.resturantId = "";
        this.servicID = "";
        this.locationName = "";
        this.notes = "";
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.resturantId = navParams.get('resId');
        this.resturantName = navParams.get('name');
        this.resturantImg = navParams.get('img');
        this.servicID = navParams.get('serviceId');
        this.form = _FB.group({
            locationName: ['', __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].required])],
            notes: ['', __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].maxLength(20)])],
        });
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        // Wait the native plugin is ready.
        platform.ready().then(function () {
            _this.getLocation();
            _this.loadMap();
        });
    }
    PickupServicePage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = 'none';
    };
    PickupServicePage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    PickupServicePage.prototype.ionViewDidLoad = function () {
    };
    PickupServicePage.prototype.setFormElemnt = function (val) {
        this.form.controls['locationName'].setValue(val);
    };
    PickupServicePage.prototype.chekSelected = function () {
        if ((this.branchId == null)) {
            this.selected = true;
        }
        else {
            this.selected = false;
        }
    };
    PickupServicePage.prototype.getLocation = function () {
        var _this = this;
        this.geo.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lng = resp.coords.longitude;
            _this.getBranchLocations(resp.coords.latitude, resp.coords.longitude);
        }).catch(function (error) {
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: error,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log('Error getting location', error);
        });
    };
    PickupServicePage.prototype.loadMap = function () {
        var _this = this;
        this.geo.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lng = resp.coords.longitude;
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var _loop_1 = function (i_1) {
                var branchLocation = _this.branchLocations[i_1];
                var marker = new google.maps.Marker({
                    map: _this.map,
                    position: new google.maps.LatLng(branchLocation.longtitude, branchLocation.latitude),
                    icon: "./assets/imgs/branchIcon.png",
                    title: branchLocation.branch_name,
                    draggable: false
                });
                marker.addListener('click', function () {
                    _this.form.controls['locationName'].setValue(marker.title);
                    _this.branchId = branchLocation.id;
                    _this.chekSelected();
                    console.log(_this.branchId);
                });
            };
            for (var i_1 = 0; i_1 < _this.branchLocations.length; i_1++) {
                _loop_1(i_1);
            }
            var latlngbounds = new google.maps.LatLngBounds();
            for (var i = 0; i < _this.branchLocations.length; i++) {
                var customerLocation = _this.branchLocations[i];
                latlngbounds.extend(new google.maps.LatLng(customerLocation.longtitude, customerLocation.latitude));
            }
            _this.map.fitBounds(latlngbounds);
        }).catch(function (error) {
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: error,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log('Error getting location', error);
        });
    };
    PickupServicePage.prototype.getBranchLocations = function (lat, lng) {
        var _this = this;
        this.genrator.getResturantBranches(this.resturantId, lat, lng).then(function (data) {
            if (data['branches'] != null) {
                _this.branchLocations = data['branches'];
                console.log(_this.branchLocations);
                _this.loadMap();
            }
        }, function (err) {
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    //Confirm Order convert cart items to order
    PickupServicePage.prototype.confirmOrder = function (value) {
        var _this = this;
        var confirmationData;
        confirmationData = {
            "order_info": {
                "order_id": "0",
                "customer_id": localStorage.getItem("customerid"),
                "vendor_id": this.resturantId,
                "pickup_branch_id": this.branchId,
                "order_note": this.navParams.get('notes'),
                "service_type_id": this.servicID,
                "location_id": "0"
            }
        };
        console.log(confirmationData);
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        return this.genrator.convertCartOrders(confirmationData).then(function (data) {
            _this.conversionResponse = data['orders'];
            if (data['orders'] != null) {
                var resData = {
                    id: _this.resturantId,
                    name: _this.resturantName,
                    img: _this.resturantImg,
                };
                localStorage.setItem("rated", "0");
                console.log(localStorage.getItem("rated"));
                var alert_1 = _this.alertCrtl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('orderplaced'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__tabs_tabs__["a" /* TabsPage */]);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__orders_orders__["a" /* OrdersPage */]);
            }
            console.log(data);
            loader.dismiss();
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCrtl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ElementRef */])
    ], PickupServicePage.prototype, "mapElement", void 0);
    PickupServicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'page-pickup-service',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\pickup-service\pickup-service.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{\'pickup\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content dir="{{oriantation}}">\n        <ion-title>{{\'selectbranch\' | translate}}</ion-title>\n    <div #map id="map"></div>\n    <form [formGroup]="form" (ngSubmit)="confirmOrder(form.value)">\n        <ion-list no-line>\n\n            <ion-item class="colr">\n                <ion-label floating>{{\'locationname\' | translate}}</ion-label>\n                <ion-input type="text" formControlName="locationName" [disabled]="true"></ion-input>\n            </ion-item>\n\n            <!-- <ion-item class="colr">\n                <ion-label floating>{{\'note\' | translate}}</ion-label>\n                <ion-input type="text" formControlName="notes"></ion-input>\n            </ion-item> -->\n\n\n            <!-- <ion-item class="colr">\n                <ion-label floating>{{\'places\' | translate}}</ion-label>\n                <ion-select interface="popover">\n                    <ion-option (click)="chekSelected()" *ngFor="let location of customerLocations">{{location.LocationName}}</ion-option>\n                </ion-select>\n            </ion-item> -->\n\n        </ion-list>\n        <button ion-button block round  [disabled]="selected">{{\'makeorder\' | translate}}</button>\n    </form>\n\n\n\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\pickup-service\pickup-service.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["b" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["w" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* Platform */]])
    ], PickupServicePage);
    return PickupServicePage;
}());

//# sourceMappingURL=pickup-service.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(442);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, genrator, loader, translate, alertCtrl, _FB, config, viewCtrl, events, app, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genrator = genrator;
        this.loader = loader;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this._FB = _FB;
        this.viewCtrl = viewCtrl;
        this.events = events;
        this.app = app;
        this.oriantation = "";
        this.cntryCode = "";
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.signIn = _FB.group({
            phone: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            countryCode: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])]
        });
    }
    //Login Method
    LoginPage.prototype.doLogin = function (val) {
        var _this = this;
        var loginData = {
            Phone: val.phone, Password: val.phone
        };
        // alert(JSON.stringify(loginData))
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        this.genrator.login(loginData).then(function (result) {
            loader.dismiss();
            _this.data = result;
            if (_this.data.customers != null) {
                localStorage.setItem('customerid', _this.data.customers[0].id);
                localStorage.setItem('customerdata', JSON.stringify(_this.data.customers[0]));
                console.log(localStorage.getItem('customerdata'));
                //Send stored location
                // let location = JSON.parse(localStorage.getItem('locationId'));
                // location.id=this.data.customers[0].id
                // console.log(location);
                //Send notification token to server 
                _this.sendTokenToServer(_this.data.customers[0].id, localStorage.getItem("notificationToken"));
                _this.events.publish('user:login');
                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */], {
                    flag: "intro"
                }).then(function () {
                    // first we find the index of the current view controller:
                    var index = _this.viewCtrl.index;
                    // then we remove it from the navigation stack
                    _this.navCtrl.remove(index);
                });
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.data.errors.Account,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: _this.translate.instant('invalidusername'),
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
        });
    };
    LoginPage.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    LoginPage.prototype.sendTokenToServer = function (customerid, token) {
        this.genrator.sendNotificationToken(customerid, token).then(function (data) {
            console.log("TOKEN SENT : " + JSON.stringify(data));
        }, function (err) {
            console.log("TOKEN SEND ERROR " + JSON.stringify(err));
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\login\login.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n      <ion-title>{{ \'PAGE_TITLE.login\' | translate }}</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content dir="{{oriantation}}">\n  \n      <!--<h3 class="titlelogin">{{ \'logintoyouraccount\' | translate }}</h3>-->\n      <div class="pageLogo">\n          <img src="./assets/imgs/login-logo.png" />\n      </div>\n  \n      <form class="loginform" [formGroup]="signIn" (ngSubmit)="doLogin(signIn.value)">\n          <ion-list no-lines>\n\n            <ion-item class="colr" > \n                <ion-label floating>{{ \'COUNTRY\' | translate }}</ion-label>\n                <ion-select formControlName="countryCode" interface="popover" [(ngModel)]="cntryCode">\n                    <ion-option data-countryCode="SA" value="966" >{{\'Ksa\' | translate}}</ion-option>\n                    <ion-option data-countryCode="EG" value="20">{{\'EG\' | translate}}</ion-option>\n                    <ion-option data-countryCode="US" value="1">{{\'US\' | translate}}</ion-option>\n                    <ion-option data-countryCode="BH" value="973">{{\'bh\' | translate}}</ion-option>\n                    <ion-option data-countryCode="CA" value="1">{{\'CA\' | translate}}</ion-option>\n                    <ion-option data-countryCode="CN" value="86">{{\'CN\' | translate}}</ion-option>\n                    <ion-option data-countryCode="FR" value="33">{{\'FR\' | translate}}</ion-option>\n                    <ion-option data-countryCode="IN" value="91">{{\'IN\' | translate}}</ion-option>\n                    <ion-option data-countryCode="IQ" value="964">{{\'IQ\' | translate}}</ion-option>\n                    <ion-option data-countryCode="IT" value="39">{{\'IT\' | translate}}</ion-option>\n                    <ion-option data-countryCode="LY" value="218">{{\'LY\' | translate}}</ion-option>\n                    <ion-option data-countryCode="MA" value="212">{{\'MA\' | translate}}</ion-option>\n                    <ion-option data-countryCode="QA" value="974">{{\'QA\' | translate}}</ion-option>\n\n                </ion-select>\n            </ion-item>\n\n              <ion-item>\n                  <ion-label floating>{{\'SIgNUP.phone\' | translate}}</ion-label>\n                  <ion-input formControlName="phone" required="true" type="text"></ion-input>\n              </ion-item>\n\n\n  \n          </ion-list>\n          \n        \n          <button class="loginbtn" ion-button round color="primary" [disabled]="!signIn.valid" >\n              <ion-icon padding ios="ios-log-in" md="md-log-in"></ion-icon>\n              {{ \'BUTTONS.btn_login\' | translate }}\n          </button>\n        \n        </form>\n        \n\n\n\n          <div class="in-bottom">\n            <ion-row>\n              <button class="btn1" ion-button clear (click)="signUp()" >{{\'donthaveaccount\' | translate}}</button>\n            </ion-row>\n        </div>\n  </ion-content>\n  '/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Platform */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_order_view_order__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OrdersPage = /** @class */ (function () {
    function OrdersPage(navCtrl, navParams, app, genrator, loadingCtrl, alertCtrl, trans, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.genrator = genrator;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.trans = trans;
        this.config = config;
        this.customerOrders = [];
        this.oriantation = "";
        this.isBusy = false;
        this.isEmpty = false;
        config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.getOrders(localStorage.getItem("customerid"));
    }
    OrdersPage.prototype.showLoading = function () {
        if (!this.loading) {
            this.loading = this.loadingCtrl.create({
                content: this.trans.instant('LOADING')
            });
            this.loading.present();
        }
    };
    OrdersPage.prototype.dismissLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    OrdersPage.prototype.ionViewWillEnter = function () {
        this.getOrders(localStorage.getItem("customerid"));
    };
    OrdersPage.prototype.show = function () {
        this.isBusy = true;
    };
    OrdersPage.prototype.hide = function () {
        this.isBusy = false;
    };
    OrdersPage.prototype.getOrders = function (customerId) {
        var _this = this;
        // let loader = this.loadingCtrl.create({
        //   content: this.trans.instant('LOADING'),
        // });
        // loader.present();
        this.show();
        return this.genrator.getCustomerOrder(customerId, localStorage.getItem('lang')).subscribe(function (data) {
            _this.customerOrders = data['orders'];
            var orders = [];
            orders = data['orders'];
            if (orders.length == 0) {
                _this.isEmpty = true;
            }
            else {
                _this.isEmpty = false;
            }
            console.log(_this.customerOrders);
            _this.hide();
            // loader.dismiss();
        }, function (err) {
            _this.hide();
            // loader.dismiss();
            // let alert = this.alertCtrl.create({
            //   title: this.trans.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.trans.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
        });
    };
    OrdersPage.prototype.reload = function () {
        this.customerOrders = [];
        this.getOrders(localStorage.getItem("customerid"));
    };
    OrdersPage.prototype.goOrderDetails = function (id) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__view_order_view_order__["a" /* ViewOrderPage */], {
            orderid: id,
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Content */])
    ], OrdersPage.prototype, "content", void 0);
    OrdersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'page-orders',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\orders\orders.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{ \'orders\' | translate}}</ion-title>\n        <ion-buttons (click)="reload()" end>\n                <button ion-button icon-only>\n                    <ion-icon color="light" name="ios-refresh-circle-outline"></ion-icon>\n                </button>\n            </ion-buttons>\n    </ion-navbar>\n\n\n</ion-header>\n\n\n\n<ion-content padding dir="{{oriantation}}">\n    <table>\n        <thead>\n            <tr>\n                <th>{{\'order\' | translate}}</th>\n                <th>{{\'status\' | translate}}</th>\n            </tr>\n        </thead>\n\n\n\n        <tbody>\n\n            <tr *ngFor="let order of customerOrders" (click)="goOrderDetails(order.id)">\n                <td>\n                    <div class="block">\n                        <img [src]="order.vendor_logo" />\n                        <ion-item>\n                            <p>\n                                <span>{{\'orderno\' | translate}}# {{order.id}}</span> |\n                                <span *ngIf="order.order_discount!=0">{{order.order_total_after_discount}} {{order.customer_currency_code}}</span>\n                                <span *ngIf="order.order_discount==0">{{order.order_total}} {{order.customer_currency_code}}</span>\n                            </p>\n                            <p>{{\'from\' | translate}} {{order.vendor_name}}</p>\n                            <p>{{order.branch_name}} <br></p>\n                            <p>{{ order.created_on_utc | date :\'MM/dd/yyyy hh:mm a\'}}</p>\n                            <!-- <p *ngIf="order.service_type_id==2">PickUp</p>\n                            <p *ngIf="order.service_type_id==1">Dlivery</p> -->\n                        </ion-item>\n                    </div>\n                </td>\n                <td *ngIf="order.order_status_id==10">{{\'wait\' | translate}}</td>\n                <td *ngIf="order.order_status_id==70">{{\'acccepted\' | translate}}</td>\n                <td *ngIf="order.order_status_id==20">{{\'processing\' | translate}}</td>\n                <td *ngIf="order.order_status_id==30 || order.order_status_id==50 || order.order_status_id==60 || order.order_status_id==80">{{\'complete\' | translate}}</td>\n                <td *ngIf="order.order_status_id==40">{{\'canceld\' | translate}}</td>\n            </tr>\n\n\n\n\n\n\n            <!-- <tr class="done">\n                <td>\n                    <div class="block">\n                        <img src="./assets/imgs/restaurants_logo/bking.png" />\n                        <ion-item>\n                            <p><span>Order NO# 1597</span>  | <span>125.00 SR</span></p>\n                            <p>From \'Domino\'s Pizza\' in 10/05/2018</p>\n                        </ion-item>\n                    </div>\n                </td>\n                <td>Done</td>\n            </tr>\n            <tr class="done">\n                <td>\n                    <div class="block">\n                        <img src="./assets/imgs/restaurants_logo/bking.png" />\n                        <ion-item>\n                            <p><span>Order NO# 1597</span>  | <span>125.00 SR</span></p>\n                            <p>From \'Domino\'s Pizza\' in 10/05/2018</p>\n                        </ion-item>\n                    </div>\n                </td>\n                <td>Done</td>\n            </tr>         -->\n        </tbody>\n    </table>\n\n    <ion-label class="emptylbl" *ngIf="isEmpty">{{ \'emptyorders\' | translate }}</ion-label>\n    <ion-spinner class="spin" *ngIf="isBusy" name="bubbles"></ion-spinner>\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\orders\orders.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Config */]])
    ], OrdersPage);
    return OrdersPage;
}());

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_update_location_update_location__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_resturant_review_resturant_review__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_pickup_service_pickup_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_maps__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_http_loader__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_home_home__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_main_screen_main_screen__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_intro_screen_intro_screen__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_sign_up_sign_up__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_resturant_info_resturant_info__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ionic2_super_tabs__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_meal_info_meal_info__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_profile_profile__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_account_active_account_active__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_offers_offers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_aboutus_aboutus__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_contact_us_contact_us__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_shopping_cart_shopping_cart__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_order_data_order_data__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_meals_reviews_meals_reviews__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_view_order_view_order__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_firebase__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39_ionic_cache__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_launch_navigator__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_ionic2_rating__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_ionic_image_loader__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_tabs_tabs__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_more_list_more_list__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_ng_lazyload_image__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_local_notifications_ngx__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_native_geocoder__ = __webpack_require__(267);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









































// Import ionic2-rating module







function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_16__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_main_screen_main_screen__["a" /* MainScreenPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_intro_screen_intro_screen__["a" /* IntroScreenPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_account_active_account_active__["a" /* AccountActivePage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_aboutus_aboutus__["a" /* AboutusPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_resturant_info_resturant_info__["a" /* ResturantInfoPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_meal_info_meal_info__["a" /* MealInfoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_more_list_more_list__["a" /* MoreListPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_offers_offers__["a" /* OffersPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_resturant_review_resturant_review__["a" /* ResturantReviewPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_contact_us_contact_us__["a" /* ContactUsPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_shopping_cart_shopping_cart__["a" /* ShoppingCartPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_order_data_order_data__["a" /* OrderDataPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_meals_reviews_meals_reviews__["a" /* MealsReviewsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_view_order_view_order__["a" /* ViewOrderPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_pickup_service_pickup_service__["a" /* PickupServicePage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_update_location_update_location__["a" /* UpdateLocationPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_45_ng_lazyload_image__["a" /* LazyLoadImageModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_25_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_42_ionic_image_loader__["a" /* IonicImageLoader */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_39_ionic_cache__["a" /* CacheModule */].forRoot({ keyPrefix: 'hurrybunny-cache' }),
                __WEBPACK_IMPORTED_MODULE_41_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["k" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/aboutus/aboutus.module#AboutusPageModule', name: 'AboutusPage', segment: 'aboutus', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact-us/contact-us.module#ContactUsPageModule', name: 'ContactUsPage', segment: 'contact-us', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/account-active/account-active.module#AccountActivePageModule', name: 'AccountActivePage', segment: 'account-active', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/intro-screen/intro-screen.module#IntroScreenPageModule', name: 'IntroScreenPage', segment: 'intro-screen', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/main-screen/main-screen.module#MainScreenPageModule', name: 'MainScreenPage', segment: 'main-screen', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/meal-info/meal-info.module#MealInfoPageModule', name: 'MealInfoPage', segment: 'meal-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/meals-reviews/meals-reviews.module#MealsReviewsPageModule', name: 'MealsReviewsPage', segment: 'meals-reviews', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/more-list/more-list.module#MoreListPageModule', name: 'MoreListPage', segment: 'more-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/offers/offers.module#OffersPageModule', name: 'OffersPage', segment: 'offers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/order-data/order-data.module#OrderDataPageModule', name: 'OrderDataPage', segment: 'order-data', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pickup-service/pickup-service.module#PickupServicePageModule', name: 'PickupServicePage', segment: 'pickup-service', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/orders/orders.module#OrdersPageModule', name: 'OrdersPage', segment: 'orders', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/resturant-info/resturant-info.module#ResturantInfoPageModule', name: 'ResturantInfoPage', segment: 'resturant-info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/resturant-review/resturant-review.module#ResturantReviewPageModule', name: 'ResturantReviewPage', segment: 'resturant-review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/shopping-cart/shopping-cart.module#ShoppingCartPageModule', name: 'ShoppingCartPage', segment: 'shopping-cart', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sign-up/sign-up.module#SignUpPageModule', name: 'SignUpPage', segment: 'sign-up', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/update-location/update-location.module#UpdateLocationPageModule', name: 'UpdateLocationPage', segment: 'update-location', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/view-order/view-order.module#ViewOrderPageModule', name: 'ViewOrderPage', segment: 'view-order', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_14__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["i" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_sign_up_sign_up__["a" /* SignUpPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_intro_screen_intro_screen__["a" /* IntroScreenPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_main_screen_main_screen__["a" /* MainScreenPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_resturant_info_resturant_info__["a" /* ResturantInfoPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_meal_info_meal_info__["a" /* MealInfoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_account_active_account_active__["a" /* AccountActivePage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_resturant_review_resturant_review__["a" /* ResturantReviewPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_more_list_more_list__["a" /* MoreListPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_orders_orders__["a" /* OrdersPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_offers_offers__["a" /* OffersPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_aboutus_aboutus__["a" /* AboutusPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_contact_us_contact_us__["a" /* ContactUsPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_shopping_cart_shopping_cart__["a" /* ShoppingCartPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_order_data_order_data__["a" /* OrderDataPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_meals_reviews_meals_reviews__["a" /* MealsReviewsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_view_order_view_order__["a" /* ViewOrderPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_pickup_service_pickup_service__["a" /* PickupServicePage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_update_location_update_location__["a" /* UpdateLocationPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_maps__["b" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_firebase__["a" /* Firebase */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_maps__["a" /* Geocoder */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                { provide: __WEBPACK_IMPORTED_MODULE_7__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["j" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_19__providers_genrator_genrator__["a" /* GenratorProvider */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_local_notifications_ngx__["a" /* LocalNotifications */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_resturant_review_resturant_review__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_intro_screen_intro_screen__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_cache__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications_ngx__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, localNotifications, modelCtrl, genrator, tost, cache, evnts, statusBar, fcm, alertCtrl, splashScreen, translateService, events, menuCtrl, toastCtrl) {
        var _this = this;
        this.platform = platform;
        this.localNotifications = localNotifications;
        this.modelCtrl = modelCtrl;
        this.genrator = genrator;
        this.tost = tost;
        this.evnts = evnts;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.menuCtrl = menuCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_intro_screen_intro_screen__["a" /* IntroScreenPage */];
        this.loggedOut = false;
        this.loggedIn = false;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            cache.setDefaultTTL(1 * 1); //set default cache TTL for 1 hour
            // cache.clearAll();
            // Keep our cached results when device is offline!
            _this.checkLastOrder();
            cache.setOfflineInvalidate(false);
            if (_this.platform.is('cordova')) {
                _this.getToken();
                _this.listenToNotifications();
            }
            _this.listenConnection();
            translateService.setDefaultLang('ar');
            if (localStorage.getItem('lang') == null) {
                localStorage.setItem('lang', "2");
            }
            statusBar.styleDefault();
            splashScreen.hide();
            _this.showedAlert = false;
            // Confirm exit
            _this.platform.registerBackButtonAction(function () {
                if (_this.nav.length() == 1) {
                    if (!_this.showedAlert) {
                        _this.confirmExitApp();
                    }
                    else {
                        _this.showedAlert = false;
                        _this.confirmAlert.dismiss();
                    }
                }
                _this.nav.pop();
            });
        });
    }
    MyApp.prototype.confirmExitApp = function () {
        var _this = this;
        this.showedAlert = true;
        this.confirmAlert = this.alertCtrl.create({
            title: this.translateService.instant('PAGE_TITLE.dilog'),
            message: this.translateService.instant('exitapp'),
            buttons: [
                {
                    text: this.translateService.instant('no'),
                    handler: function () {
                        _this.showedAlert = false;
                        return;
                    }
                },
                {
                    text: this.translateService.instant('yes'),
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }
            ]
        });
        this.confirmAlert.present();
    };
    //Check connectivety
    MyApp.prototype.listenConnection = function () {
        var disconnectedToast = this.tost.create({
            message: this.translateService.instant('checkinternetconect'),
            position: 'top',
            cssClass: 'toaastcss',
            showCloseButton: true,
            closeButtonText: this.translateService.instant('BUTTONS.dissmiss')
        });
        document.addEventListener("online", function () {
            console.log("Internet available");
            disconnectedToast.dismiss();
        }, false);
        document.addEventListener("offline", function () {
            disconnectedToast.present();
            // let alert = this.alertCtrl.create({
            //     title: this.translateService.instant('PAGE_TITLE.dilog'),
            //     subTitle: this.translateService.instant('checkinternetconect'),
            //     buttons: [
            //         {
            //             text: this.translateService.instant('exit'),
            //             handler: () => {
            //                 this.platform.exitApp();
            //             }
            //         }
            //     ]
            // });
            // alert.present();
        }, false);
    };
    MyApp.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('android')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fcm.getToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.platform.is('ios')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fcm.getToken()];
                    case 3:
                        token = _a.sent();
                        return [4 /*yield*/, this.fcm.grantPermission()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (localStorage.getItem('customerid') === null) {
                        }
                        else {
                            this.sendTokenToServer(localStorage.getItem('customerid'), token);
                        }
                        localStorage.setItem("notificationToken", token);
                        //Save token any wahere
                        console.log("TOKEN : " + token);
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp.prototype.listenToNotifications = function () {
        var _this = this;
        //Notifications
        var self = this;
        //Notifications
        this.fcm.subscribe('all');
        this.fcm.onNotificationOpen().subscribe(function (data) {
            if (data.wasTapped) {
                // alert("Received in background");
            }
            else {
                var messageText = void 0;
                if (_this.platform.is('android')) {
                    messageText = data.body;
                }
                if (_this.platform.is('ios')) {
                    messageText = data.aps.alert;
                }
                if (localStorage.getItem('customerid') === null) {
                }
                else {
                    if (messageText.length != 0) {
                        var alert_1 = _this.alertCtrl.create({
                            title: _this.translateService.instant('PAGE_TITLE.dilog'),
                            subTitle: messageText,
                            buttons: [_this.translateService.instant('BUTTONS.dissmiss')]
                        });
                        alert_1.present();
                    }
                    _this.nav.push(__WEBPACK_IMPORTED_MODULE_10__pages_orders_orders__["a" /* OrdersPage */]);
                    _this.sendLocalNotification(messageText, false);
                }
            }
        });
        this.fcm.onTokenRefresh().subscribe(function (token) {
            if (localStorage.getItem('customerid') === null) {
            }
            else {
                _this.sendTokenToServer(localStorage.getItem('customerid'), token);
            }
            localStorage.setItem("notificationToken", token);
        });
        //end notifications.
        //end notifications.
    };
    //Send Local Notification
    MyApp.prototype.sendLocalNotification = function (msg, isAndroid) {
        // Schedule a single notification
        this.localNotifications.schedule({
            title: "SEFERY",
            text: msg + ""
        });
    };
    MyApp.prototype.sendTokenToServer = function (customerid, token) {
        this.genrator.sendNotificationToken(customerid, token).then(function (data) {
            console.log("TOKEN SENT : " + JSON.stringify(data));
        }, function (err) {
            console.log("TOKEN SEND ERROR " + JSON.stringify(err));
        });
    };
    MyApp.prototype.checkLastOrder = function () {
        var _this = this;
        if (localStorage.getItem("customerid") != null) {
            if (localStorage.getItem("rated") != null) {
                return this.genrator.getCustomerOrderNoCashing(localStorage.getItem("customerid"), localStorage.getItem('lang')).subscribe(function (data) {
                    var customerOrders = [];
                    customerOrders = data['orders'];
                    if (customerOrders.length != 0) {
                        var order = customerOrders[0];
                        console.log(order);
                        if (order.order_status_id == "60") {
                            var modal = _this.modelCtrl.create(__WEBPACK_IMPORTED_MODULE_1__pages_resturant_review_resturant_review__["a" /* ResturantReviewPage */], { "order": JSON.stringify(order) }, { showBackdrop: true, enableBackdropDismiss: true });
                            modal.present();
                        }
                        else if (order.order_status_id == "80") {
                            var modal = _this.modelCtrl.create(__WEBPACK_IMPORTED_MODULE_1__pages_resturant_review_resturant_review__["a" /* ResturantReviewPage */], { "order": JSON.stringify(order) }, { showBackdrop: true, enableBackdropDismiss: true });
                            modal.present();
                        }
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_9" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\app\app.html"*/'\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["s" /* Platform */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications_ngx__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_9_ionic_cache__["b" /* CacheService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["v" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__offers_offers__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_screen_intro_screen__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_maps__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__tabs_tabs__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_location_accuracy__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__update_location_update_location__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__profile_profile__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_geocoder__ = __webpack_require__(267);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, nativeGeocoder, app, events, toastCtrl, modelCtrl, navParams, diagnostic, genrator, splashScreen, geo, googleMaps, altCtrl, menu, translate, viewCtrl, config, alertCrtl, platform, locationAccuracy) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.nativeGeocoder = nativeGeocoder;
        this.app = app;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.modelCtrl = modelCtrl;
        this.navParams = navParams;
        this.diagnostic = diagnostic;
        this.genrator = genrator;
        this.splashScreen = splashScreen;
        this.geo = geo;
        this.googleMaps = googleMaps;
        this.altCtrl = altCtrl;
        this.menu = menu;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.alertCrtl = alertCrtl;
        this.locationAccuracy = locationAccuracy;
        this.locationName = "";
        this.locationId = "0";
        this.customerLocations = [];
        this.selectedLocationForUser = "";
        this.isNoLocations = true;
        this.markers = [];
        this.notes = "";
        this.flag = "";
        this.selected = true;
        this.loggedIn = false;
        this.isBusy = true;
        this.shoLocationError = false;
        this.currentLocation = "";
        this.geoAddress = "";
        //Geocoder configuration
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.flag = this.navParams.get('flag');
        if (localStorage.getItem('lang') == "en") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        if (localStorage.getItem("customerid")) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
        events.subscribe('location:locationUpdated', function (recivedLocation, time) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            _this.getCustomerLastLocations();
            _this.goAndStoreLocation(recivedLocation);
            // let locat = JSON.parse(location+"") ;
            // let elemnt = JSON.parse(recivedLocation.location+"");
            // console.log("Event Listener : "+elemnt);
        });
        // Wait the native plugin is ready.
        platform.ready().then(function () {
            _this.loadMap();
            diagnostic.isLocationEnabled().then(function (status) {
                if (!status) {
                    // this.loadOfflineMap();
                    // this.enableLocation();
                    _this.shoLocationError = true;
                }
                else {
                    _this.loadMap();
                }
            }, function (err) {
                console.log(err);
                // this.loadOfflineMap();
                _this.shoLocationError = true;
            });
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.loadMap();
    };
    //Show resturants while not logged in
    HomePage.prototype.notLoggedInShowResurants = function () {
        var _this = this;
        var locationdata = {
            location: {
                id: 0,
                customer_id: "",
                location_name: "",
                latitude: this.selectedLat,
                longtitude: this.selectedLng,
                location_note: ""
            }
        };
        localStorage.setItem('locationId', JSON.stringify(locationdata));
        console.log("notloggedIn : " + localStorage.getItem('locationId'));
        if (this.flag == "main") {
            this.events.publish('user:locationchangedaction');
            this.navCtrl.pop();
        }
        else if (this.flag == "intro") {
            this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]).then(function () {
                // first we find the index of the current view controller:
                var index = _this.viewCtrl.index;
                _this.events.publish('user:locationchangedaction');
                // then we remove it from the navigation stack
                _this.navCtrl.remove(index);
            });
        }
    };
    // ngOnInit() {
    //   this.loadMap();
    // }
    HomePage.prototype.ionViewDidLeave = function () {
        this.menu.enable(true);
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.menu.enable(false);
        this.loadMap();
    };
    HomePage.prototype.chekSelected = function () {
        if ((this.selectedLat == null && this.selectedLng == null)) {
            this.selected = true;
        }
        else {
            this.selected = false;
        }
    };
    HomePage.prototype.enableLocation = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    _this.loadMap();
                    _this.splashScreen.show();
                    location.reload();
                }, function (error) { return alert('Error requesting location permissions' + JSON.stringify(error)); });
            }
        });
    };
    HomePage.prototype.loadMap = function () {
        var _this = this;
        this.geo.getCurrentPosition({ enableHighAccuracy: true }).then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lng = resp.coords.longitude;
            _this.selectedLat = resp.coords.latitude;
            _this.selectedLng = resp.coords.longitude;
            //Get Geo 
            _this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
            localStorage.setItem("userLat", resp.coords.latitude + "");
            localStorage.setItem("userLng", resp.coords.longitude + "");
            _this.chekSelected();
            _this.getCustomerLastLocations();
            _this.locationName = "";
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 18,
                disableDefaultUI: true, zoomControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var marker = new google.maps.Marker({
                map: _this.map,
                animation: google.maps.Animation.DROP,
                position: {
                    lat: _this.lat,
                    lng: _this.lng
                }, icon: "./assets/imgs/marker.png",
                draggable: false
            });
            _this.locationId = "0";
            _this.map.addListener('center_changed', function () {
                marker.setPosition(_this.map.getCenter());
                _this.selectedLat = marker.position.lat() + "";
                _this.selectedLng = marker.position.lng() + "";
                console.log(_this.selectedLat);
                console.log(_this.selectedLng);
                //Get Geo 
                _this.getGeoencoder(marker.position.lat(), marker.position.lng());
                // this.presentPrompt();
                //if location not detected
                if (_this.lat == 0 && _this.lng == 0) {
                    _this.shoLocationError = true;
                    // this.loadOfflineMap();
                }
            });
            _this.shoLocationError = false;
        }).catch(function (error) {
            // this.loadOfflineMap();
            _this.shoLocationError = true;
        });
    };
    HomePage.prototype.gomainsc = function () {
        var _this = this;
        if (this.locationName == "") {
            this.presentPrompt();
        }
        else {
            if (this.locationId == "0") {
                var locationdata = {
                    location: {
                        id: this.locationId,
                        customer_id: localStorage.getItem("customerid"),
                        location_name: this.locationName,
                        latitude: this.selectedLat,
                        longtitude: this.selectedLng,
                        location_note: this.notes
                    }
                };
                if (localStorage.getItem("customerid") != null) {
                    this.genrator.addNewLocation(locationdata).then(function (result) {
                        // console.log(result);
                        var locations = result['locations'];
                        var location = locations[0];
                        _this.locationId = location.id + "";
                        localStorage.setItem('locationId', JSON.stringify(location));
                        console.log("Add Response : " + localStorage.getItem('locationId'));
                        //Save location id to local storage 
                    }, function (err) {
                        console.log(err);
                    });
                }
                else {
                    localStorage.setItem('locationId', JSON.stringify(locationdata));
                    console.log("notloggedIn : " + localStorage.getItem('locationId'));
                }
            }
            console.log(localStorage.getItem('locationId'));
            if (this.flag == "main") {
                this.events.publish('user:locationchangedaction');
                this.navCtrl.pop();
            }
            else if (this.flag == "intro") {
                this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]).then(function () {
                    // first we find the index of the current view controller:
                    var index = _this.viewCtrl.index;
                    _this.events.publish('user:locationchangedaction');
                    // then we remove it from the navigation stack
                    _this.navCtrl.remove(index);
                });
            }
        }
    };
    HomePage.prototype.getCustomerLastLocations = function () {
        var _this = this;
        if (localStorage.getItem("customerid") != null) {
            this.genrator.getCustomerLocations(localStorage.getItem("customerid")).then(function (data) {
                if (data['locations'] != null) {
                    _this.isBusy = false;
                    _this.customerLocations = [];
                    _this.customerLocations = data['locations'];
                    // this.customerLocations = this.customerLocations.filter(function(item, index){
                    //   return this.customerLocations.indexOf(item) >= index;
                    // });
                    if (_this.customerLocations.length == 0) {
                        _this.isNoLocations = true;
                    }
                    else {
                        _this.isNoLocations = false;
                        _this.checkCustomerLocation();
                    }
                    console.log(_this.customerLocations);
                }
            }, function (err) {
                // let alert = this.alertCrtl.create({
                //   title: this.translate.instant('PAGE_TITLE.dilog'),
                //   subTitle: err,
                //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
                // });
                // alert.present();
                console.log(err);
            });
        }
    };
    //Add new Location
    HomePage.prototype.addNewLocation = function () {
        this.presentPrompt();
    };
    //Store New Location
    HomePage.prototype.storeNewLocation = function (name, note) {
        var _this = this;
        if (localStorage.getItem("customerid") != null) {
            var locationdata = {
                location: {
                    id: 0,
                    customer_id: localStorage.getItem("customerid"),
                    location_name: this.locationName,
                    latitude: this.selectedLat,
                    longtitude: this.selectedLng,
                    location_note: this.notes
                }
            };
            this.genrator.addNewLocation(locationdata).then(function (result) {
                // console.log(result);
                var locations = result['locations'];
                var location = locations[0];
                _this.locationId = location.id + "";
                var newLocation = {
                    location: {
                        id: location.id + "",
                        customer_id: location.customer_id + "",
                        latitude: location.latitude + "",
                        longtitude: location.longtitude + "",
                        location_name: location.location_name + "",
                        location_note: location.location_note + ""
                    }
                };
                localStorage.setItem('locationId', JSON.stringify(newLocation));
                console.log(localStorage.getItem('locationId'));
                if (_this.flag == "main") {
                    _this.events.publish('user:locationchangedaction');
                    _this.navCtrl.pop();
                }
                else if (_this.flag == "intro") {
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]).then(function () {
                        // first we find the index of the current view controller:
                        var index = _this.viewCtrl.index;
                        _this.events.publish('user:locationchangedaction');
                        // then we remove it from the navigation stack
                        _this.navCtrl.remove(index);
                    });
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    //Select currnt location and go Main if user logged in
    HomePage.prototype.selectCurrentLocation = function (location) {
        var _this = this;
        console.log(name);
        console.log(location.Latitude);
        console.log(location.Longtitude);
        this.locationName = location.LocationName + "";
        this.selectedLat = location.Latitude + "";
        this.selectedLng = location.Longtitude + "";
        this.locationId = location.Id + "";
        var locationData = {
            location: {
                id: location.Id + "",
                customer_id: location.CustomerId + "",
                latitude: location.Latitude + "",
                longtitude: location.Longtitude + "",
                location_name: location.LocationName + "",
                location_note: location.LocationNote + ""
            }
        };
        localStorage.setItem('locationId', JSON.stringify(locationData));
        console.log(localStorage.getItem('locationId'));
        if (this.flag == "main") {
            this.events.publish('user:locationchangedaction');
            this.navCtrl.pop();
        }
        else if (this.flag == "intro") {
            this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__tabs_tabs__["a" /* TabsPage */]).then(function () {
                // first we find the index of the current view controller:
                var index = _this.viewCtrl.index;
                _this.events.publish('user:locationchangedaction');
                // then we remove it from the navigation stack
                _this.navCtrl.remove(index);
            });
        }
    };
    HomePage.prototype.goAndStoreLocation = function (location) {
        //console.log("Recived from LOC "+location.Latitude + "")
        console.log(name);
        console.log(location.Latitude);
        console.log(location.Longtitude);
        this.locationName = location.LocationName + "";
        this.selectedLat = location.Latitude + "";
        this.selectedLng = location.Longtitude + "";
        this.locationId = location.Id + "";
        var locationData = {
            location: {
                id: location.Id + "",
                customer_id: location.CustomerId + "",
                latitude: location.Latitude + "",
                longtitude: location.Longtitude + "",
                location_name: location.LocationName + "",
                location_note: location.LocationNote + ""
            }
        };
        localStorage.setItem('locationId', JSON.stringify(locationData));
        console.log(localStorage.getItem('locationId'));
        this.chekSelected();
        var latLng = new google.maps.LatLng(location.Latitude, location.Longtitude);
        var mapOptions = {
            center: latLng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: parseFloat(location.Latitude),
                lng: parseFloat(location.Longtitude)
            }, icon: "./assets/imgs/marker.png",
            draggable: false
        });
    };
    HomePage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCrtl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            inputs: [
                {
                    name: 'locationName',
                    placeholder: this.translate.instant('locationname')
                },
                {
                    name: 'locationNote',
                    placeholder: this.translate.instant('notes')
                }
            ],
            buttons: [
                {
                    text: this.translate.instant('save'),
                    handler: function (data) {
                        _this.locationName = data.locationName + "";
                        _this.notes = data.locationNote + "";
                        _this.storeNewLocation(_this.locationName, _this.notes);
                        _this.chekSelected();
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.getDistancebetweenLocations = function (lat1, lon1, lat2, lon2) {
        var myLatLng1 = { lat: lat1, lng: lon1 };
        var myLatLng2 = { lat: lat2, lng: lon2 };
        var loc1 = new google.maps.LatLng(lat1, lon1);
        var loc2 = new google.maps.LatLng(lat2, lon2);
        var dist = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2);
        return parseInt(dist + "");
        // var R = 6371; // Radius of the earth in km
        // var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        // var dLon = this.deg2rad(lon2 - lon1);
        // var a =
        //   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        //   Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        //   Math.sin(dLon / 2) * Math.sin(dLon / 2)
        //   ;
        // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        // var d = R * c; // Distance in km
        // return d * 1000;
    };
    HomePage.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    HomePage.prototype.checkCustomerLocation = function () {
        var _this = this;
        this.customerLocations.forEach(function (element) {
            console.log(element);
            console.log(_this.getDistancebetweenLocations(_this.lat, _this.lng, element.Latitude, element.Longtitude));
            if (_this.getDistancebetweenLocations(_this.lat, _this.lng, element.Latitude, element.Longtitude) < 300) {
                _this.goAndStoreLocation(element);
                _this.selectedLocationForUser = element.LocationName + "";
                console.log("Location Is  : " + element.LocationName);
                _this.currentLocation = element;
                return;
            }
        });
    };
    HomePage.prototype.deleteLocation = function (id) {
        var _this = this;
        //Both Option
        var alert = this.alertCrtl.create({
            title: this.translate.instant('PAGE_TITLE.dilog'),
            subTitle: this.translate.instant('areyousure'),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: this.translate.instant('yes'),
                    handler: function () {
                        _this.genrator.deleteLcation(id + "").then(function (data) {
                            _this.getCustomerLastLocations();
                            _this.locationId = "0";
                        }, function (err) {
                            var alert = _this.alertCrtl.create({
                                title: _this.translate.instant('PAGE_TITLE.dilog'),
                                subTitle: err,
                                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                            });
                            alert.present();
                            console.log(err);
                        });
                    }
                },
                {
                    text: this.translate.instant('no'),
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.updateCustomerLocation = function (location) {
        localStorage.setItem('locationforupdate', JSON.stringify(location));
        var modal = this.modelCtrl.create(__WEBPACK_IMPORTED_MODULE_14__update_location_update_location__["a" /* UpdateLocationPage */], {}, { showBackdrop: true, enableBackdropDismiss: true });
        modal.present();
    };
    HomePage.prototype.goToMyOrders = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__orders_orders__["a" /* OrdersPage */]);
    };
    HomePage.prototype.goToMyProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_15__profile_profile__["a" /* ProfilePage */]);
    };
    HomePage.prototype.goToOffers = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__offers_offers__["a" /* OffersPage */]);
    };
    HomePage.prototype.signOut = function () {
        localStorage.removeItem('customerid');
        localStorage.removeItem('customerdata');
        localStorage.setItem('cartCount', "0");
        localStorage.removeItem("customerLocation");
        localStorage.removeItem("lastresturant");
        // this.navCtrl.setRoot();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__intro_screen_intro_screen__["a" /* IntroScreenPage */]);
    };
    HomePage.prototype.signIn = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.loadOfflineMap = function () {
        var _this = this;
        this.lat = 23.8859;
        this.lng = 45.0792;
        this.selectedLat = this.lat;
        this.selectedLng = this.lng;
        localStorage.setItem("userLat", this.lat + "");
        localStorage.setItem("userLng", this.lng + "");
        this.chekSelected();
        this.locationName = "";
        var latLng = new google.maps.LatLng(this.lat, this.lng);
        var mapOptions = {
            center: latLng,
            zoom: 18,
            disableDefaultUI: true, zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: {
                lat: this.lat,
                lng: this.lng
            }, icon: "./assets/imgs/marker.png",
            draggable: false
        });
        this.locationId = "0";
        this.map.addListener('center_changed', function () {
            marker.setPosition(_this.map.getCenter());
            _this.selectedLat = marker.position.lat() + "";
            _this.selectedLng = marker.position.lng() + "";
            console.log(_this.selectedLat);
            console.log(_this.selectedLng);
        });
    };
    HomePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    //geocoder method to fetch address from coordinates passed as arguments
    HomePage.prototype.getGeoencoder = function (latitude, longitude) {
        var _this = this;
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
            .then(function (result) {
            _this.geoAddress = _this.generateAddress(result[0]);
        })
            .catch(function (error) {
            console.log('Error getting location' + JSON.stringify(error));
        });
    };
    //Return Comma saperated address
    HomePage.prototype.generateAddress = function (addressObj) {
        var obj = [];
        var address = "";
        for (var key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (var val in obj) {
            if (obj[val].length)
                address += obj[val] + ', ';
        }
        return address.slice(0, -2);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["_9" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_core__["u" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary" hideBackButton="true">\n    <ion-title class="titlestyle">\n      {{ \'PAGE_TITLE.dilog\' | translate }}\n    </ion-title>\n    <!--   \n        <button class="locationButton"  ion-button icon-only (click)="loadMap()" >\n          <ion-icon name=\'ios-locate-outline\' ></ion-icon>\n        </button> -->\n\n\n    <!--Search Bar button-->\n    <ion-buttons (click)="getCustomerLastLocations()" left>\n      <button ion-button icon-only>\n        <ion-icon color="light" name="ios-navigate-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n\n<ion-content>\n\n  <ion-item *ngIf="loggedIn" no-lines class="current-loc" (click)="selectCurrentLocation(currentLocation)">\n    <ion-icon color="light" name="ios-home" item-left></ion-icon>\n    <h1>{{currentLocation.LocationName}}</h1>\n  </ion-item>\n  <ion-item *ngIf="!loggedIn" no-lines class="current-loc" (click)="selectCurrentLocation(currentLocation)">\n    <ion-icon color="light" name="ios-home" item-left></ion-icon>\n    <h1>{{geoAddress}}</h1>\n  </ion-item>\n\n  <ion-item *ngIf="locationNameIsShowing">\n    <ion-input [(ngModel)]="locationNameInput" placeholder="Clear Input" clearInput></ion-input>\n  </ion-item>\n\n  <div #map id="map" >\n    <h1 *ngIf="shoLocationError" class="nolocation">{{\'locationalert\' | translate}}</h1>\n  </div>\n\n\n</ion-content>\n\n\n\n\n<ion-footer>\n\n\n  <ion-fab top right edge class="fablist">\n    <button color="softDark" ion-fab mini icon-only>\n      <ion-icon class="ic" name="md-more"></ion-icon>\n    </button>\n    <!-- <button  ><ion-icon name="add"></ion-icon></button> -->\n    <ion-fab-list side="top">\n      <button *ngIf="loggedIn" color="softDark" ion-fab (click)="signOut()">\n        <ion-icon class="ic" name="md-log-out"></ion-icon>\n      </button>\n      <button *ngIf="loggedIn" color="softDark" ion-fab (click)="goToMyProfile()">\n        <ion-icon class="ic" name="ios-contact"></ion-icon>\n      </button>\n      <button *ngIf="loggedIn" color="softDark" ion-fab (click)="goToMyOrders()">\n        <ion-icon class="ic" name="md-paper"></ion-icon>\n      </button>\n      <button *ngIf="!loggedIn" color="softDark" ion-fab (click)="signIn()">\n        <ion-icon class="ic" name="md-log-in"></ion-icon>\n      </button>\n      <button color="softDark" ion-fab (click)="goToOffers()">\n        <ion-icon class="ic" name="md-megaphone"></ion-icon>\n      </button>\n\n\n      <!-- <button color="softDark" ion-fab><ion-icon class="ic" name="logo-googleplus"></ion-icon></button> -->\n    </ion-fab-list>\n  </ion-fab>\n  <button  *ngIf="!loggedIn" class="butn" padding ion-button color="primary" round block (click)="notLoggedInShowResurants()"\n        [disabled]="selected">{{\'go\' | translate}}</button>\n\n  <!--New Button for Location-->\n  <div class="tab" *ngIf="loggedIn">\n    <input type="radio" id="rd1" name="rd">\n    <!--main tap/btn-->\n    <label class="tab-label" for="rd1">\n      <p>{{\'lastplaces\' | translate}}</p>\n    </label>\n    <div class="tab-content">\n      <!--close btn-->\n      <div class="tab">\n        <input type="radio" id="rd3" name="rd">\n        <label for="rd3" class="tab-close">&times;</label>\n      </div>\n      <!--content list-->\n      <button padding ion-button color="primary" round block (click)="addNewLocation()">\n        {{\'addnewLocation\' | translate}}\n      </button>\n      <div class="locations-list">\n        <ion-list>\n          <ion-item-sliding class="item"  *ngFor="let location of customerLocations">\n            <ion-item no-lines (click)="selectCurrentLocation(location)">\n              <ion-icon class="ico" name="ios-home" item-left></ion-icon>\n            <h2 class="txt">{{location.LocationName}}</h2>\n            </ion-item >\n            <ion-item-options  side="end">\n              <button class="btn" ion-button color="secondary" (click)="updateCustomerLocation(location)"><ion-icon name="md-create"></ion-icon></button>\n              <button class="btn" ion-button color="danger" (click)="deleteLocation(location.Id)"><ion-icon name="trash"></ion-icon></button>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ion-list>\n      </div>\n    </div>\n  </div>\n\n</ion-footer>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* ModalController */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_native_geocoder__["a" /* NativeGeocoder */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_4__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_maps__["b" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* MenuController */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["w" /* ViewController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["s" /* Platform */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_location_accuracy__["a" /* LocationAccuracy */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_screen_main_screen__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__more_list_more_list__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__offers_offers__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.oriantation = "";
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__main_screen_main_screen__["a" /* MainScreenPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__orders_orders__["a" /* OrdersPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__more_list_more_list__["a" /* MoreListPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__offers_offers__["a" /* OffersPage */];
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
    }
    TabsPage.prototype.checkLogin = function () {
        if (localStorage.getItem('customerid') === null) {
            return false;
        }
        else {
            return true;
        }
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\tabs\tabs.html"*/'<ion-tabs   selectedIndex="4" dir="{{oriantation}}">\n  <ion-tab [root]="tab1Root"  tabIcon="resturantsico" tabTitle = "{{ \'resturants\' | translate}}" ></ion-tab>\n  <ion-tab [root]="tab2Root"  tabIcon="ordersico" tabTitle ="{{ \'orders\' | translate}}" [enabled]="checkLogin()"  ></ion-tab>\n  <ion-tab [root]="tab4Root"  tabIcon="offersico" tabTitle="{{ \'offers\' | translate}}" ></ion-tab>\n  <ion-tab [root]="tab3Root"  tabIcon="moreico" tabTitle="{{ \'more\' | translate}}" ></ion-tab>\n</ion-tabs>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resturant_info_resturant_info__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OffersPage = /** @class */ (function () {
    function OffersPage(navCtrl, navParams, trans, app, config, genrator, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.trans = trans;
        this.app = app;
        this.config = config;
        this.genrator = genrator;
        this.alertCtrl = alertCtrl;
        this.offers = [];
        config.set('ios', 'backButtonText', this.trans.instant('BUTTONS.back'));
        this.getOffers();
    }
    OffersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OffersPage');
    };
    OffersPage.prototype.getOffers = function () {
        var _this = this;
        return this.genrator.getOffers().subscribe(function (data) {
            _this.offers = data['Advertisements'];
            console.log(_this.offers);
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: _this.trans.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.trans.instant('BUTTONS.dissmiss')]
            });
            alert.present();
        });
    };
    OffersPage.prototype.goResturantInfoFromAd = function (id) {
        var _this = this;
        this.genrator.getResturantInfoForAds(id, localStorage.getItem('lang')).subscribe(function (data) {
            var vendors = data['vendors'];
            var resturantInfo = vendors[0];
            switch (resturantInfo.Settings.ServiceTypeId) {
                case 1:
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_0__resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
                        resid: id,
                        branchId: null,
                        serviceType: "1"
                    });
                    break;
                case 2:
                    var branches = [];
                    branches = resturantInfo['Branches'];
                    var branch = branches[0];
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_0__resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
                        resid: id,
                        branchId: branch.id,
                        distace: _this.getDistance(branch.latitude, branch.longtitude),
                        serviceType: "2"
                    });
                    break;
                case 3:
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_0__resturant_info_resturant_info__["a" /* ResturantInfoPage */], {
                        resid: id,
                        branchId: null,
                        serviceType: "1"
                    });
                    break;
            }
        }, function (err) {
            console.log(err);
        });
    };
    OffersPage.prototype.getDistance = function (lat, lng) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(parseFloat(localStorage.getItem("userLat")) - lat); // deg2rad below
        var dLon = this.deg2rad(parseFloat(localStorage.getItem("userLng")) - lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat)) * Math.cos(this.deg2rad(parseFloat(localStorage.getItem("userLat")))) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Number(d).toFixed(2);
    };
    OffersPage.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    OffersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
            selector: 'page-offers',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\offers\offers.html"*/'\n<ion-header>\n\n    <ion-navbar>\n      <ion-title>{{ \'offers\' | translate}}</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n      <ion-item-group>\n          <ion-item *ngFor="let offer of offers" (click)="goResturantInfoFromAd(offer.vendor_id)">\n              <img [src]="offer.image.src" />\n          </ion-item>\n      </ion-item-group>\n  \n  </ion-content>\n  '/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\offers\offers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_1__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
    ], OffersPage);
    return OffersPage;
}());

//# sourceMappingURL=offers.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_active_account_active__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignUpPage = /** @class */ (function () {
    function SignUpPage(navCtrl, navParams, genrator, loader, translate, alertCtrl, events, app, viewCtrl, _FB, config) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.genrator = genrator;
        this.loader = loader;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.app = app;
        this.viewCtrl = viewCtrl;
        this._FB = _FB;
        this.oriantation = "";
        this.countriesList = [];
        this.citiesList = [];
        this.districtsList = [];
        this.countryCode = "";
        this.City = "";
        this.district = "";
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.form = _FB.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            countryCode: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            phone: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(11), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(9)])]
        });
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    SignUpPage.prototype.SaveChanges = function (val) {
        var _this = this;
        console.log(val);
        console.log(val.countryCode + val.phone);
        // Virify phone and go to activation page
        var loader = this.loader.create({
            content: this.translate.instant('LOADING'),
        });
        loader.present();
        this.genrator.VerifyPhon(val.countryCode, val.phone).subscribe(function (data) {
            console.log(data);
            if (data.VerificationCode !== "") {
                loader.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__account_active_account_active__["a" /* AccountActivePage */], {
                    fname: val.firstName,
                    lname: val.lastname,
                    phone: val.phone,
                });
            }
            else {
                loader.dismiss();
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: data.ErrorMessage,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_1.present();
            }
        });
    };
    SignUpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-sign-up',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\sign-up\sign-up.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n        <ion-title>{{\'PAGE_TITLE.signup\' | translate}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content dir="{{oriantation}}">\n\n    <!--<h5 class="title">{{\'SIgNUP.creat\' | translate}}</h5>-->\n    <div class="pageLogo">\n        <img src="./assets/imgs/login-logo.png" />\n    </div>\n\n    <form [formGroup]="form" (ngSubmit)="SaveChanges(form.value)">\n        <ion-list no-line>\n\n            <ion-item class="colr">\n                <ion-label floating>{{\'SIgNUP.fname\' | translate}}</ion-label>\n                <ion-input formControlName="firstName" type="text"></ion-input>\n            </ion-item>\n            <span class="warning" *ngIf="form.controls[\'firstName\'].hasError(\'required\') && form.controls[\'firstName\'].touched">\n                <span [hidden]="!form.controls[\'firstName\'].errors.required">\n                    <ion-label style="color: red; margin-left: 16px;"> * </ion-label>\n                </span>\n            </span>\n\n            <ion-item class="colr">\n                <ion-label floating>{{\'SIgNUP.lname\' | translate}}</ion-label>\n                <ion-input formControlName="lastname" type="text"></ion-input>\n            </ion-item>\n            <span class="warning" *ngIf="form.controls[\'lastname\'].hasError(\'required\') && form.controls[\'lastname\'].touched">\n                <span [hidden]="!form.controls[\'lastname\'].errors.required">\n                    <ion-label style="color: red; margin-left: 16px;"> * </ion-label>\n                </span>\n            </span>\n\n\n\n            <ion-item class="colr">\n                <ion-label floating>{{ \'COUNTRY\' | translate }}</ion-label>\n                <ion-select formControlName="countryCode" interface="popover" [(ngModel)]="cntryCode">\n                    <ion-option data-countryCode="SA" value="966">{{\'Ksa\' | translate}}</ion-option>\n                    <ion-option data-countryCode="EG" value="20">{{\'EG\' | translate}}</ion-option>\n                    <ion-option data-countryCode="US" value="1">{{\'US\' | translate}}</ion-option>\n                    <ion-option data-countryCode="BH" value="973">{{\'bh\' | translate}}</ion-option>\n                    <ion-option data-countryCode="CA" value="1">{{\'CA\' | translate}}</ion-option>\n                    <ion-option data-countryCode="CN" value="86">{{\'CN\' | translate}}</ion-option>\n                    <ion-option data-countryCode="FR" value="33">{{\'FR\' | translate}}</ion-option>\n                    <ion-option data-countryCode="IN" value="91">{{\'IN\' | translate}}</ion-option>\n                    <ion-option data-countryCode="IQ" value="964">{{\'IQ\' | translate}}</ion-option>\n                    <ion-option data-countryCode="IT" value="39">{{\'IT\' | translate}}</ion-option>\n                    <ion-option data-countryCode="LY" value="218">{{\'LY\' | translate}}</ion-option>\n                    <ion-option data-countryCode="MA" value="212">{{\'MA\' | translate}}</ion-option>\n                    <ion-option data-countryCode="QA" value="974">{{\'QA\' | translate}}</ion-option>\n\n                </ion-select>\n            </ion-item>\n\n\n\n            <ion-item class="colr">\n                <ion-label floating>{{\'SIgNUP.phone\' | translate}}</ion-label>\n                <ion-input formControlName="phone" type="text"></ion-input>\n            </ion-item>\n            <span class="warning" *ngIf="form.controls[\'phone\'].hasError(\'required\') && form.controls[\'phone\'].touched">\n                <span [hidden]="!form.controls[\'phone\'].errors.required">\n                    <ion-label style="color: red; margin-left: 16px;"> * </ion-label>\n                </span>\n            </span>\n\n\n        </ion-list>\n\n        <div class="btn">\n            <button ion-button round color="primary" [disabled]="!form.valid">\n                <span class="fontColor">{{\'SIgNUP.cont\' | translate}}</span>\n            </button>\n        </div>\n\n    </form>\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\sign-up\sign-up.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_genrator_genrator__["a" /* GenratorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */]])
    ], SignUpPage);
    return SignUpPage;
}());

//# sourceMappingURL=sign-up.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingCartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__orders_orders__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_tabs__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_genrator_genrator__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ShoppingCartPage = /** @class */ (function () {
    function ShoppingCartPage(navCtrl, navParams, _FB, genrator, loader, alertCtrl, config, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._FB = _FB;
        this.genrator = genrator;
        this.loader = loader;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.oriantation = "";
        this.cartItemsList = [];
        this.cartItemsIdsList = [];
        this.discountCopuns = [];
        this.deliveryees = 0;
        this.resturantName = "";
        this.resLable = "";
        this.resImage = "";
        this.resDescription = "";
        this.serviceTypeId = "";
        this.menumumCharge = 0;
        this.resturantId = "";
        this.orderNotes = "";
        this.discountcouponclicked = false;
        this.total = 0;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        config.set('ios', 'backButtonText', this.translate.instant('BUTTONS.back'));
        this.customerLocationName = JSON.parse(localStorage.getItem('locationId'));
        if (localStorage.getItem('lang') == "1") {
            this.oriantation = "ltr";
        }
        else {
            this.oriantation = "rtl";
        }
        this.discountcopun = _FB.group({
            code: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(20), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
        });
        this.getCartItems();
        //  this.deliveryees = parseFloat(localStorage.getItem("deliveryFees"));
        this.resturantName = localStorage.getItem("resName");
        this.resLable = navParams.get("resName");
        this.resImage = navParams.get("resImage");
        this.resDescription = navParams.get("resdescription");
        this.menumumCharge = navParams.get("menumunCharge");
        this.serviceTypeId = navParams.get('resServiceTypeId');
        this.resturantId = navParams.get('resturantId');
    }
    ShoppingCartPage.prototype.dicountbuttonclick = function () {
        this.discountcouponclicked = !this.discountcouponclicked;
    };
    ShoppingCartPage.prototype.showLoading = function () {
        if (!this.loading) {
            this.loading = this.loader.create({
                content: this.translate.instant('LOADING')
            });
            this.loading.present();
        }
    };
    ShoppingCartPage.prototype.dismissLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    ShoppingCartPage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = 'none';
    };
    ShoppingCartPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    //Check Delivery method
    ShoppingCartPage.prototype.loadOrderData = function () {
        var _this = this;
        if (this.serviceTypeId == "1") {
            //Devlivery Option
            //Check menumumCharge value
            if (this.total >= this.menumumCharge) {
                var confirmationData = {
                    "order_info": {
                        "order_id": "0",
                        "customer_id": localStorage.getItem("customerid"),
                        "vendor_id": this.resturantId,
                        "branch_id": null,
                        "order_note": this.orderNotes,
                        "service_type_id": this.serviceTypeId,
                        "location_id": this.customerLocationName.location.id
                    }
                };
                console.log(confirmationData);
                this.showLoading();
                return this.genrator.convertCartOrders(confirmationData).then(function (data) {
                    _this.conversionResponse = data['orders'];
                    if (data['orders'] != null) {
                        var resData = {
                            id: _this.resturantId,
                            name: _this.resLable,
                            img: _this.resImage,
                        };
                        //Send Discount Code
                        var orders = data['orders'];
                        var order = orders['0'];
                        console.log(order);
                        _this.sendDiscontCode(order.id);
                        localStorage.setItem("rated", "0");
                        console.log(localStorage.getItem("rated"));
                        localStorage.removeItem("resId");
                        localStorage.removeItem("branchId");
                        var alert_1 = _this.alertCtrl.create({
                            title: _this.translate.instant('PAGE_TITLE.dilog'),
                            subTitle: _this.translate.instant('orderplaced'),
                            buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                        });
                        alert_1.present();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a" /* TabsPage */]);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__orders_orders__["a" /* OrdersPage */]);
                    }
                    var errorMessage = data;
                    if (errorMessage.message != null) {
                        _this.dismissLoading();
                        var alert_2 = _this.alertCtrl.create({
                            title: _this.translate.instant('PAGE_TITLE.dilog'),
                            subTitle: errorMessage.message,
                            buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                        });
                        alert_2.present();
                    }
                    _this.dismissLoading();
                }, function (err) {
                    _this.dismissLoading();
                    var alert = _this.alertCtrl.create({
                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: err,
                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert.present();
                    console.log(err);
                });
            }
            else {
                var alert_3 = this.alertCtrl.create({
                    title: this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: this.translate.instant('menumum') + this.menumumCharge,
                    buttons: [this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_3.present();
            }
        }
        else if (this.serviceTypeId == "2") {
            //Pickup Option
            var confirmationData = {
                "order_info": {
                    "order_id": "0",
                    "customer_id": localStorage.getItem("customerid"),
                    "vendor_id": this.resturantId,
                    "branch_id": localStorage.getItem("branchId"),
                    "order_note": this.orderNotes,
                    "service_type_id": this.serviceTypeId,
                    "location_id": "0"
                }
            };
            console.log(confirmationData);
            var loader_1 = this.loader.create({
                content: this.translate.instant('LOADING'),
            });
            loader_1.present();
            return this.genrator.convertCartOrders(confirmationData).then(function (data) {
                _this.conversionResponse = data['orders'];
                if (data['orders'] != null) {
                    var resData = {
                        id: _this.resturantId,
                        name: _this.resLable,
                        img: _this.resImage,
                    };
                    //Send Discount Code
                    var orders = data['orders'];
                    var order = orders['0'];
                    console.log(order);
                    _this.sendDiscontCode(order.id);
                    localStorage.setItem("rated", "0");
                    console.log(localStorage.getItem("rated"));
                    localStorage.removeItem("resId");
                    localStorage.removeItem("branchId");
                    var alert_4 = _this.alertCtrl.create({
                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: _this.translate.instant('orderplaced'),
                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert_4.present();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a" /* TabsPage */]);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__orders_orders__["a" /* OrdersPage */]);
                }
                var errorMessage = data;
                if (errorMessage.message != null) {
                    _this.dismissLoading();
                    var alert_5 = _this.alertCtrl.create({
                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                        subTitle: errorMessage.message,
                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                    });
                    alert_5.present();
                }
                loader_1.dismiss();
            }, function (err) {
                loader_1.dismiss();
                var alert = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: err,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert.present();
                console.log(err);
            });
            // this.navCtrl.push(PickupServicePage, {
            //   resId: this.resturantId,
            //   serviceId: this.serviceTypeId,
            //   name:this.resLable,
            //   img:this.resImage,
            //   notes:this.orderNotes
            // });
        }
        else if (this.serviceTypeId == "3") {
            //Both Option
            var alert_6 = this.alertCtrl.create({
                title: this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: this.translate.instant('selectservice'),
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: this.translate.instant('pickup'),
                        handler: function () {
                            //Pickup Selection
                            _this.serviceTypeId = "2";
                            var confirmationData = {
                                "order_info": {
                                    "order_id": "0",
                                    "customer_id": localStorage.getItem("customerid"),
                                    "vendor_id": _this.resturantId,
                                    "branch_id": localStorage.getItem("branchId"),
                                    "order_note": _this.orderNotes,
                                    "service_type_id": _this.serviceTypeId,
                                    "location_id": "0"
                                }
                            };
                            console.log(confirmationData);
                            var loader = _this.loader.create({
                                content: _this.translate.instant('LOADING'),
                            });
                            loader.present();
                            _this.genrator.convertCartOrders(confirmationData).then(function (data) {
                                _this.conversionResponse = data['orders'];
                                if (data['orders'] != null) {
                                    var resData = {
                                        id: _this.resturantId,
                                        name: _this.resLable,
                                        img: _this.resImage,
                                    };
                                    //Send Discount Code
                                    var orders = data['orders'];
                                    var order = orders['0'];
                                    console.log(order);
                                    _this.sendDiscontCode(order.id);
                                    localStorage.setItem("rated", "0");
                                    console.log(localStorage.getItem("rated"));
                                    localStorage.removeItem("resId");
                                    localStorage.removeItem("branchId");
                                    var alert_7 = _this.alertCtrl.create({
                                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                                        subTitle: _this.translate.instant('orderplaced'),
                                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                    });
                                    alert_7.present();
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a" /* TabsPage */]);
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__orders_orders__["a" /* OrdersPage */]);
                                }
                                var errorMessage = data;
                                if (errorMessage.message != null) {
                                    _this.dismissLoading();
                                    var alert_8 = _this.alertCtrl.create({
                                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                                        subTitle: errorMessage.message,
                                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                    });
                                    alert_8.present();
                                }
                                loader.dismiss();
                            }, function (err) {
                                loader.dismiss();
                                var alert = _this.alertCtrl.create({
                                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                                    subTitle: err,
                                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                });
                                alert.present();
                                console.log(err);
                            });
                            // this.navCtrl.push(PickupServicePage, {
                            //   resId: this.resturantId,
                            //   serviceId: this.serviceTypeId,
                            //   name:this.resLable,
                            //   img:this.resImage,
                            //   notes:this.orderNotes
                            // });
                        }
                    },
                    {
                        text: this.translate.instant('delivry'),
                        handler: function () {
                            //Devlivery Selection
                            //Check menumumCharge value
                            if (_this.total >= _this.menumumCharge) {
                                _this.serviceTypeId = "1";
                                var confirmationData = {
                                    "order_info": {
                                        "order_id": "0",
                                        "customer_id": localStorage.getItem("customerid"),
                                        "vendor_id": _this.resturantId,
                                        "branch_id": null,
                                        "order_note": _this.orderNotes,
                                        "service_type_id": _this.serviceTypeId,
                                        "location_id": _this.customerLocationName.location.id
                                    }
                                };
                                console.log(confirmationData);
                                var loader_2 = _this.loader.create({
                                    content: _this.translate.instant('LOADING'),
                                });
                                loader_2.present();
                                return _this.genrator.convertCartOrders(confirmationData).then(function (data) {
                                    _this.conversionResponse = data['orders'];
                                    if (data['orders'] != null) {
                                        var resData = {
                                            id: _this.resturantId,
                                            name: _this.resLable,
                                            img: _this.resImage,
                                        };
                                        //Send Discount Code
                                        var orders = data['orders'];
                                        var order = orders['0'];
                                        console.log(order);
                                        _this.sendDiscontCode(order.id);
                                        localStorage.setItem("rated", "0");
                                        console.log(localStorage.getItem("rated"));
                                        localStorage.removeItem("resId");
                                        localStorage.removeItem("branchId");
                                        var alert_9 = _this.alertCtrl.create({
                                            title: _this.translate.instant('PAGE_TITLE.dilog'),
                                            subTitle: _this.translate.instant('orderplaced'),
                                            buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                        });
                                        alert_9.present();
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__tabs_tabs__["a" /* TabsPage */]);
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__orders_orders__["a" /* OrdersPage */]);
                                    }
                                    console.log(data);
                                    var errorMessage = data;
                                    if (errorMessage.message != null) {
                                        _this.dismissLoading();
                                        var alert_10 = _this.alertCtrl.create({
                                            title: _this.translate.instant('PAGE_TITLE.dilog'),
                                            subTitle: errorMessage.message,
                                            buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                        });
                                        alert_10.present();
                                    }
                                    loader_2.dismiss();
                                }, function (err) {
                                    loader_2.dismiss();
                                    var alert = _this.alertCtrl.create({
                                        title: _this.translate.instant('PAGE_TITLE.dilog'),
                                        subTitle: err,
                                        buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                    });
                                    alert.present();
                                    console.log(err);
                                });
                            }
                            else {
                                var alert_11 = _this.alertCtrl.create({
                                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                                    subTitle: _this.translate.instant('menumum') + _this.menumumCharge,
                                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                                });
                                alert_11.present();
                            }
                        }
                    }
                ]
            });
            alert_6.present();
        }
    };
    ShoppingCartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShoppingCartPage');
    };
    ShoppingCartPage.prototype.getCartItems = function () {
        var _this = this;
        this.showLoading();
        this.genrator.getShoppingCartItems(localStorage.getItem("customerid"), localStorage.getItem('lang')).subscribe(function (data) {
            _this.cartItemsList = data['shopping_carts'];
            _this.discountCopuns = data['applied_codes'];
            var cartItem = _this.cartItemsList[0];
            _this.total = data.total_price;
            if (_this.serviceTypeId == "1") {
                _this.deliveryees = data.delivery_fees;
            }
            if (_this.discountCopuns.length != 0) {
                var coupon = _this.discountCopuns['0'];
                //Save discount code
                localStorage.setItem("discountcode", coupon.Key.toUpperCase());
                console.log(localStorage.getItem("discountcode"));
            }
            else {
                localStorage.removeItem("discountcode");
                console.log(localStorage.getItem("discountcode"));
            }
            console.log(data);
            _this.dismissLoading();
        }, function (err) {
            // let alert = this.alertCtrl.create({
            //   title: this.translate.instant('PAGE_TITLE.dilog'),
            //   subTitle: err,
            //   buttons: [this.translate.instant('BUTTONS.dissmiss')]
            // });
            // alert.present();
            console.log(err);
            _this.dismissLoading();
        });
    };
    ShoppingCartPage.prototype.getShoppingCartCount = function (custId) {
        var _this = this;
        this.genrator.getShoppingCartItems(custId, localStorage.getItem('lang')).subscribe(function (data) {
            var items = data['shopping_carts'];
            localStorage.setItem("cartCount", items.length + "");
            if (items.length == 0) {
                localStorage.removeItem("resId");
                localStorage.removeItem("branchId");
                localStorage.setItem("resName", "");
                _this.navCtrl.pop();
            }
            else {
                var item = items[0];
                localStorage.setItem("resId", item.product.vendor_id);
                console.log(localStorage.getItem("resId"));
            }
        });
    };
    ShoppingCartPage.prototype.calcEachItemPrice = function (cartItem) {
        var total = 0;
        total = cartItem.product.price * cartItem.quantity;
        for (var i = 0; i < cartItem.additions.length; i++) {
            var addition = cartItem.additions[i];
            total += (addition.price * addition.quantity);
        }
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customize = cartItem.customizations[i];
            total += (customize.price * customize.quantity);
        }
        return total;
    };
    ShoppingCartPage.prototype.delItem = function (id) {
        var _this = this;
        this.genrator.deleteFromShoppingCart(id).subscribe(function (data) {
            _this.getCartItems();
            _this.getShoppingCartCount(localStorage.getItem("customerid"));
        });
    };
    //Up CartItem Count 
    ShoppingCartPage.prototype.upCartItemCount = function (cartItem) {
        var _this = this;
        cartItem.quantity = cartItem.quantity + 1;
        //Fill Additions after deleation
        var additions = [];
        for (var i = 0; i < cartItem.additions.length; i++) {
            var additionItem2 = cartItem.additions[i];
            additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
        }
        //Fill Customizations after deleation
        var customizations = [];
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customizationItem = cartItem.customizations[i];
            customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
        }
        //Fill request body with currunt updated cartItem
        var updatedCartItem = {
            "shopping_cart_item": {
                "id": cartItem.id,
                "customer_entered_price": cartItem.customer_entered_price,
                "quantity": cartItem.quantity,
                "created_on_utc": cartItem.created_on_utc,
                "updated_on_utc": cartItem.updated_on_utc,
                "shopping_cart_type": "1",
                "product_id": cartItem.product_id,
                "customer_id": cartItem.customer_id,
                "additions": additions,
                "customizations": customizations
            }
        };
        console.log(updatedCartItem);
        // Push request to the server
        this.genrator.updateCart(updatedCartItem, cartItem.id).then(function (result) {
            if (result['shopping_carts'] != null) {
                console.log(result);
                _this.getCartItems();
            }
        }, function (err) {
            console.log(err);
        });
    };
    //Down Cart Item count
    ShoppingCartPage.prototype.downCartItemCount = function (cartItem) {
        var _this = this;
        if (cartItem.quantity == 1) {
            return;
        }
        else {
            cartItem.quantity = cartItem.quantity - 1;
        }
        //Fill Additions after deleation
        var additions = [];
        for (var i = 0; i < cartItem.additions.length; i++) {
            var additionItem2 = cartItem.additions[i];
            additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
        }
        //Fill Customizations after deleation
        var customizations = [];
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customizationItem = cartItem.customizations[i];
            customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
        }
        //Fill request body with currunt updated cartItem
        var updatedCartItem = {
            "shopping_cart_item": {
                "id": cartItem.id,
                "customer_entered_price": cartItem.customer_entered_price,
                "quantity": cartItem.quantity,
                "created_on_utc": cartItem.created_on_utc,
                "updated_on_utc": cartItem.updated_on_utc,
                "shopping_cart_type": "1",
                "product_id": cartItem.product_id,
                "customer_id": cartItem.customer_id,
                "additions": additions,
                "customizations": customizations
            }
        };
        console.log(updatedCartItem);
        // Push request to the server
        this.genrator.updateCart(updatedCartItem, cartItem.id).then(function (result) {
            if (result['shopping_carts'] != null) {
                console.log(result);
                _this.getCartItems();
            }
        }, function (err) {
            console.log(err);
        });
    };
    // Up Addition Count
    ShoppingCartPage.prototype.upAdditionCount = function (cartItem, additionId, additionsList) {
        var _this = this;
        //Up Addition item count
        for (var i = 0; i < additionsList.length; i++) {
            var additionItem = additionsList[i];
            if (additionItem.id == additionId) {
                additionItem.quantity = additionItem.quantity + 1;
            }
        }
        console.log(cartItem);
        //Fill Additions after deleation
        var additions = [];
        for (var i = 0; i < cartItem.additions.length; i++) {
            var additionItem2 = cartItem.additions[i];
            additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
        }
        //Fill Customizations after deleation
        var customizations = [];
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customizationItem = cartItem.customizations[i];
            customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
        }
        //Fill request body with currunt updated cartItem
        var updatedCartItem = {
            "shopping_cart_item": {
                "id": cartItem.id,
                "customer_entered_price": cartItem.customer_entered_price,
                "quantity": cartItem.quantity,
                "created_on_utc": cartItem.created_on_utc,
                "updated_on_utc": cartItem.updated_on_utc,
                "shopping_cart_type": "1",
                "product_id": cartItem.product_id,
                "customer_id": cartItem.customer_id,
                "additions": additions,
                "customizations": customizations
            }
        };
        console.log(updatedCartItem);
        // Push request to the server
        this.genrator.updateCart(updatedCartItem, cartItem.id).then(function (result) {
            if (result['shopping_carts'] != null) {
                console.log(result);
                _this.getCartItems();
            }
        }, function (err) {
            console.log(err);
        });
    };
    // Down Addition Count
    ShoppingCartPage.prototype.downAdditionCount = function (cartItem, additionId, additionsList) {
        var _this = this;
        //Up Addition item count
        for (var i = 0; i < additionsList.length; i++) {
            var additionItem = additionsList[i];
            if (additionItem.id == additionId) {
                if (additionItem.quantity == 1) {
                    return;
                }
                else {
                    additionItem.quantity = additionItem.quantity - 1;
                }
            }
        }
        //console.log(cartItem);
        //Fill Additions after deleation
        var additions = [];
        for (var i = 0; i < cartItem.additions.length; i++) {
            var additionItem2 = cartItem.additions[i];
            additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
        }
        //Fill Customizations after deleation
        var customizations = [];
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customizationItem = cartItem.customizations[i];
            customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
        }
        //Fill request body with currunt updated cartItem
        var updatedCartItem = {
            "shopping_cart_item": {
                "id": cartItem.id,
                "customer_entered_price": cartItem.customer_entered_price,
                "quantity": cartItem.quantity,
                "created_on_utc": cartItem.created_on_utc,
                "updated_on_utc": cartItem.updated_on_utc,
                "shopping_cart_type": "1",
                "product_id": cartItem.product_id,
                "customer_id": cartItem.customer_id,
                "additions": additions,
                "customizations": customizations
            }
        };
        console.log(updatedCartItem);
        // Push request to the server
        this.genrator.updateCart(updatedCartItem, cartItem.id).then(function (result) {
            if (result['shopping_carts'] != null) {
                console.log(result);
                _this.getCartItems();
            }
        }, function (err) {
            console.log(err);
        });
    };
    //Delete Addition method --------->
    ShoppingCartPage.prototype.delAddition = function (cartItem, additionId, additionsList) {
        var _this = this;
        //Delete Addition item Code
        for (var i = 0; i < additionsList.length; i++) {
            var additionItem = additionsList[i];
            if (additionItem.id == additionId) {
                additionsList.splice(i, 1);
                ;
            }
            // console.log(cartItem);
        }
        //Fill Additions after deleation
        var additions = [];
        for (var i = 0; i < cartItem.additions.length; i++) {
            var additionItem2 = cartItem.additions[i];
            additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
        }
        //Fill Customizations after deleation
        var customizations = [];
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customizationItem = cartItem.customizations[i];
            customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
        }
        //Fill request body with currunt updated cartItem
        var updatedCartItem = {
            "shopping_cart_item": {
                "id": cartItem.id,
                "customer_entered_price": cartItem.customer_entered_price,
                "quantity": cartItem.quantity,
                "created_on_utc": cartItem.created_on_utc,
                "updated_on_utc": cartItem.updated_on_utc,
                "shopping_cart_type": "1",
                "product_id": cartItem.product_id,
                "customer_id": cartItem.customer_id,
                "additions": additions,
                "customizations": customizations
            }
        };
        console.log(updatedCartItem);
        // Push request to the server
        this.genrator.updateCart(updatedCartItem, cartItem.id).then(function (result) {
            if (result['shopping_carts'] != null) {
                console.log(result);
                _this.getCartItems();
            }
        }, function (err) {
            console.log(err);
        });
    };
    //Delete customization method --------->
    ShoppingCartPage.prototype.delCustomization = function (cartItem, customizationId, customizationsList) {
        var _this = this;
        //Delete customizations item Code
        for (var i = 0; i < customizationsList.length; i++) {
            var customizationItem = customizationsList[i];
            if (customizationItem.id == customizationId) {
                customizationsList.splice(i, 1);
                ;
            }
            // console.log(cartItem);
        }
        //Fill additions after deleation
        var additions = [];
        for (var i = 0; i < cartItem.additions.length; i++) {
            var additionItem2 = cartItem.additions[i];
            additions.push({ "id": additionItem2.id, "addition_id": additionItem2.addition_id, "quantity": additionItem2.quantity, "product_id": additionItem2.product_id });
        }
        //Fill Customizations after deleation
        var customizations = [];
        for (var i = 0; i < cartItem.customizations.length; i++) {
            var customizationItem = cartItem.customizations[i];
            customizations.push({ "id": customizationItem.id, "customization_id": customizationItem.customization_id, "product_id": customizationItem.product_id });
        }
        //Fill request body with currunt updated cartItem
        var updatedCartItem = {
            "shopping_cart_item": {
                "id": cartItem.id,
                "customer_entered_price": cartItem.customer_entered_price,
                "quantity": cartItem.quantity,
                "created_on_utc": cartItem.created_on_utc,
                "updated_on_utc": cartItem.updated_on_utc,
                "shopping_cart_type": "1",
                "product_id": cartItem.product_id,
                "customer_id": cartItem.customer_id,
                "additions": additions,
                "customizations": customizations
            }
        };
        console.log(updatedCartItem);
        //Push request to the server
        this.genrator.updateCart(updatedCartItem, cartItem.id).then(function (result) {
            if (result['shopping_carts'] != null) {
                console.log(result);
                _this.getCartItems();
            }
        }, function (err) {
            console.log(err);
        });
    };
    //Apply Discount Coupon
    ShoppingCartPage.prototype.applyDiscount = function (val) {
        var _this = this;
        this.genrator.ApplyDiscountCoupon(val.code.toUpperCase(), localStorage.getItem("customerid")).then(function (data) {
            if (data['shopping_carts'] != null) {
                _this.getCartItems();
                _this.discountcopun.controls['code'].setValue("");
                //Save discount code
                localStorage.setItem("discountcode", val.code.toUpperCase());
                var alert_12 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('discountdone'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_12.present();
            }
            else {
                var alert_13 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: data.errors.Coupon,
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_13.present();
            }
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    ShoppingCartPage.prototype.removeDiscountCopun = function (key) {
        var _this = this;
        this.genrator.RemoveDiscountCoupon(key, localStorage.getItem("customerid")).then(function (data) {
            if (data['shopping_carts'] != null) {
                localStorage.removeItem("discountcode");
                _this.getCartItems();
                var alert_14 = _this.alertCtrl.create({
                    title: _this.translate.instant('PAGE_TITLE.dilog'),
                    subTitle: _this.translate.instant('coupoundeleted'),
                    buttons: [_this.translate.instant('BUTTONS.dissmiss')]
                });
                alert_14.present();
            }
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: _this.translate.instant('PAGE_TITLE.dilog'),
                subTitle: err,
                buttons: [_this.translate.instant('BUTTONS.dissmiss')]
            });
            alert.present();
            console.log(err);
        });
    };
    //Send Discount code to server 
    ShoppingCartPage.prototype.sendDiscontCode = function (orderId) {
        if (localStorage.getItem("discountcode") != null) {
            this.genrator.sendDiscountCodeToServer(localStorage.getItem("discountcode"), orderId).then(function (result) {
                console.log(result);
                localStorage.removeItem("discountcode");
            }, function (err) {
                console.log(err);
            });
        }
    };
    ShoppingCartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
            selector: 'page-shopping-cart',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\shopping-cart\shopping-cart.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{\'orderdetals\' | translate}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content dir={{oriantation}}>\n\n    <!-- Head Part -->\n    <!-- <div class="hgroup">\n        <h3>{{\'orderdetals\' | translate}}</h3>\n    </div>  -->\n\n\n    <!--Restaurant name and logo-->\n    <ion-row class="rest-info">\n        <img src="{{resImage}}">\n        <div>\n            <h3>{{resLable}}</h3>\n            <small>{{resDescription}}</small>\n        </div>\n    </ion-row>\n\n    <div>\n        <ion-row dir="{{oriantation}}">\n            <form [formGroup]="discountcopun" (ngSubmit)="applyDiscount(discountcopun.value)" class="footer">\n                <button color="secondary" ion-button round block [disabled]="!discountcopun.valid">{{\'apply\' | translate}}</button>\n                <ion-input formControlName="code" placeholder="{{\'descountcode\' | translate}}"></ion-input>\n            </form>\n        </ion-row>\n    </div>\n    <!--The Order Details Table-->\n    <table class="details" full>\n        <thead>\n            <tr>\n                <th class="order">{{\'order\' | translate}}</th>\n                <th class="qty">{{\'qty\' | translate}}</th>\n                <th class="price">{{\'pricc\' | translate}}</th>\n            </tr>\n        </thead>\n\n        <tbody>\n            <tr *ngFor="let item of cartItemsList">\n                <td class="order">\n                    <!--The Main Meal-->\n                    <div class="main-order">\n                        <h6 class="ordname">\n                            <ion-icon name="ios-close-circle-outline" (click)="delItem(item.id)" style="margin-left: 5px;  margin-right: 5px;"></ion-icon>{{item.product.name}} ({{item.product.price*item.quantity | number :\'2.1-2\'}})&#x200E;</h6>\n                    </div>\n                    <!--The List of Addition-->\n                    <ion-list no-lines class="add" *ngIf="item.additions.length != 0">\n                        <p>{{\'Additions\' | translate}}</p>\n                        <ion-item *ngFor="let addition of item.additions">\n                            <ion-icon name="ios-close-circle-outline" (click)="delAddition(item,addition.id,item.additions)" style="margin-left: 5px;  margin-right: 5px;"></ion-icon>{{addition.addition_name}}\n\n                            <label *ngIf="addition.price!=0">({{addition.price*addition.quantity | number :\'2.1-2\'}})&#x200E;</label>\n                            <label color="primary" *ngIf="addition.price==0">({{\'free\' | translate}})&#x200E;</label>\n\n\n                        </ion-item>\n                    </ion-list>\n                    <!--The List of Customisation-->\n                    <ion-list no-lines class="cust" *ngIf="item.customizations.length != 0">\n                        <p>{{\'Customization\' | translate}}</p>\n                        <ion-item *ngFor="let customiz of item.customizations">\n                            <ion-icon name="ios-close-circle-outline" (click)="delCustomization(item,customiz.id,item.customizations)" style="margin-left: 5px;  margin-right: 5px;"></ion-icon>{{customiz.customization_name}}\n\n\n                            <label *ngIf="customiz.price!=0">(+{{customiz.price*customiz.quantity | number :\'2.1-2\'}})&#x200E;</label>\n                            <label color="primary" *ngIf="customiz.price==0">({{\'free\' | translate}})&#x200E;</label>\n\n                        </ion-item>\n                    </ion-list>\n                </td>\n                <td class="qty">\n                    <!--The List of Quantity for The Main Meal-->\n                    <ion-item class="main-order">\n                        <button ion-button icon-only (click)="downCartItemCount(item)" style="margin-left: 3px;  margin-right: 3px;">\n                            <ion-icon name="remove"></ion-icon>\n                        </button>\n                        {{item.quantity}}\n                        <button ion-button icon-only (click)="upCartItemCount(item)" style="margin-left: 3px;  margin-right: 3px;">\n                            <ion-icon name="add"></ion-icon>\n                        </button>\n                    </ion-item>\n                    <!--The List of Quantity for Addition-->\n                    <ion-list no-lines class="add">\n                        <ion-item *ngFor="let addition of item.additions">\n                            <button ion-button icon-only (click)="downAdditionCount(item,addition.id,item.additions)" style="margin-left: 5px;  margin-right: 5px;">\n                                <ion-icon name="remove"></ion-icon>\n                            </button>\n                            {{addition.quantity}}\n                            <button ion-button icon-only (click)="upAdditionCount(item,addition.id,item.additions)" style="margin-left: 5px;  margin-right: 5px;">\n                                <ion-icon name="add"></ion-icon>\n                            </button>\n                        </ion-item>\n                    </ion-list>\n                </td>\n                <td class="price">{{calcEachItemPrice(item) | number :\'2.1-2\'}}</td>\n            </tr>\n\n        </tbody>\n        <tfoot>\n            <tr>\n                <td>{{\'total\' | translate}}</td>\n                <td></td>\n                <td class="price">{{total}}</td>\n            </tr>\n            <tr *ngIf="serviceTypeId==1">\n                <td>{{\'deliveryfees\' | translate}}</td>\n                <td></td>\n                <td class="price">{{deliveryees}}</td>\n            </tr>\n\n\n            <!-- <tr>\n                <td>{{\'discount\' | translate}}</td>\n                <td></td>\n                <td class="price">00.00</td>\n            </tr> -->\n            <!-- <tr>\n                <td>Subtotal</td>\n                <td></td>\n                <td class="price">90.00 SR</td>\n            </tr> -->\n        </tfoot>\n    </table>\n\n\n\n    <ion-list no-lines class="add" *ngIf="discountCopuns.length != 0">\n        <p class="discuntCopuns">{{\'discountCopuns\' | translate}}</p>\n        <ion-item *ngFor="let coupon of discountCopuns">\n            <ion-icon color="danger" name="ios-close-circle-outline" (click)="removeDiscountCopun(coupon.Key)" style="margin-left: 5px;  margin-right: 5px;"></ion-icon>\n            {{\'dicountcopun\' | translate}}\n            <label> ({{coupon.Value}})&#x200E;</label>\n        </ion-item>\n    </ion-list>\n\n\n    <ion-item class="notes" dir="{{oriantation}}"> \n        <ion-label class="lablee" floating>{{\'notes\' | translate}}</ion-label>\n        <ion-input [(ngModel)]="orderNotes"></ion-input>\n      </ion-item>\n    <!-- <ion-input dir="{{oriantation}}" class="notes" placeholder="{{\'notes\' | translate}}"></ion-input> -->\n\n    <!--Choose Payment Method Link-->\n    <!-- <button ion-button clear class="paymethod">{{\'chosepaymethod\' | translate}}</button> -->\n\n    <!--The Total Amount Requested-->\n    <ion-row class="allcash">\n        <p>\n            <small>{{\'amountreq\' | translate}}</small> {{total+deliveryees | number :\'2.1-2\'}} SR</p>\n    </ion-row>\n\n    <!--Submit Button & Minimum Order Note-->\n    <ion-row class="subtn">\n        <button ion-button type="submit" block round (click)="loadOrderData()">{{\'submet\' | translate}}</button>\n        <!-- <small>Minimum Order 25.00 SAR</small> -->\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\shopping-cart\shopping-cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__providers_genrator_genrator__["a" /* GenratorProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Config */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], ShoppingCartPage);
    return ShoppingCartPage;
}());

//# sourceMappingURL=shopping-cart.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IntroScreenPage = /** @class */ (function () {
    function IntroScreenPage(navCtrl, navParams, translate, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.langName = "";
        if (localStorage.getItem('lang') == "1") {
            translate.use('en');
        }
        else {
            translate.use('ar');
        }
        if (localStorage.getItem('lang') == "1") {
            this.langName = "ع";
        }
        else {
            this.langName = "E";
        }
    }
    IntroScreenPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // this.checNetworkConnection();
        if (localStorage.getItem('customerid') === null) {
        }
        else {
            console.log("gooooo" + localStorage.getItem('customerid'));
            // if (localStorage.getItem('customerLocation') === null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], {
                flag: "intro"
            }).then(function () {
                // first we find the index of the current view controller:
                var index = _this.viewCtrl.index;
                // then we remove it from the navigation stack
                _this.navCtrl.remove(index);
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
    };
    IntroScreenPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroScreenPage');
    };
    IntroScreenPage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    IntroScreenPage.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__sign_up_sign_up__["a" /* SignUpPage */]);
    };
    IntroScreenPage.prototype.gust = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], {
            flag: "intro"
        });
    };
    IntroScreenPage.prototype.onChange = function (segmentButton) {
        this.translate.use(segmentButton.value);
        if (segmentButton.value == 'ar') {
            localStorage.setItem('lang', "2");
        }
        else {
            localStorage.setItem('lang', "1");
        }
    };
    IntroScreenPage.prototype.toggleIcon = function (getIcon) {
        if (this.langName === 'ع') {
            this.langName = "E";
            this.translate.use("ar");
            localStorage.setItem('lang', "2");
        }
        else {
            this.langName = "ع";
            this.translate.use("en");
            localStorage.setItem('lang', "1");
        }
    };
    IntroScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-intro-screen',template:/*ion-inline-start:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\intro-screen\intro-screen.html"*/'<ion-content class="bg">\n    <div class="langsc" >\n         <button class="cartbutton" #myButton ion-button icon-only (click)="toggleIcon()">\n       <!-- <img class="langlogo" src="./assets/imgs/switchlang.png"> -->\n       <h6 class="langtxt">{{langName}}</h6>\n    </button>\n    </div> \n\n   \n\n\n    <div class="logo">\n        <img src="./assets/imgs/HBlogo.png">\n        <h1 class="appname">HurryBunny</h1>\n    </div>\n\n</ion-content>\n<ion-footer no-shadow class="bg">\n\n    <ion-row>\n        <button class="btn1" ion-button clear (click)="login()">{{ \'BUTTONS.btn_login\' | translate }}</button>\n        <button class="btn1" ion-button clear (click)="signUp()">{{ \'BUTTONS.btn_signup\' | translate }}</button>\n        <button class="btn1" ion-button clear (click)="gust()">{{ \'BUTTONS.btn_gust\' | translate }}</button>\n    </ion-row>\n\n</ion-footer>'/*ion-inline-end:"E:\My Work\Appsmatic\HURRYBUNNY\HarryBunny\HarryBunny\src\pages\intro-screen\intro-screen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */]])
    ], IntroScreenPage);
    return IntroScreenPage;
}());

//# sourceMappingURL=intro-screen.js.map

/***/ })

},[322]);
//# sourceMappingURL=main.js.map