import { UpdateLocationPage } from './../pages/update-location/update-location';
import { ResturantReviewPage } from './../pages/resturant-review/resturant-review';
import { PickupServicePage } from './../pages/pickup-service/pickup-service';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Network } from '@ionic-native/network';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule, Http } from '@angular/http'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GenratorProvider } from '../providers/genrator/genrator';
import { MainScreenPage } from '../pages/main-screen/main-screen';
import { IntroScreenPage } from '../pages/intro-screen/intro-screen';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ResturantInfoPage } from '../pages/resturant-info/resturant-info';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MealInfoPage } from '../pages/meal-info/meal-info';
import { ProfilePage } from '../pages/profile/profile';
import { AccountActivePage } from '../pages/account-active/account-active';
import { OrdersPage } from '../pages/orders/orders';
import { OffersPage } from '../pages/offers/offers';
import { SettingsPage } from '../pages/settings/settings';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { OrderDataPage } from '../pages/order-data/order-data';
import { MealsReviewsPage } from '../pages/meals-reviews/meals-reviews';
import { ViewOrderPage } from '../pages/view-order/view-order';
import { Firebase } from '@ionic-native/firebase';
import { CacheModule } from "ionic-cache";
import { LaunchNavigator } from '@ionic-native/launch-navigator';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicImageLoader } from 'ionic-image-loader';
import { TabsPage } from '../pages/tabs/tabs';
import { MoreListPage } from '../pages/more-list/more-list';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainScreenPage,
    IntroScreenPage,
    LoginPage,
    SignUpPage,
    ResturantInfoPage,
    MealInfoPage,
    ProfilePage,
    AccountActivePage,
    TabsPage,
    MoreListPage,
    OrdersPage,
    OffersPage,
    ResturantReviewPage,
    SettingsPage,
    AboutusPage,
    ContactUsPage,
    ShoppingCartPage,
    OrderDataPage,
    MealsReviewsPage,
    ViewOrderPage,
    PickupServicePage,
    UpdateLocationPage,
   


  ],
  imports: [
    BrowserModule,
    LazyLoadImageModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    IonicImageLoader.forRoot(),
    CacheModule.forRoot({ keyPrefix: 'hurrybunny-cache' }),
    Ionic2RatingModule,
    HttpModule,


    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    IntroScreenPage,
    MainScreenPage,
    ResturantInfoPage,
    MealInfoPage,
    ProfilePage,
    AccountActivePage,
    ResturantReviewPage,
    TabsPage,
    MoreListPage,
    OrdersPage,
    OffersPage,
    SettingsPage,
    AboutusPage,
    ContactUsPage,
    ShoppingCartPage,
    OrderDataPage,
    MealsReviewsPage,
    ViewOrderPage,
    PickupServicePage,
    UpdateLocationPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    Geolocation,
    LaunchNavigator,
    Network,
    Firebase,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GenratorProvider,
    Diagnostic,
    LocationAccuracy,
    LocalNotifications


  ]
})
export class AppModule { }

